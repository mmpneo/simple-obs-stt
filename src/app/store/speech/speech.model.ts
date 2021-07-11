import {SpeechSentence, SpeechSentenceType} from "@store/speech/speech.store";
import {ID}                                 from "@datorama/akita";
import {BehaviorSubject, interval}          from "rxjs";
import {takeWhile}                          from "rxjs/operators";

export class SpeechSentenceModel implements SpeechSentence{
  constructor(data: SpeechSentence) {
    Object.assign(this, data)
  }
  finalized!: boolean;
  id!: ID;
  ttsValue!: string;
  type!: SpeechSentenceType;
  valueNext!: string[][];
  animation!: { animate: boolean; animateWords: boolean; interval: number; };

  public isPlayed = false;
  AnimatedValue = new BehaviorSubject<string[][]>([]);
  private cancelToken = false;
  private CallTypeEvent?: () => void;

  get data(): SpeechSentence {
    return {
      animation: this.animation,
      finalized: this.finalized,
      id:        this.id,
      ttsValue:  this.ttsValue,
      type:      this.type,
      valueNext: this.valueNext,
    }
  }

  async Run() {
    if (this.isPlayed || !this.finalized)
      return;
    await (this.animation.animate ? this.RunStagger() : this.RunSimple());
    this.isPlayed = true;
  }

  BindTypeEvent = (fn: () => void) => this.CallTypeEvent = fn;

  Update(data: SpeechSentence) {
    Object.assign(this, data);
    if (!this.animation.animate) { // just show everything if not animating
      this.AnimatedValue.next(data.valueNext);
      this.CallTypeEvent?.();
    }
  }

  public Dispose() {
    this.cancelToken = true;
    this.AnimatedValue.complete();
  }

  private async RunSimple() {
    this.AnimatedValue.next(this.valueNext);
    this.CallTypeEvent?.();
  }

  RunStagger() {
    return new Promise((res, rej) => {
      let newSentence: string[][] = new Array(this.valueNext.length).fill(null).map((v, i) => new Array(this.valueNext[i].length).fill(null));
      let letterIndex             = 0;
      let wordIndex               = 0;

      interval(this.animation.interval).pipe(takeWhile((_data: number) => !this.cancelToken && wordIndex < this.valueNext.length)).subscribe({
        next:     () => {
          const word = this.valueNext[wordIndex];

          if (this.animation.animateWords) { // just insert full word
            newSentence[wordIndex] = word
            wordIndex++;
            this.CallTypeEvent?.();
          }
          else {
            if (letterIndex < word.length) {
              newSentence[wordIndex][letterIndex] = word[letterIndex];
              letterIndex++;
              word[letterIndex] !== " " && this.CallTypeEvent?.();
            }
            else {
              wordIndex++;
              letterIndex = 0;
            }
          }
          this.AnimatedValue.next(newSentence);
        },
        complete: () => res(null)
      })
    })
  }
}
