import {NgModule}          from '@angular/core';
import {CommonModule}      from '@angular/common';
import {ClientComponent}   from './client.component';
import {RouterModule}      from "@angular/router";
import {SttRendererModule} from "../../components/stt-renderer/stt-renderer.component";


@NgModule({
  declarations: [
    ClientComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: ':id', component: ClientComponent}]),
    SttRendererModule
  ]
})
export class ClientModule {
}
