import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';
import {AuthComponent} from './auth.component';
import {RouterModule}  from "@angular/router";


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports:      [
    RouterModule.forChild([
      {path: 'twitch', component: AuthComponent}
    ]),
    CommonModule
  ]
})
export class AuthModule {
}
