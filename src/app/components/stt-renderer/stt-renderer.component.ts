import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgModule,
  OnInit,
  ViewChild
}                                             from '@angular/core';
import {CommonModule}                         from "@angular/common";
import {SpeechQuery}                          from "@store/speech/speech.query";
import {StyleQuery}                           from "@store/style/style.query";
import {STTStyle, StyleValue, StyleValueType} from "@store/style/style.store";
import {SpeechSentence}                       from "@store/speech/speech.store";

@Component({
  selector:        'app-stt-renderer',
  templateUrl:     './stt-renderer.component.html',
  styles:          [],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  track = (index: number, obj: SpeechSentence) => obj.id && obj.value;

  private BuildTypedValue(value: StyleValue): string {
    switch (value.type) {
      case StyleValueType.pixels:return value.value + 'px';
      case StyleValueType.ms:return value.value + 'ms';
      case StyleValueType.url:return `url(${value.value})`;
      case StyleValueType.translateX:return `translateX(${value.value}px)`;
      case StyleValueType.translateY:return `translateY(${value.value}px)`;
      default:return value.value;
    }
  }

  private ApplyElementStyleDAta(element: any, styles: { [key: string]: StyleValue }) {
    for (const cssKey in styles)
      element.style[cssKey] = this.BuildTypedValue(styles[cssKey]);
  }

  private ApplyCompositeElementStyleData(element: any, styles: { [styleKey: string]: { [partialKey: string]: StyleValue } }) {
    for (const stylesKey in styles)
      element.style[stylesKey] = Object.values(styles[stylesKey]).map(p => this.BuildTypedValue(p)).join(' ')
  }

  private ApplyStyles(style: STTStyle) {
    this.ApplyElementStyleDAta(this.avatarElement.nativeElement, style.avatarStyle);
    this.ApplyElementStyleDAta(this.boxElement.nativeElement, style.boxStyle);
    this.ApplyElementStyleDAta(this.textElement.nativeElement, style.textStyle);

    this.ApplyCompositeElementStyleData(this.textElement.nativeElement, style.textStyleComposite);
    this.ApplyCompositeElementStyleData(this.avatarElement.nativeElement, style.avatarStyleComposite);
  }

  ngAfterViewInit(): void {
    this.styleQuery.current$.subscribe(style => this.ApplyStyles(style))
  }

  ngOnInit(): void {
    this.speechQuery.sentences$.subscribe(value => { // hotfix of pipe change detection
      this.detector.detectChanges();
      setTimeout(() => this.textElement?.nativeElement?.scrollTo?.({top: this.textElement.nativeElement?.scrollHeight, behavior: 'smooth'}), 50)
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
