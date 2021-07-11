import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgModule,
  OnInit,
  ViewChild
}                                                                                  from '@angular/core';
import {CommonModule}                                                              from "@angular/common";
import {SpeechQuery}                                                               from "@store/speech/speech.query";
import {StyleQuery}                                                                from "@store/style/style.query";
import {BuildTypedValue, CUSTOM_STYLE_LOGIC, STTStyle, StyleValue, StyleValueType} from "@store/style/style.store";
import {SpeechSentence}                                                            from "@store/speech/speech.store";
import {animate, style, transition, trigger}                                       from "@angular/animations";
import {combineQueries}                                                            from "@datorama/akita";
import {SoundService}                                                              from "@store/sound/sound.service";
import {SentenceRenderer}                                                          from "./SentenceRenderer";
import {SpeechService}                                                             from "@store/speech/speech.service";

@Component({
  selector:        'app-stt-renderer',
  templateUrl:     './stt-renderer.component.html',
  styles:          [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations:      [
    trigger('listAnimation', [
      transition(':enter', [ // each time the binding value changes
        style({
          opacity:   0,
          transform: 'rotate({{rotation}}deg) scale({{scale}}) translateX({{translateX}}px) translateY({{translateY}}px)'
        }),
        animate('{{time}}s', style({opacity: 1, transform: 'rotate(0) scale(1) translateX(0) translateY(0)'}))
      ])
    ]),
    trigger('opacity', [])
  ]
})
export class SttRendererComponent implements OnInit, AfterViewInit {
  constructor(
    public speechQuery: SpeechQuery,
    private speechService: SpeechService,
    public styleQuery: StyleQuery,
    private soundService: SoundService,
  ) {
  }

  @ViewChild("avatarElement") avatarElement!: ElementRef;
  @ViewChild("boxElement") boxElement!: ElementRef;
  @ViewChild("textElement") textElement!: ElementRef;

  track       = (index: number, obj: SentenceRenderer) => obj.data.id;
  trackWord   = (index: number, obj: string[]) => index;
  trackLetter = (index: number, obj: string) => obj;

  private GetRandomRange = (min: number, max: number) => Math.random() * (max - min) + min;

  public GetRandomizedParams(currentStyle: STTStyle) {
    //todo somehow triggering multiple time

    const durationMin     = currentStyle.textStyle.durationMin.value[0];
    const durationMax     = currentStyle.textStyle.durationMax.value[0];
    const scaleMin        = currentStyle.textStyle.scaleMin.value[0];
    const scaleMax        = currentStyle.textStyle.scaleMax.value[0];
    const rotationMin     = currentStyle.textStyle.rotationMin.value[0];
    const rotationMax     = currentStyle.textStyle.rotationMax.value[0];
    const translationXMin = currentStyle.textStyle.translationXMin.value[0];
    const translationXMax = currentStyle.textStyle.translationXMax.value[0];
    const translationYMin = currentStyle.textStyle.translationYMin.value[0];
    const translationYMax = currentStyle.textStyle.translationYMax.value[0];
    return {
      time:       this.GetRandomRange(durationMin, durationMax).toFixed(1),
      scale:      this.GetRandomRange(scaleMin, scaleMax).toFixed(1),
      rotation:   this.GetRandomRange(rotationMin, rotationMax).toFixed(1),
      translateX: this.GetRandomRange(translationXMin, translationXMax).toFixed(1),
      translateY: this.GetRandomRange(translationYMin, translationYMax).toFixed(1),
    }
  }

  private ApplyElementStyleDAta(style: STTStyle, section: keyof Omit<STTStyle, 'version'>, element: any, styles: { [key: string]: StyleValue }, valueIndex: number) {
    for (const cssKey in styles) {
      const customLogic = CUSTOM_STYLE_LOGIC[section]?.[cssKey];
      if (styles[cssKey].type === StyleValueType.logic) {
        !!customLogic && customLogic(style, element.style, BuildTypedValue(styles[cssKey], valueIndex), valueIndex);
        continue;
      }
      if (!!customLogic)
        customLogic(style, element.style, BuildTypedValue(styles[cssKey], valueIndex), valueIndex)
      else
        element.style[cssKey] = BuildTypedValue(styles[cssKey], valueIndex);
    }
  }

  private ApplyStyles(style: STTStyle, valueIndex: number) {
    this.ApplyElementStyleDAta(style, 'avatarStyle', this.avatarElement.nativeElement, style.avatarStyle, valueIndex);
    this.ApplyElementStyleDAta(style, 'boxStyle', this.boxElement.nativeElement, style.boxStyle, valueIndex);
    this.ApplyElementStyleDAta(style, 'textStyle', this.textElement.nativeElement, style.textStyle, valueIndex);
  }

  ngAfterViewInit(): void {
    combineQueries([this.styleQuery.current$, this.speechQuery.showBubble$]).subscribe(([style, show]) => {
      this.ApplyStyles(style, show ? 0 : 1)
    })
  }

  private AnimateScroll() {
    setTimeout(() => this.textElement?.nativeElement?.scrollTo?.({
      top:      this.textElement.nativeElement?.scrollHeight,
      behavior: 'smooth'
    }), 50)
  }


  private mappedList: { [id: string]: SentenceRenderer } = {}
  list: SentenceRenderer[]                               = []

  // current sentence
  private isRunningSentence   = false;

  private CreateSentence(data: SpeechSentence) {
    const style    = this.styleQuery.getValue().currentStyle.globalStyle;

    const sentence = new SentenceRenderer(data, this, {
      animate:          !!style.typingAnimation.value[0],
      animateWords:     !!style.typeWords.value[0],
      interval:         style.typingDelay.value[0],
      onUpdateRenderer: () => this.AnimateScroll(),
      onActivity:       () => {
        this.speechService.TriggerShowTimer();
        this.soundService.Play();
      }
    });
    this.list.push(sentence);
    this.mappedList[data.id] = sentence;
  }

  private async TryRunNext() {
    if (this.isRunningSentence)
      return;
    // find first not played sentc
    const f = this.list.find(s => !s.isPlayed && s.data.finalized);
    if (!f)
      return;
    const style = this.styleQuery.getValue().currentStyle.globalStyle;
    if (!!style.keepSingleSentence.value[0])
      this.list = this.list.filter(s => {
        s.isPlayed && s.Dispose();
        return !s.isPlayed;
      });

    this.isRunningSentence = true;
    await f.Run();
    this.isRunningSentence = false;

    this.TryRunNext();
  }

  private Clear() {
    this.list.forEach(s => s.Dispose());
    this.list                = [];
    this.isRunningSentence   = false;
  }

  ngOnInit(): void {
    this.speechQuery.onClear$.subscribe(_ => this.Clear())
    this.speechQuery.onSentenceUpdate$.subscribe(data => {
      if (!data) return;
      if (this.mappedList[data.id])
        this.mappedList[data.id]?.Update(data);
      else this.CreateSentence(data);
      this.TryRunNext();
    })
  }
}

@NgModule({
  declarations: [SttRendererComponent],
  exports:      [SttRendererComponent],
  imports:      [CommonModule]
})
export class SttRendererModule {
}
