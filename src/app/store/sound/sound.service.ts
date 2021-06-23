import {Injectable}  from '@angular/core';
import {SoundStore}  from './sound.store';
import {SpeechQuery} from "@store/speech/speech.query";
import {StyleQuery}  from "@store/style/style.query";

@Injectable({providedIn: 'root'})
export class SoundService {
  constructor(
    private soundStore: SoundStore,
    private speechQuery: SpeechQuery,
    private styleQuery: StyleQuery
  ) {
    this.SoundGraphInit();
    speechQuery.onSentenceUpdate$.subscribe(_ => this.Play());
    styleQuery.soundClip$.subscribe(clip => this.ResolveTypeAudio(clip.value))
  }

  private audioContext!: AudioContext;

  private typeGainNode!: GainNode;
  private typeAudioBuffer!: AudioBuffer;

  private voiceGainNode!: GainNode;
  private queue: AudioBuffer[] = [];

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

  Play() {
    if (this.soundStore.getValue().mute)
      return;
    const volValue = parseFloat(this.styleQuery.getValue().currentStyle.soundStyle.volume.value[0]);
    if (volValue === 0)
      return;
    this.typeGainNode.gain.setValueAtTime(volValue ?? 0.5, this.audioContext.currentTime);

    const source = this.audioContext.createBufferSource();
    source.buffer = this.typeAudioBuffer;
    source.connect(this.typeGainNode);
    source.start();
  }

  TryPlayFromQueue() {
    if (!this.queue.length || this.soundStore.getValue().isVoicePlaying)
      return;
    const clip = this.queue.pop();
    if (!clip)
      return;
    const volValue = parseFloat(this.styleQuery.getValue().currentStyle.soundStyle.voiceVolume.value[0]);
    this.typeGainNode.gain.setValueAtTime(volValue ?? 0.5, this.audioContext.currentTime);

    const source = this.audioContext.createBufferSource();
    source.buffer = clip;
    source.connect(this.typeGainNode);
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
}
