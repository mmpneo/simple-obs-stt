import {Component, OnInit, ChangeDetectionStrategy, NgModule} from '@angular/core';
import {CommonModule}                                         from "@angular/common";
import {StyleService}                                         from "@store/style/style.service";
import {StyleQuery}                                           from "@store/style/style.query";
import {RGBA}                                                 from "ngx-color";
import {FormsModule}                                          from "@angular/forms";
import {TippyModule}                                          from "@ngneat/helipopper";
import {ColorSketchModule}                                    from "ngx-color/sketch";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit {
  constructor(
    public styleService: StyleService,
    public styleQuery: StyleQuery,
  ) { }

  activeTab: 'text' | 'box' | 'avatar' | 'global' = 'text';

  ChangeTab(value: EditorComponent["activeTab"]) {
    this.activeTab = value;
    // this.detector.markForCheck();
  }

  RgbaToString(rgba: RGBA) {
    return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
  }

  GetFn(section: 'txt' | 'box' | 'avatar' | 'global', key: string) {
    switch (section) {
      case 'txt':     return (val: string) => this.styleService.UpdateTextStyle({[key]: val});
      case 'box':     return (val: string) => this.styleService.UpdateBoxStyle({[key]: val});
      case 'avatar':  return (val: string) => this.styleService.UpdateAvatarStyle({[key]: val});
      case 'global':  return (val: string) => this.styleService.UpdateGlobalStyle({[key]: val});
      default: return (val: string) => null;
    }
  }

  GetCompositeFn(section: string, objectKey: string, key: string) {
    // if (section === 'txt')
    return (val: string) => this.styleService.UpdateTextComposite(objectKey as any, {[key]: val})
  }


  ngOnInit(): void {}

}
@NgModule({
  declarations: [EditorComponent],
  exports: [EditorComponent],
  imports: [CommonModule, FormsModule, TippyModule, ColorSketchModule]
})
export class EditorModule {}
