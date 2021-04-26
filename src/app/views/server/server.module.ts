import {NgModule}        from '@angular/core';
import {CommonModule}    from '@angular/common';
import {ServerComponent} from './server.component';
import {RouterModule}    from "@angular/router";
import {FormsModule}     from "@angular/forms";


@NgModule({
  declarations: [
    ServerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: ServerComponent}]),
    FormsModule
  ]
})
export class ServerModule {
}
