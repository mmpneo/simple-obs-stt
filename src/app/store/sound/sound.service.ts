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
    speechQuery.onSentenceUpdate$.subscribe(_ => this.Play());
    this.VoiceInit();
  }

  private typeClip = new Audio('assets/sounds/type_1.wav');

  Play() {
    const volValue = parseFloat(this.styleQuery.getValue().currentStyle.soundStyle.volume.value[0]);
    if (volValue === 0)
      return;
    this.typeClip.volume = volValue ?? 0.5;
    (this.typeClip.currentTime !== 0) && this.typeClip.pause();
    this.typeClip.currentTime = 0;
    this.typeClip?.play();
  }

  private voiceAudio!: HTMLAudioElement;
  private queue: ArrayBuffer[] = [];

  private VoiceInit() {
    this.voiceAudio = new Audio();
    this.voiceAudio.onplay = () => {
      this.soundStore.update({isVoicePlaying: true});
    }
    this.voiceAudio.onended = () => {
      this.soundStore.update({isVoicePlaying: false});
      this.TryPlayFromQueue();
    }
  }

  TryPlayFromQueue() {
    if (!this.queue.length || this.soundStore.getValue().isVoicePlaying)
      return;
    const clip = this.queue.pop();
    if (!clip)
      return;
    const volValue = parseFloat(this.styleQuery.getValue().currentStyle.soundStyle.voiceVolume.value[0]);
    this.voiceAudio.volume       = volValue ?? 1;
    const blob     = new Blob([clip], {type: "audio/wav"});
    this.voiceAudio.src          = window.URL.createObjectURL(blob);
    this.voiceAudio.play();
  }

  PlaySpeech(data: ArrayBuffer) {
    this.queue.unshift(data);
    this.TryPlayFromQueue();
  }
}
