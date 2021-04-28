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

  sentences: SpeechSentence[] = [];

  @ViewChild("boxElement") boxElement!: ElementRef;
  @ViewChild("textElement") textElement!: ElementRef;

  track = (index: number, obj: SpeechSentence) => obj.id && obj.value;

  private ApplyElementStyleDAta(element: any, styles: { [key: string]: StyleValue }) {
    for (const cssKey in styles)
      element.style[cssKey] = styles[cssKey].value + (styles[cssKey].type === StyleValueType.string ? '' : 'px');
  }

  private ApplyCompositeElementStyleData(element: any, styles: { [styleKey: string]: { [partialKey: string]: StyleValue } }) {
    for (const stylesKey in styles)
      element.style[stylesKey] = Object.values(styles[stylesKey]).map(p => p.value + (p.type === StyleValueType.string ? '' : 'px')).join(' ')
  }

  private ApplyStyles(style: STTStyle) {
    this.ApplyElementStyleDAta(this.boxElement.nativeElement, style.boxStyle);
    this.ApplyElementStyleDAta(this.textElement.nativeElement, style.textStyle);
    this.ApplyCompositeElementStyleData(this.textElement.nativeElement, style.textStyleComposite);
  }

  ngAfterViewInit(): void {
    this.styleQuery.current$.subscribe(style => this.ApplyStyles(style))
  }

  ngOnInit(): void {
    this.speechQuery.sentences$.subscribe(value => { // hotfix of pipe change detection
      this.sentences = value;
      this.detector.markForCheck();
      this.boxElement?.nativeElement?.scrollTo?.({top: this.boxElement.nativeElement?.scrollHeight, behavior: 'smooth'})
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
