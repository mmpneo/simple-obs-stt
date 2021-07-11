import {Injectable}                                                 from '@angular/core';
import {languages, SpeechSentence, SpeechSentenceType, SpeechStore} from './speech.store';
import {SpeechQuery}                                                from "@store/speech/speech.query";
import {NetworkService}                                             from "@store/network/network.service";
import {transaction}                                                from "@datorama/akita";
import {StyleQuery}                                                 from "@store/style/style.query";
import {BasePlugin}                                                 from "@store/speech/plugins/BasePlugin";
import {SPEECH_PLUGINS}                                             from "@store/speech/plugins";
import {Subscription, timer}                                        from "rxjs";
import {take}                                                       from "rxjs/operators";
import {EmotesQuery}                                                from "@store/emotes/emotes.query";
import {HotToastService}                                            from "@ngneat/hot-toast";
import {SpeechSentenceModel}                                        from "@store/speech/speech.model";
import {GenerateSentence}                                           from "@store/speech/utils/sentence.generator";

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
      if (m.type === 'stt:clear') this.DoClearSentences();
      if (m.type === 'stt:updatesentence') this.DoUpsertSentence(m.data)
    });
  }

  // region plugin control
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

  public StartHost() {
    const plugin             = SPEECH_PLUGINS[this.speechQuery.getValue().selectedPlugin[0]];
    const pluginInstance     = new plugin.plugin();
    const selected           = this.speechQuery.getValue().selectedLanguage;
    const selectedPluginData = this.speechQuery.getValue().selectedPluginData;
    const selectedDialect    = languages[selected[0]][selected[1] + 1][0];
    this.activePlugin        = pluginInstance;
    this.activePlugin.onInter$.subscribe(value => this.UpsertSentence(value, false, SpeechSentenceType.voice))
    this.activePlugin.onFinal$.subscribe(value => this.UpsertSentence(value, true, SpeechSentenceType.voice))
    this.activePlugin.onStatusChanged$.subscribe(value => this.speechStore.update({connectionState: value}))
    this.activePlugin.onPluginCrashed$.pipe(take(1)).subscribe(v => { // restart plugin
      this.toastService.error(v, {theme: "snackbar", position: "bottom-right"});
      this.StopHost();
    });

    this.activePlugin.Start(selectedDialect, selectedPluginData)
        .catch(error => this.toastService.error(error.message, {theme: "snackbar", position: "bottom-right"}));
  }

  // endregion

  private timeout?: Subscription;

  // Show text and start or restart countdown to hide it
  public TriggerShowTimer() {
    const globalConfig = this.styleQuery.getValue().currentStyle.globalStyle;
    const targetTime   = parseInt(globalConfig.inactivityTimer?.value[0] || '1000');
    this.speechStore.update({show: true});
    this.timeout && !this.timeout.closed && this.timeout.unsubscribe();
    this.timeout = timer(targetTime).subscribe(_ => {
      this.speechStore.update(state => {
        if (globalConfig.clearOnInactivity?.value[0]) this.DoClearFinishedSentences();
        state.show = false;
      });
    });
  }

  private isRunningSentence = false;

  private async TryRunNext() {
    if (this.isRunningSentence)
      return;
    const list = this.speechQuery.getAll();
    // find first not played sentence
    const f    = list.find(s => !s.isPlayed && s.finalized);
    if (!f)
      return;
    const style = this.styleQuery.getValue().currentStyle.globalStyle;
    !!style.keepSingleSentence?.value[0] && this.DoClearFinishedSentences();
    this.isRunningSentence = true;
    await f.Run();
    this.isRunningSentence = false;
    this.TryRunNext();
  }

  private DoUpsertSentence(sentence: SpeechSentence) {
    const hasSentence = this.speechQuery.hasEntity(sentence.id);
    this.speechStore.upsert(sentence.id, sentence, {baseClass: SpeechSentenceModel});
    const entity = this.speechQuery.getEntity(sentence.id);

    if (!hasSentence) {
      entity?.BindTypeEvent(() => {
        this.TriggerShowTimer();
        this.speechQuery.onTypingEvent$.next(null)
      });
      const style = this.styleQuery.getValue().currentStyle.globalStyle;
      // clear if not animating
      !style.typingAnimation?.value[0] && !!style.keepSingleSentence?.value[0] && this.DoClearFinishedSentences();
    }

    entity?.Update(sentence);
    this.TryRunNext();
  }

  private UpsertSentence(text: string, finalized = false, type = SpeechSentenceType.voice) {
    const sentence: SpeechSentence | null = GenerateSentence(text, finalized, type, this.emotesQuery, this.speechQuery, this.styleQuery);
    if (!sentence)
      return;
    this.DoUpsertSentence(sentence);
    this.networkService.SendMessage({type: "stt:updatesentence", data: this.speechQuery.getEntity(sentence.id)?.data});
  }

  private DoClearFinishedSentences() {
    this.speechQuery.getAll({filterBy: s => s.finalized && s.isPlayed}).forEach(s => s.Dispose());
    this.speechStore.remove(s => s.finalized && s.isPlayed);
  };

  private DoClearSentences() {
    this.speechQuery.getAll().forEach(s => s.Dispose());
    this.speechStore.remove()
  };

  public ClearSentences() {
    this.DoClearSentences();
    this.networkService.SendMessage({type: "stt:clear", data: null});
  }

  @transaction()
  public InterimTextInput(event: any) {
    this.speechStore.update({textInput: event});
    !!this.styleQuery.getValue().currentStyle.globalStyle.realtimeTyping.value[0] &&
    this.UpsertSentence(event, false, SpeechSentenceType.text);
  }

  @transaction()
  public SendTextInput(event: any) {
    let value: string = event.target?.value;
    if (value === "")
      return;
    this.speechStore.update({textInput: ""});
    this.UpsertSentence(value, true, SpeechSentenceType.text);
  }
}
