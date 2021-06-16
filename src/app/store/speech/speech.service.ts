import {Injectable}                                                 from '@angular/core';
import {languages, SpeechSentence, SpeechSentenceType, SpeechStore} from './speech.store';
import {SpeechQuery}                                                from "@store/speech/speech.query";
import {NetworkService}                                             from "@store/network/network.service";
import {arrayUpsert, guid, transaction}                             from "@datorama/akita";
import {StyleQuery}                                                 from "@store/style/style.query";
import {BasePlugin}                                                 from "@store/speech/plugins/BasePlugin";
import {SPEECH_PLUGINS}                                             from "@store/speech/plugins";
import {Subscription, timer}                                        from "rxjs";
import {take}                                                       from "rxjs/operators";
import {EmotesQuery}                                                from "@store/emotes/emotes.query";
import {environment}                                                from "../../../environments/environment";
import {HotToastService}                                            from "@ngneat/hot-toast";

@Injectable({providedIn: 'root'})
export class SpeechService {
  constructor(
    private speechStore: SpeechStore,
    private styleQuery: StyleQuery,
    private speechQuery: SpeechQuery,
    private emotesQuery: EmotesQuery,
    private networkService: NetworkService,
    private toastService: HotToastService
  ) {
    networkService.messages$.subscribe(m => {
      if (m.type === 'stt:clear') this.speechStore.update({sentences: []});
      if (m.type === 'stt:updatesentence') {
        this.UpsertSentence(m.data)
        this.TriggerShowTimer();
      }
    }); // listen for network messages
  }

  private activePlugin?: BasePlugin;

  public SelectPlugin     = (key: string) => {
    const plugin = SPEECH_PLUGINS[key];
    this.speechStore.update(e => {
      e.selectedPluginData = new Array(plugin.dataFields.length).fill(null);
      for (let i = 0; i < plugin.dataFields.length; i++)
        e.selectedPluginData[i] = plugin.dataFields[i].defaultValue;
      e.selectedPlugin = [key, e.selectedPlugin[1]];
    });
  };
  public UpdatePluginData = (index: number, data: string) => this.speechStore.update(e => {
    e.selectedPluginData[index] = data
  });
  public SelectLanguage   = (index: string) => this.speechStore.update(e => ({selectedLanguage: [parseInt(index), 0]}));
  public SelectDialect    = (index: string) => this.speechStore.update(e => ({selectedLanguage: [e.selectedLanguage[0], parseInt(index)]}));

  public async StopHost() {
    await this.activePlugin?.Stop();
    this.activePlugin = undefined;
  }

  private timeout?: Subscription;

  // Show text and start or restart countdown to hide it
  TriggerShowTimer() {
    const globalConfig = this.styleQuery.getValue().currentStyle.globalStyle;
    const targetTime   = parseInt(globalConfig.inactivityTimer?.value[0] || '1000');
    this.speechStore.update({show: true});
    this.timeout && !this.timeout.closed && this.timeout.unsubscribe();
    this.timeout = timer(targetTime).subscribe(_ => {
      this.speechStore.update(state => {
        if (globalConfig.clearOnInactivity?.value[0]) state.sentences = state.sentences.filter(s => !s.finalized);
        state.show = false;
      });
    });
  }

  private UpsertSentence(sentence: SpeechSentence) {
    const globalConfig = this.styleQuery.getValue().currentStyle.globalStyle;
    this.speechStore.update(e => ({sentences: arrayUpsert(globalConfig.keepSingleSentence.value[0] ? e.sentences.filter((s => !s.finalized)) : e.sentences, sentence.id, sentence)}));
  }

