import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import {animate, query, stagger, style, transition, trigger}                       from "@angular/animations";
import {combineQueries}                                                            from "@datorama/akita";

@Component({
  selector:        'app-stt-renderer',
  templateUrl:     './stt-renderer.component.html',
  styles:          [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':enter', [
          style({opacity: 0, transform: 'rotate({{rotation}}deg) scale({{scale}}) translateX({{translateX}}px) translateY({{translateY}}px)'}),
          stagger(30, [
            animate('{{time}}s', style({opacity: 1, transform: 'rotate(0) scale(1) translateX(0) translateY(0)'}))
          ])
        ], {optional: true})
      ])
    ])
  ]
})
export class SttRendererComponent implements OnInit, AfterViewInit {
  constructor(
    public speechQuery: SpeechQuery,
    public styleQuery: StyleQuery,
    private detector: ChangeDetectorRef
  ) {
  }

  @ViewChild("avatarElement") avatarElement!: ElementRef;
  @ViewChild("boxElement") boxElement!: ElementRef;
  @ViewChild("textElement") textElement!: ElementRef;

  track       = (index: number, obj: SpeechSentence) => index;
  trackWord       = (index: number, obj: string[]) => index;
  trackLetter       = (index: number, obj: string) => obj;

  private GetRandomRange = (min: number, max: number) => Math.random() * (max - min) + min;
  public GetRandomizedParams(currentStyle: STTStyle) {
    //todo somehow triggering multiple time

    const durationMin = currentStyle.textStyle.durationMin.value[0];
    const durationMax = currentStyle.textStyle.durationMax.value[0];
    const scaleMin = currentStyle.textStyle.scaleMin.value[0];
    const scaleMax = currentStyle.textStyle.scaleMax.value[0];
    const rotationMin = currentStyle.textStyle.rotationMin.value[0];
    const rotationMax = currentStyle.textStyle.rotationMax.value[0];
    const translationXMin = currentStyle.textStyle.translationXMin.value[0];
    const translationXMax = currentStyle.textStyle.translationXMax.value[0];
    const translationYMin = currentStyle.textStyle.translationYMin.value[0];
    const translationYMax = currentStyle.textStyle.translationYMax.value[0];
    return {
      time: this.GetRandomRange(durationMin, durationMax).toFixed(1),
      scale: this.GetRandomRange(scaleMin, scaleMax).toFixed(1),
      rotation: this.GetRandomRange(rotationMin, rotationMax).toFixed(1),
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

  ngOnInit(): void {
    this.speechQuery.sentences$.subscribe(value => { // hotfix of pipe change detection
      this.detector.detectChanges();
      setTimeout(() => this.textElement?.nativeElement?.scrollTo?.({
        top:      this.textElement.nativeElement?.scrollHeight,
        behavior: 'smooth'
      }), 50)
    });
  }

}

@NgModule({
  declarations: [SttRendererComponent],
  exports:      [SttRendererComponent],
  imports:      [CommonModule]
})
export class SttRendererModule {
}
