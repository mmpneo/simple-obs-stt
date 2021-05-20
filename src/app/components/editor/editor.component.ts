import {ChangeDetectionStrategy, Component, NgModule, OnInit} from '@angular/core';
import {CommonModule}                                         from "@angular/common";
import {StyleService}                                         from "@store/style/style.service";
import {StyleQuery}                                           from "@store/style/style.query";
import {RGBA}                                                 from "ngx-color";
import {FormsModule}                                          from "@angular/forms";
import {TippyModule}                                          from "@ngneat/helipopper";
import {ColorSketchModule}                                    from "ngx-color/sketch";
import {SimplebarAngularModule}                               from "simplebar-angular";
import {ApplicationService}                                   from "@store/application/application.service";
import {FontsService}                                         from "@store/fonts/fonts.service";
import {EmotesService}                                        from "@store/emotes/emotes.service";
import {EmotesQuery}                                          from "@store/emotes/emotes.query";

type StyleSections = 'text' | 'box' | 'avatar' | 'sound' | 'global' | 'emotes';

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
    public fontsService: FontsService,
    public emotesService: EmotesService,
    public emotesQuery: EmotesQuery,
  ) {
  }

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
      case 'text':
        return (val: string) => this.styleService.UpdateTextStyle({[key]: val});
      case 'box':
        return (val: string) => this.styleService.UpdateBoxStyle({[key]: val});
      case 'avatar':
        return (val: string) => this.styleService.UpdateAvatarStyle({[key]: val});
      case 'sound':
        return (val: string) => this.styleService.UpdateSoundStyle({[key]: val});
      case 'global':
        return (val: string) => this.styleService.UpdateGlobalStyle({[key]: val});
      default:
        return (val: string) => null;
    }
  }

  GetCompositeFn(section: 'txt' | 'box' | 'avatar' | 'global', objectKey: string, key: string) {
    switch (section) {
      case 'txt':
        return (val: string) => this.styleService.UpdateTextComposite(objectKey as any, {[key]: val});
      case 'avatar':
        return (val: string) => this.styleService.UpdateAvatarComposite(objectKey as any, {[key]: val});
      default:
        return (val: string) => null;
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
