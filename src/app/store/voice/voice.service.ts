import {Injectable}                from '@angular/core';
import {VoiceStore}                from './voice.store';
import {VOICE_PLUGINS}             from "@store/voice/plugins";
import {BaseVoicePlugin}           from "@store/voice/plugins/BaseVoicePlugin";
import {SpeechQuery}               from "@store/speech/speech.query";
import {ClientType, GetClientType} from "../../utils/client_type";
import {take}                      from "rxjs/operators";
import {HotToastService}           from "@ngneat/hot-toast";
import {NetworkService}            from "@store/network/network.service";
import {SoundService}              from "@store/sound/sound.service";

@Injectable({providedIn: 'root'})
export class VoiceService {
  constructor(
    private voiceStore: VoiceStore,
    private speechQuery: SpeechQuery,
    private toastService: HotToastService,
    private networkService: NetworkService,
    private soundService: SoundService) {
    if (GetClientType() === ClientType.host)
      speechQuery.onNewLastSentence$.subscribe(a => this.Enqueue(a?.valueNext.flat().join("")))
    networkService.messages$.subscribe(m => {
      if (m.type === 'tts:play')
        soundService.PlaySpeech(m.data);
    });
  }

  private Enqueue(q: string) {
      q
      && this.pluginInstance
      && this.pluginInstance.RequestPlay(q)
  }

  public SelectPlugin   = (index: number) => {
    this.voiceStore.update(e => ({
      selectedPluginData: new Array(VOICE_PLUGINS[index].pluginDataFields.length).fill(null),
      selectedPlugin:     [index, 0, 0]
    }));
  };
  public SelectLanguage = (index: number) => this.voiceStore.update(e => ({selectedPlugin: [e.selectedPlugin[0], index, 0]}));
  public SelectVoice    = (index: number) => this.voiceStore.update(e => ({selectedPlugin: [e.selectedPlugin[0], e.selectedPlugin[1], index]}));

  public UpdatePluginData = (index: number, data: string) => this.voiceStore.update(e => {
    e.selectedPluginData[index] = data;
  });

  private pluginInstance?: BaseVoicePlugin;

  StartHost() {
    const state          = this.voiceStore.getValue();
    const plugin         = VOICE_PLUGINS[state.selectedPlugin[0]];
    this.pluginInstance = new plugin.plugin();
    const languageCode = plugin.languages[state.selectedPlugin[1]][1];
    const voiceCode = plugin.languages[state.selectedPlugin[1]][2][state.selectedPlugin[2]][1];
    this.pluginInstance.onStatusChanged$.subscribe(value => this.voiceStore.update({connectionState: value}));
    this.pluginInstance.onPluginCrashed$.pipe(take(1)).subscribe(v => { // restart plugin
      this.toastService.error(v, {theme: "snackbar", position: "bottom-right"});
      this.StopHost();
    });
    this.pluginInstance.onFinal$.subscribe(data => {
      if (!data?.byteLength)
        return;
      this.networkService.SendAudio(data);
      !this.voiceStore.getValue().mute && this.soundService.PlaySpeech(data);
    })

    this.pluginInstance.Start(languageCode, voiceCode, state.selectedPluginData);
  }

  public async StopHost() {
    await this.pluginInstance?.Stop();
    this.pluginInstance = undefined;
  }

  SwitchMute() {
    this.voiceStore.update(state => {state.mute = !state.mute;})
  }
}
