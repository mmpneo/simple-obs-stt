import {Injectable}                                                 from '@angular/core';
import {languages, SpeechSentence, SpeechSentenceType, SpeechStore} from './speech.store';
import {SpeechQuery}                                                from "@store/speech/speech.query";
import {NetworkService}                                             from "@store/network/network.service";
import {arrayAdd, arrayUpdate, arrayUpsert, guid, transaction}      from "@datorama/akita";
import {StyleQuery}                                                 from "@store/style/style.query";
import {BasePlugin}                                                 from "@store/speech/plugins/BasePlugin";
import {SPEECH_PLUGINS}                                             from "@store/speech/plugins";
import {from, Subject, Subscription, timer}                         from "rxjs";
import {switchMap, take, takeUntil}                                 from "rxjs/operators";
import {EmotesQuery}                                                from "@store/emotes/emotes.query";

@Injectable({providedIn: 'root'})
export class SpeechService {
  constructor(
    private speechStore: SpeechStore,
    private styleQuery: StyleQuery,
    private speechQuery: SpeechQuery,
    private emotesQuery: EmotesQuery,
    private networkService: NetworkService) {
    networkService.messages$.subscribe(m => {
      if (m.type === 'stt:clear') this.speechStore.update({sentences: []});
      if (m.type === 'stt:updatesentence') {
        this.UpsertSentence(m.data)
        this.TriggerShowTimer();
      }
    }); // listen for network messages
  }

  private activePlugin?: BasePlugin;
  private stopEvent$ = new Subject();

  public SelectPlugin     = (key: string) => {
    this.speechStore.update(e => ({
      selectedPluginData: new Array(SPEECH_PLUGINS[key].pluginDataFields.length).fill(null),
      selectedPlugin:     [key, e.selectedPlugin[1]]
    }));
  };
  public UpdatePluginData = (index: number, data: string) => this.speechStore.update(e => {
    e.selectedPluginData[index] = data
  });
  public SelectLanguage   = (index: string) => this.speechStore.update(e => ({selectedLanguage: [parseInt(index), 0]}));
  public SelectDialect    = (index: string) => this.speechStore.update(e => ({selectedLanguage: [e.selectedLanguage[0], parseInt(index)]}));

  public async StopHost() {
    this.stopEvent$.next(null);
    await this.activePlugin?.Stop();
    this.activePlugin = undefined;
  }

  private timeout?: Subscription;

  // Show text and start or restart countdown to hide it
  TriggerShowTimer() {
    const globalConfig = this.styleQuery.getValue().currentStyle.globalStyle;
    const targetTime   = parseInt(globalConfig.inactivityTimer?.value || '1000');
    this.speechStore.update({show: true});
    this.timeout && !this.timeout.closed && this.timeout.unsubscribe();
    this.timeout = timer(targetTime).subscribe(_ => {
      this.speechStore.update(state => {
        if (globalConfig.clearOnInactivity?.value) state.sentences = state.sentences.filter(s => !s.finalized);
        state.show = false;
      });
    });
  }

  private UpsertSentence(sentence: SpeechSentence) {
    const globalConfig = this.styleQuery.getValue().currentStyle.globalStyle;
    this.speechStore.update(e => ({sentences: arrayUpsert(globalConfig.keepSingleSentence.value ? e.sentences.filter((s => !s.finalized)) : e.sentences, sentence.id, sentence)}));
  }

  @transaction()
  private UpdateLastVoiceSentence(text: string, finalized = false, type = SpeechSentenceType.voice) {
    const emotesMap = this.emotesQuery.getValue().emotes;
    if (text === undefined)
      return;
    const words = (text).split(" ");

    const value = words.map((word, i) => {
      const firstLetter = word[0];
      const wordFiltered = word.replace(".","");
      if (emotesMap[firstLetter]?.[wordFiltered])
        return [`<img src="${emotesMap[firstLetter]?.[wordFiltered]}">`, " "]
      return [...word.split(""), " "];
    });

    const sentences = this.speechQuery.getValue().sentences.filter(s => s.type === type);
    let targetSentence: SpeechSentence;
    if (sentences.length === 0 || sentences[sentences.length - 1].finalized) // create new
      targetSentence = {finalized, valueNext: value, id: guid(), type};
    else // update last sentence
      targetSentence = {...sentences[sentences.length - 1], finalized, valueNext: value};
    this.UpsertSentence(targetSentence);
    this.networkService.SendMessage({type: 'stt:updatesentence', data: targetSentence})
    this.TriggerShowTimer();
  }

  private async RestartLoop() {
    await this.StopHost();
    timer(1500).pipe(
      takeUntil(this.stopEvent$),
      switchMap(_ => from(this.StartHost()))
    ).subscribe({error: error => this.RestartLoop()})
  }

  async StartHost() {
    const plugin             = SPEECH_PLUGINS[this.speechQuery.getValue().selectedPlugin[0]];
    const pluginInstance     = new plugin.plugin();
    const selected           = this.speechQuery.getValue().selectedLanguage;
    const selectedPluginData = this.speechQuery.getValue().selectedPluginData;
    const selectedDialect    = languages[selected[0]][selected[1] + 1][0];
    this.activePlugin        = pluginInstance;
    this.activePlugin.onInter$.subscribe(value => this.UpdateLastVoiceSentence(value))
    this.activePlugin.onFinal$.subscribe(value => this.UpdateLastVoiceSentence(value, true))
    this.activePlugin.onStatusChanged$.subscribe(value => this.speechStore.update({speechServiceState: value}))
    this.activePlugin.onPluginCrashed$.pipe(take(1)).subscribe(_value => { // restart plugin
      console.log("[Speech] Plugin crashed", _value);
      this.RestartLoop();
    });
    try {
      await this.activePlugin.Start(selectedDialect, selectedPluginData);
    } catch (error) {
      await this.StopHost(); // clear on initialization fail
      throw new Error(error.message);
    }
  }

  public ClearSentences() {
    this.speechStore.update({sentences: []});
    this.networkService.SendMessage({type: "stt:clear", data: null});
  }

  public InterimTextInput(event: any) {
    this.speechStore.update({textInput: event});
    !!this.styleQuery.getValue().currentStyle.globalStyle.realtimeTyping.value && this.UpdateLastVoiceSentence(event, false, SpeechSentenceType.text);
  }

  public SendTextInput(event: any) {
    const value: string = event.target?.value;
    this.speechStore.update({textInput: ""})
    this.UpdateLastVoiceSentence(value + ".", true, SpeechSentenceType.text);
  }
}
