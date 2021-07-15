import {Injectable}                from '@angular/core';
import {SoundStore}                from './sound.store';
import {SpeechQuery}               from "@store/speech/speech.query";
import {StyleQuery}                from "@store/style/style.query";
import {NetworkService}            from "@store/network/network.service";
import {ClientType, GetClientType} from "../../utils/client_type";

@Injectable({providedIn: 'root'})
export class SoundService {
  constructor(
    private soundStore: SoundStore,
    private speechQuery: SpeechQuery,
    private styleQuery: StyleQuery,
    private networkService: NetworkService
  ) {
    speechQuery.onTypingEvent$.subscribe(() => this.Play())
    networkService.messages$.subscribe(m => {m.type === 'sound:mute' && this.soundStore.update({muteClient: m.data});});
    networkService.onClientConnected$.subscribe(_ => this.SendClientMuteState());
    this.SoundGraphInit();
    styleQuery.soundClip$.subscribe(clip => this.ResolveTypeAudio(clip.value))
  }

  private audioContext!: AudioContext;

  private typeGainNode!: GainNode;
  private typeAudioBuffer!: AudioBuffer;

  private voiceGainNode!: GainNode;
  private queue: AudioBuffer[] = [];

  private get IsClientMuted() {
    return GetClientType() === ClientType.client && this.soundStore.getValue().muteClient
  }

  private async ResolveTypeAudio(value: [string, string]) {
    if (value[1] === 'base64')
      this.typeAudioBuffer = await this.audioContext.decodeAudioData(this.base64ToArrayBuffer(value[0]))
    else  {
      const resp = await fetch(value[0]);
      const buffer = await resp.arrayBuffer();
      this.typeAudioBuffer = await this.audioContext.decodeAudioData(buffer);
    }
  }


  private base64ToArrayBuffer = (base64: string) => Uint8Array.from(atob(base64), c => c.charCodeAt(0)).buffer;
  private SoundGraphInit() {
    this.audioContext = new AudioContext();
    this.typeGainNode = this.audioContext.createGain();
    this.typeGainNode.connect(this.audioContext.destination);
    this.voiceGainNode = this.audioContext.createGain();
    this.voiceGainNode.connect(this.audioContext.destination);
  }


  private random = (min: number, max: number) => Math.random() * (max - (min)) + (min);
  Play() {
    if (this.soundStore.getValue().mute)
      return;
    const soundStyle = this.styleQuery.getValue().currentStyle.soundStyle;
    const volValue = this.IsClientMuted ? 0 : parseFloat(soundStyle.volume.value[0]);
    if (volValue === 0)
      return;
    this.typeGainNode.gain.setValueAtTime(volValue ?? 0.5, this.audioContext.currentTime);

    const source = this.audioContext.createBufferSource();
    source.buffer = this.typeAudioBuffer;
    source.connect(this.typeGainNode);

    // region effects
    const playbackValue =  soundStyle.typePlayback;
    if (!!playbackValue)
      source.playbackRate.value = playbackValue.linked ? playbackValue.value[0] : this.random(Math.max(playbackValue.value[0], 0.1), Math.min(playbackValue.value[1], 2));
    const detuneValue =  soundStyle.typeDetune;
    if (!!detuneValue)
      source.detune.value = detuneValue.linked ? detuneValue.value[0] : this.random(Math.max(detuneValue.value[0], -1200), Math.min(detuneValue.value[1], 1200));
    // endregion

    source.start();
  }

  TryPlayFromQueue() {
    if (!this.queue.length || this.soundStore.getValue().isVoicePlaying)
      return;
    const clip = this.queue.pop();
    if (!clip)
      return;
    const volValue = this.IsClientMuted ? 0 : parseFloat(this.styleQuery.getValue().currentStyle.soundStyle.voiceVolume.value[0]);
    if (volValue === 0)
      return;
    this.voiceGainNode.gain.setValueAtTime(volValue ?? 0.5, this.audioContext.currentTime);

    const source = this.audioContext.createBufferSource();
    source.buffer = clip;
    source.connect(this.voiceGainNode);
    source.start();
    this.soundStore.update({isVoicePlaying: true});
    source.onended = () => {
      this.soundStore.update({isVoicePlaying: false});
      this.TryPlayFromQueue();
    };
  }

  async PlaySpeech(data: ArrayBuffer) {
    const b = await this.audioContext.decodeAudioData(data);
    this.queue.unshift(b)
    this.TryPlayFromQueue();
  }

  SwitchMute() {
    this.soundStore.update(state => {state.mute = !state.mute;})
  }

  private SendClientMuteState() {
    this.networkService.SendMessage({
      type: 'sound:mute',
      data: this.soundStore.getValue().muteClient
    })
  }

  SwitchMuteClient() {
    this.soundStore.update(state => {state.muteClient = !state.muteClient;})
    this.SendClientMuteState();
  }
}
