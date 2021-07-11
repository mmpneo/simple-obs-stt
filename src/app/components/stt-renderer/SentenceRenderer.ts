import {SpeechSentence}            from "@store/speech/speech.store";
import {BehaviorSubject, interval} from "rxjs";
import {takeWhile}                 from "rxjs/operators";
import {SttRendererComponent}      from "./stt-renderer.component";

interface SentenceRendererOptions {
  animate: boolean
  animateWords: boolean,
  interval: number,
  onActivity: () => void,
  onUpdateRenderer: () => void,
  // onFinished: () => void,
}

export class SentenceRenderer {
  constructor(
    public initialData: SpeechSentence,
    private rendererInstance: SttRendererComponent,
    private options: SentenceRendererOptions
  ) {
    this.data = {...initialData};
  }

  public data: SpeechSentence
  public readonly Value: BehaviorSubject<string[][]> = new BehaviorSubject<string[][]>([]);

  public isPlayed = false;

  async Run() {
    if (this.isPlayed || !this.data.finalized)
      return;
    await (this.options.animate ? this.RunStagger() : this.RunSimple());
    this.isPlayed = true;
  }

  public Dispose() {
    this.cancelToken = true;
    this.Value.complete();
  }

  private async RunSimple() {
    this.Value.next(this.data.valueNext);
    this.options.onActivity();
    this.options.onUpdateRenderer();
  }

  cancelToken = false;

  private RunStagger() {
    return new Promise((res, rej) => {
      let newSentence: string[][] = new Array(this.data.valueNext.length)
        .fill(null)
        .map((v, i) => new Array(this.data.valueNext[i].length).fill(null));
      let letterIndex             = 0;
      let wordIndex               = 0;

      interval(this.options.interval).pipe(takeWhile((_data: number) => !this.cancelToken && wordIndex < this.data.valueNext.length)).subscribe({
        next:     () => {
          const word = this.data.valueNext[wordIndex];

          if (this.options.animateWords) { // just insert full word
            newSentence[wordIndex] = word
            wordIndex++;
            this.options.onActivity();
          }
          else {
            if (letterIndex < word.length) {
              newSentence[wordIndex][letterIndex] = word[letterIndex];
              letterIndex++;
              word[letterIndex] !== " " && this.options.onActivity();
            }
            else {
              wordIndex++;
              letterIndex = 0;
            }
          }
          this.Value.next(newSentence);
          this.options.onUpdateRenderer();
        },
        complete: () => res(null)
      })
    })
  }

  Finalize(data: SpeechSentence) {
    this.data = data;
    this.data.finalized && this.Run();
  }

  Update(data: SpeechSentence) {
    this.data = data;
    if (!this.options.animate) { // just show everything if not animating
      this.Value.next(data.valueNext);
      this.options.onActivity();
      this.options.onUpdateRenderer();
    }
  }
}
