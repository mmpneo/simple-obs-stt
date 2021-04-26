import {NgModule}        from '@angular/core';
import {CommonModule}    from '@angular/common';
import {ClientComponent} from './client.component';
import {RouterModule}    from "@angular/router";


@NgModule({
  declarations: [
    ClientComponent
  ],
  imports:      [
    CommonModule,
    RouterModule.forChild([{path: ':id', component: ClientComponent}])
  ]
})
export class ClientModule {
}
