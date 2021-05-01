import {enableProdMode}         from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule}                         from './app/app.module';
import {environment}                       from './environments/environment';
import {enableAkitaProdMode, persistState} from "@datorama/akita";

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode()
}
if (location.pathname === '/' || location.pathname === '/simple_obs_stt/') { //add persistent for host
  const storage_main = persistState({
    include: ['network', 'speech', 'style'],
    preStorageUpdate(storeName: string, state: any): any {
      if (storeName === 'network')
        return {saveHost: state.saveHost, hostID : state.saveHost ? state.hostID : null}
      if (storeName === 'speech')
        return {selectedPlugin: state.selectedPlugin, selectedPluginData: state.selectedPluginData, selectedLanguage: state.selectedLanguage}
      return state;
    }
  });
  const providers = [{provide: 'persistStorage', useValue: storage_main, multi: true}];
  platformBrowserDynamic(providers).bootstrapModule(AppModule).catch(err => console.error(err));
}
else platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));