  @transaction()
  private UpdateLastVoiceSentence(text: string, finalized = false, type = SpeechSentenceType.voice) {
    if (text === undefined)
      return;

    console.log(text, finalized)
    const sentences = this.speechQuery.getValue().sentences.filter(s => s.type === type);

    if (text === "" && finalized) { // azure fix for empty finalized strings
      // try confirm last sentence
      console.log("fix empty finalized")
      const lastUnconfirmed = sentences.findIndex(s => !s.finalized)
      if (lastUnconfirmed === -1)
        return;
      const targetSentence = {...sentences[lastUnconfirmed], finalized: true};
      this.UpsertSentence(targetSentence);
      this.networkService.SendMessage({type: 'stt:updatesentence', data: targetSentence});
      this.TriggerShowTimer();
      return;
    }


    let words = (text).split(" ");
    let value = [];
    if (environment.features.EMOTES) {
      const emotesState         = this.emotesQuery.getValue();
      const emotesBindings      = emotesState.bindings_cache;
      const emotesKeyword       = emotesState.keyword.toLocaleLowerCase();
      const emotesKeywordSecond = emotesState.keyword_secondary.toLocaleLowerCase();

      if (emotesKeyword || emotesKeywordSecond) {
        for (let i = 0; i < words.length; i++) {
          if (i + 1 === words.length) break; // ignore if last word
          const wLower = words[i].toLocaleLowerCase();
          if (wLower === emotesKeyword || wLower === emotesKeywordSecond) {
            const first_word  = words[i + 1]?.replace(".", "").replace(",", ""),
                  second_word = words[i + 2]?.replace(".", "").replace(",", "");
            if (emotesBindings[first_word]?.[second_word]) // replace two words
              words.splice(i, 3, emotesBindings[first_word][second_word])
            else if (emotesBindings[first_word]?.['']) // replace one word
              words.splice(i, 2, emotesBindings[first_word]['']);
          }
        }
      }

      value = words.map((word, i) => {
        const firstLetter  = word[0];
        const wordFiltered = word.replace(".", "");
        if (emotesState.emotes[firstLetter]?.[wordFiltered])
          return [`<img src="${emotesState.emotes[firstLetter]?.[wordFiltered]}">`, " "]
        return [...word.split(""), " "];
      });
    }
    else
      value = words.map(word => [...word.split(""), " "]);

    let targetSentence: SpeechSentence;
    if (sentences.length === 0 || sentences[sentences.length - 1].finalized) // create new
      targetSentence = {finalized, valueNext: value, id: guid(), type};
    else // update last sentence
      targetSentence = {...sentences[sentences.length - 1], finalized, valueNext: value};
    this.UpsertSentence(targetSentence);
    this.networkService.SendMessage({type: 'stt:updatesentence', data: targetSentence})
    this.TriggerShowTimer();
  }

  public StartHost() {
      const plugin             = SPEECH_PLUGINS[this.speechQuery.getValue().selectedPlugin[0]];
      const pluginInstance     = new plugin.plugin();
      const selected           = this.speechQuery.getValue().selectedLanguage;
      const selectedPluginData = this.speechQuery.getValue().selectedPluginData;
      const selectedDialect    = languages[selected[0]][selected[1] + 1][0];
      this.activePlugin        = pluginInstance;
      this.activePlugin.onInter$.subscribe(value => this.UpdateLastVoiceSentence(value))
      this.activePlugin.onFinal$.subscribe(value => this.UpdateLastVoiceSentence(value, true))
      this.activePlugin.onStatusChanged$.subscribe(value => this.speechStore.update({connectionState: value}))
      this.activePlugin.onPluginCrashed$.pipe(take(1)).subscribe(v => { // restart plugin
        this.toastService.error(v, {theme: "snackbar", position: "bottom-right"});
        this.StopHost();
      });

      this.activePlugin.Start(selectedDialect, selectedPluginData)
          .catch(error => this.toastService.error(error.message, {theme: "snackbar", position: "bottom-right"}));
  }

  public ClearSentences() {
    this.speechStore.update({sentences: []});
    this.networkService.SendMessage({type: "stt:clear", data: null});
  }

  public InterimTextInput(event: any) {
    this.speechStore.update({textInput: event});
    !!this.styleQuery.getValue().currentStyle.globalStyle.realtimeTyping.value[0] && this.UpdateLastVoiceSentence(event, false, SpeechSentenceType.text);
  }

  public SendTextInput(event: any) {
    const value: string = event.target?.value;
    if (value === "")
      return;
    this.speechStore.update({textInput: ""})
    this.UpdateLastVoiceSentence(value + ".", true, SpeechSentenceType.text);
  }
}
