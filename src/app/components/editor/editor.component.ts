import {ChangeDetectionStrategy, Component, NgModule, OnInit} from '@angular/core';
import {CommonModule}                                         from "@angular/common";
import {StyleService}                                         from "@store/style/style.service";
import {StyleQuery}             from "@store/style/style.query";
import {RGBA}                   from "ngx-color";
import {FormsModule}            from "@angular/forms";
import {TippyModule}            from "@ngneat/helipopper";
import {ColorSketchModule}      from "ngx-color/sketch";
import {SimplebarAngularModule} from "simplebar-angular";
import {ApplicationService}     from "@store/application/application.service";
import {FontsService}           from "@store/fonts/fonts.service";
import {EmotesService}          from "@store/emotes/emotes.service";
import {EmotesQuery}            from "@store/emotes/emotes.query";
import {environment}            from 'src/environments/environment';
import {SoundService}           from "@store/sound/sound.service";
import {SoundQuery}             from "@store/sound/sound.query";
import {ApplicationQuery}       from "@store/application/application.query";
import {SpeechService}          from "@store/speech/speech.service";
import {SpeechQuery}            from "@store/speech/speech.query";

type StyleSections = 'text' | 'box' | 'avatar' | 'sound' | 'global' | 'emotes' | 'particles';

@Component({
  selector:        'app-editor',
  templateUrl:     './editor.component.html',
  styles:          [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit {
  constructor(
    public styleService: StyleService,
    public styleQuery: StyleQuery,
    public applicationService: ApplicationService,
    public applicationQuery: ApplicationQuery,
    public fontsService: FontsService,
    public emotesService: EmotesService,
    public emotesQuery: EmotesQuery,
    public soundService: SoundService,
    public soundQuery: SoundQuery,
    public speechQuery: SpeechQuery,
    public speechService: SpeechService
  ) {
  }

  environment = environment;
  activeTab: StyleSections = 'text';

  selectedFontLetter = 'a';

  trackBindings = (index: number, obj: any) => index;
  trackFonts    = (index: number, obj: any) => obj.family;

  ChangeTab(value: EditorComponent["activeTab"]) {
    this.activeTab = value;
    // this.detector.markForCheck();
  }

  RgbaToString(rgba: RGBA) {
    return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
  }


  prevent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation()
    return false;
  }

  GetFn(section: StyleSections, key: string) {
    switch (section) {
      case 'text':    return (val: string, valueIndex: number) => this.styleService.UpdateNormalStyles("textStyle", key,val, valueIndex);
      case 'box':     return (val: string, valueIndex: number) => this.styleService.UpdateNormalStyles("boxStyle", key,val, valueIndex);
      case 'avatar':  return (val: string, valueIndex: number) => this.styleService.UpdateNormalStyles("avatarStyle", key,val, valueIndex);
      case 'sound':   return (val: string, valueIndex: number) => this.styleService.UpdateNormalStyles("soundStyle", key,val, valueIndex);
      case 'global':  return (val: string, valueIndex: number) => this.styleService.UpdateNormalStyles("globalStyle", key,val, valueIndex);
      case 'particles':  return (val: string, valueIndex: number) => this.styleService.UpdateNormalStyles("particleStyles", key,val, valueIndex);
      default:        return (val: string, valueIndex: number) => null;
    }
  }

  //Generate link switch function
  GetSwFn(section: StyleSections, key: string) {
    switch (section) {
      case 'text':    return () => this.styleService.UpdateLinkSwitch("textStyle", key);
      case 'box':     return () => this.styleService.UpdateLinkSwitch("boxStyle", key);
      case 'avatar':  return () => this.styleService.UpdateLinkSwitch("avatarStyle", key);
      case 'sound':   return () => this.styleService.UpdateLinkSwitch("soundStyle", key);
      case 'global':  return () => this.styleService.UpdateLinkSwitch("globalStyle", key);
      case 'particles':  return () => this.styleService.UpdateLinkSwitch("particleStyles", key);
      default:        return () => null;
    }
  }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [EditorComponent],
  exports:      [EditorComponent],
  imports:      [CommonModule, FormsModule, TippyModule, ColorSketchModule, SimplebarAngularModule]
})
export class EditorModule {
}
