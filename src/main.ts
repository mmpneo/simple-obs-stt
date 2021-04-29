import {enableProdMode}         from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule}                         from './app/app.module';
import {environment}                       from './environments/environment';
import {enableAkitaProdMode, persistState} from "@datorama/akita";

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode()
}

const storage_main = persistState({
  include: ['network', 'network', 'speech.selectedLanguage', 'style'],
  preStorageUpdate(storeName: string, state: any): any {
    if (storeName === 'network')
      return {saveHost: state.saveHost, hostID : state.saveHost ? state.hostID : null}
    return state;
  }
});

const providers = [
  {provide: 'persistStorage', useValue: storage_main, multi: true},
];

platformBrowserDynamic(providers).bootstrapModule(AppModule)
                                 .catch(err => console.error(err));
