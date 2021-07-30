import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule}                               from './app-routing.module';
import {AppComponent}                                   from './app.component';
import {AkitaNgDevtools}                                from '@datorama/akita-ngdevtools';
import {environment}                                    from '../environments/environment';
import {popperVariation, TippyModule, tooltipVariation} from '@ngneat/helipopper';
import {popper_max_size}                                from "./utils/popper_max_size";
import maxSize                                          from "popper-max-size-modifier";
import {HotToastModule}                                 from '@ngneat/hot-toast';
import {ServiceWorkerModule}                            from '@angular/service-worker';
import {InitializeApplication}                          from "./app.init";
import {BrowserAnimationsModule}                        from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports:      [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    environment.platform !== "web" ? [] : ServiceWorkerModule.register('ngsw-worker.js', {
      enabled:              environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    TippyModule.forRoot({
      defaultVariation: 'tooltip',
      variations:       {
        tooltip:    {...tooltipVariation, arrow: true, offset: [0, 10]},
        popper:     {
          ...popperVariation,
          theme:         undefined,
          offset:        [0, 15],
          role:          'popper',
          maxWidth: '25rem',
          arrow:         true,
          popperOptions: {modifiers: [{name: 'preventOverflow', options: {padding: 20}}, maxSize, popper_max_size]}
        },
        menu:       {
          ...popperVariation,
          role:          'popper',
          trigger:       'mouseenter',
          appendTo:      'parent',
          theme:         undefined,
          popperOptions: {
            modifiers: [maxSize, popper_max_size, {name: 'preventOverflow', options: {padding: 20}}]
          }
        },
        color_menu: {
          ...popperVariation,
          role:     'popper',
          theme:    'raw',
          // appendTo: 'parent',

          popperOptions: {modifiers: [{name: 'preventOverflow', options: {padding: 20}}]}
        },
      }
    }),
    HotToastModule.forRoot()
  ],
  providers:    [InitializeApplication],
  bootstrap:    [AppComponent]
})
export class AppModule {
}
