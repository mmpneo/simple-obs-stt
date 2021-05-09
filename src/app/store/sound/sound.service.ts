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
    speechQuery.onSentenceUpdate$.subscribe(_ => this.Play())
  }

  private typeClip = new Audio('assets/sounds/type_1.wav');

  Play() {
    const volValue = parseFloat(this.styleQuery.getValue().currentStyle.soundStyle.volume.value);
    if (volValue === 0)
      return;
    this.typeClip.volume = volValue ?? 0.5;
    (this.typeClip.currentTime !== 0) && this.typeClip.pause();
    this.typeClip.currentTime = 0;
    this.typeClip?.play();
  }

}
