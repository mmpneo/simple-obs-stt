import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgModule,
  OnInit,
  ViewChild
}                                                                 from '@angular/core';
import {CommonModule}                                             from "@angular/common";
import {SpeechQuery}                                              from "@store/speech/speech.query";
import {StyleQuery}                                               from "@store/style/style.query";
import {CUSTOM_STYLE_LOGIC, STTStyle, StyleValue, StyleValueType} from "@store/style/style.store";
import {SpeechSentence}                                           from "@store/speech/speech.store";
import {animate, query, style, transition, trigger}               from "@angular/animations";

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
          animate('{{time}}s', style({opacity: 1, transform: 'rotate(0) scale(1) translateX(0) translateY(0)'}))
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

  private BuildTypedValue(value: StyleValue): string | number {
    switch (value.type) {
      case StyleValueType.pixels: return value.value + 'px';
      case StyleValueType.ms: return value.value + 'ms';
      case StyleValueType.url: return `url(${value.value})`;
      case StyleValueType.translateX: return `translateX(${value.value}px)`;
      case StyleValueType.translateY: return `translateY(${value.value}px)`;
      case StyleValueType.number: return value.value;
      default: return value.value;
    }
  }

  private GetRandomRange(min: number, max: number) {
    return Math.random() * (max - min) + min
  }
  public GetRandomizedParams(currentStyle: STTStyle) {
    //todo somehow triggering multiple time

    const durationMin = currentStyle.textStyle.durationMin.value;
    const durationMax = currentStyle.textStyle.durationMax.value;
    const scaleMin = currentStyle.textStyle.scaleMin.value;
    const scaleMax = currentStyle.textStyle.scaleMax.value;
    const rotationMin = currentStyle.textStyle.rotationMin.value;
    const rotationMax = currentStyle.textStyle.rotationMax.value;
    const translationXMin = currentStyle.textStyle.translationXMin.value;
    const translationXMax = currentStyle.textStyle.translationXMax.value;
    const translationYMin = currentStyle.textStyle.translationYMin.value;
    const translationYMax = currentStyle.textStyle.translationYMax.value;
    // console.log(this.GetRandomRange(durationMin, durationMax).toFixed(1))
    return {
      time: this.GetRandomRange(durationMin, durationMax).toFixed(1),
      scale: this.GetRandomRange(scaleMin, scaleMax).toFixed(1),
      rotation: this.GetRandomRange(rotationMin, rotationMax).toFixed(1),
      translateX: this.GetRandomRange(translationXMin, translationXMax).toFixed(1),
      translateY: this.GetRandomRange(translationYMin, translationYMax).toFixed(1),
    }
  }

  private ApplyElementStyleDAta(style: STTStyle, section: keyof STTStyle, element: any, styles: { [key: string]: StyleValue }) {
    for (const cssKey in styles) {
      if (styles[cssKey].type === StyleValueType.logic)
        continue;
      const customLogic = CUSTOM_STYLE_LOGIC[section]?.[cssKey];
      if (!!customLogic)
        customLogic(style, element.style, this.BuildTypedValue(styles[cssKey]))
      else
        element.style[cssKey] = this.BuildTypedValue(styles[cssKey]);
    }
  }

  private ApplyCompositeElementStyleData(element: any, styles: { [styleKey: string]: { [partialKey: string]: StyleValue } }) {
    for (const stylesKey in styles)
      element.style[stylesKey] = Object.values(styles[stylesKey]).map(p => this.BuildTypedValue(p)).join(' ')
  }

  private ApplyStyles(style: STTStyle) {
    this.ApplyElementStyleDAta(style, 'avatarStyle', this.avatarElement.nativeElement, style.avatarStyle);
    this.ApplyElementStyleDAta(style, 'boxStyle', this.boxElement.nativeElement, style.boxStyle);
    this.ApplyElementStyleDAta(style, 'textStyle', this.textElement.nativeElement, style.textStyle);

    this.ApplyCompositeElementStyleData(this.textElement.nativeElement, style.textStyleComposite);
    this.ApplyCompositeElementStyleData(this.avatarElement.nativeElement, style.avatarStyleComposite);
  }

  ngAfterViewInit(): void {
    this.styleQuery.current$.subscribe(style => this.ApplyStyles(style))
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
