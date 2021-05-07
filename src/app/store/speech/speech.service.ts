import {Injectable}                                                 from '@angular/core';
import {languages, SpeechSentence, SpeechSentenceType, SpeechStore} from './speech.store';
import {SpeechQuery}                                                from "@store/speech/speech.query";
import {NetworkService}                                             from "@store/network/network.service";
import {arrayAdd, arrayUpdate, arrayUpsert, guid, transaction}      from "@datorama/akita";
import {StyleQuery}                                                 from "@store/style/style.query";
import {BasePlugin}                                                 from "@store/speech/plugins/BasePlugin";
import {SPEECH_PLUGINS}                                             from "@store/speech/plugins";
import {Subscription, timer}                                        from "rxjs";
import {map, takeWhile, tap}                                        from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class SpeechService {
  constructor(
    private speechStore: SpeechStore,
    private styleQuery: StyleQuery,
    private speechQuery: SpeechQuery,
    private networkService: NetworkService) {
    networkService.messages$.subscribe(m => {
      if (m.type === 'stt:clear') this.speechStore.update({sentences: []});
      if (m.type === 'stt:updatesentence') {
        this.speechStore.update(e => {
          if (e.sentences.length > 20) e.sentences.splice(0, 1); // limit number of sentences
          e.sentences = arrayUpsert(e.sentences, m.data.id, m.data);
        })
        this.TriggerShowTimer();
      }
    }); // listen for network messages
  }

  private activePlugin?: BasePlugin;

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

  public Stop() {
    this.activePlugin?.Stop();
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
        if (globalConfig.clearOnInactivity?.value) state.sentences = [];
        state.show = false;
      });
    });
  }

  @transaction()
  private UpdateLastVoiceSentence(text: string, finalized = false, type = SpeechSentenceType.voice) {
    const sentences = this.speechQuery.getValue().sentences.filter(s => s.type === type);
    if (sentences.length === 0 || sentences[sentences.length - 1].finalized) {
      // create new
      const newSentence: SpeechSentence = {finalized, value: text, id: guid(), type};
      this.speechStore.update(e => {
        if (e.sentences.length > 20) e.sentences.splice(0, 1); // limit number of sentences
        e.sentences = arrayAdd(e.sentences, newSentence);
      });
      this.networkService.SendMessage({type: 'stt:updatesentence', data: newSentence})
    }
    else {
      const lastSentence = sentences[sentences.length - 1];
      const updated      = {...lastSentence, finalized, value: text}
      this.speechStore.update(state => ({sentences: arrayUpdate(state.sentences, lastSentence.id, updated)}))
      this.networkService.SendMessage({type: 'stt:updatesentence', data: updated})
    }
    this.TriggerShowTimer();
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
    await this.activePlugin.Start(selectedDialect, selectedPluginData);
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
