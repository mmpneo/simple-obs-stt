import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment }                                  from '../environments/environment';
import {popperVariation, TippyModule, tooltipVariation} from '@ngneat/helipopper';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    TippyModule.forRoot({
      defaultVariation: 'tooltip',
      variations:       {
        tooltip: {...tooltipVariation, arrow: true, offset: [0, 10]},
        popper:  {...popperVariation, theme: undefined, offset: [0, 15], role: 'popper', popperOptions: {modifiers: [{name: 'preventOverflow', options: {padding: 20}}]}},
        menu:        {
          ...popperVariation,
          role: 'popper',
          trigger: 'mouseenter',
          appendTo:      'parent',
          theme: undefined,
          popperOptions: {modifiers: [{name: 'preventOverflow', options: {padding: 20}}]}
        },
        color_menu:        {
          ...popperVariation,
          role: 'popper',
          theme: 'raw',
          appendTo:      'parent',
          popperOptions: {modifiers: [{name: 'preventOverflow', options: {padding: 20}}]}
        },
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
