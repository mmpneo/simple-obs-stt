import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgModule,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
}                                            from '@angular/core';
import {CommonModule}                        from "@angular/common";
import {SpeechQuery}                         from "@store/speech/speech.query";
import {StyleQuery}                          from "@store/style/style.query";
import {STTStyle}                            from "@store/style/style.store";
import {SpeechSentence}                      from "@store/speech/speech.store";
import {animate, style, transition, trigger} from "@angular/animations";
import {SanitizeHtmlPipeModule}              from "../../pipes/sanitize-html.pipe";
import {EffectsService}                      from "@store/effects/effects.service";
import {GetClientType}                       from "../../utils/client_type";

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
    public styleQuery: StyleQuery,
    private effectsService: EffectsService
  ) {
  }

  @ViewChild("textElement") textElement!: ElementRef;
  @ViewChildren("letterElement") letters!: QueryList<ElementRef>;

  track       = (index: number, obj: SpeechSentence) => obj.id;
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

  clientType = GetClientType()

  ngAfterViewInit(): void {
    this.letters.changes.subscribe(_ => {
      const ls = document.querySelectorAll('.letter');
      if (!ls.length)
        return;
      const last = ls[ls.length - 1];
      const rect = last?.getBoundingClientRect();
      (rect?.height === 0 || !!last.innerHTML) && this.effectsService.PlayParticles(rect);
    })
    this.letters?.notifyOnChanges();
  }

  private AnimateScroll() {
    this.textElement?.nativeElement?.scrollTo?.({
      top: this.textElement.nativeElement?.scrollHeight,
      // behavior: 'smooth'
    });
  }

  ngOnInit(): void {
    this.speechQuery.onTypingEvent$.subscribe(() => this.AnimateScroll())
  }
}

@NgModule({
  declarations: [SttRendererComponent],
  exports:      [SttRendererComponent],
  imports:      [CommonModule, SanitizeHtmlPipeModule]
})
export class SttRendererModule {
}
