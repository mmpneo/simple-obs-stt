import {NgModule}          from '@angular/core';
import {CommonModule}      from '@angular/common';
import {ServerComponent}   from './server.component';
import {RouterModule}      from "@angular/router";
import {FormsModule}       from "@angular/forms";
import {SttRendererModule} from "../../components/stt-renderer/stt-renderer.component";
import {TippyModule}       from "@ngneat/helipopper";
import {ColorSketchModule} from "ngx-color/sketch";


@NgModule({
  declarations: [
    ServerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: ServerComponent}]),
    FormsModule,
    SttRendererModule,
    TippyModule,
    ColorSketchModule
  ]
})
export class ServerModule {
}
