import {enableProdMode}         from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule}                         from './app/app.module';
import {environment}                       from './environments/environment';
import {enableAkitaProdMode, persistState} from "@datorama/akita";
import {ClientType, GetClientType}         from "./app/utils/client_type";
import {ClearSWCache}                      from "./app/utils/clear_sw_cache";

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode()
}
if (GetClientType() === ClientType.host) { //add persistent for host
  const storage_main = persistState({
    include: ['application', 'network', 'speech', 'style', 'emotes'],
    preStorageUpdate(storeName: string, state: any): any {
      if (storeName === 'emotes')
        return {bindings: state.bindings, keyword: state.keyword}
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
else { // there should be no SW cache on client
  ClearSWCache().then(_ => platformBrowserDynamic().bootstrapModule(AppModule, {ngZoneEventCoalescing: true}).catch(err => console.error(err)));
}

