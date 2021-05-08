import {ChangeDetectionStrategy, Component, NgModule, OnInit} from '@angular/core';
import {CommonModule}                                         from "@angular/common";
import {StyleService}                                         from "@store/style/style.service";
import {StyleQuery}                                           from "@store/style/style.query";
import {RGBA}                                                 from "ngx-color";
import {FormsModule}                                          from "@angular/forms";
import {TippyModule}                                          from "@ngneat/helipopper";
import {ColorSketchModule}                                    from "ngx-color/sketch";
import {ApplicationQuery}                                     from "@store/application/application.query";
import {SimplebarAngularModule}                               from "simplebar-angular";
import {ApplicationService}                                   from "@store/application/application.service";

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
    public applicationQuery: ApplicationQuery,
    public applicationService: ApplicationService,
  ) {
  }

  activeTab: 'text' | 'box' | 'avatar' | 'global' = 'text';

  trackFonts = (index: number, obj: any) => obj.family;

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

  GetFn(section: 'txt' | 'box' | 'avatar' | 'global', key: string) {
    switch (section) {
      case 'txt':     return (val: string) => this.styleService.UpdateTextStyle({[key]: val});
      case 'box':     return (val: string) => this.styleService.UpdateBoxStyle({[key]: val});
      case 'avatar':  return (val: string) => this.styleService.UpdateAvatarStyle({[key]: val});
      case 'global':  return (val: string) => this.styleService.UpdateGlobalStyle({[key]: val});
      default:        return (val: string) => null;
    }
  }

  GetCompositeFn(section: 'txt' | 'box' | 'avatar' | 'global', objectKey: string, key: string) {
    switch (section) {
      case 'txt':     return (val: string) => this.styleService.UpdateTextComposite(objectKey as any, {[key]: val});
      case 'avatar':  return (val: string) => this.styleService.UpdateAvatarComposite(objectKey as any, {[key]: val});
      // case 'box':     return (val: string) => this.styleService.UpdateBoxStyle({[key]: val});
      // case 'global':  return (val: string) => this.styleService.UpdateGlobalStyle({[key]: val});
      default:        return (val: string) => null;
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
