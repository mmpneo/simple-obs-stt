import {APP_INITIALIZER}                  from '@angular/core';
import {FontsService}                     from "@store/fonts/fonts.service";
import {groupBy}                          from "lodash-es";
import {ClientType, GetClientType, IsOBS} from "./utils/client_type";
import UAParser                           from "ua-parser-js";

export const InitializeApplication = {
  provide:    APP_INITIALIZER,
  useFactory: InitLoading,
  deps:       [FontsService],
  multi:      true
};

function BuildNativeVoices() {
  const voices                     = window.speechSynthesis.getVoices();
  const groups                     = groupBy(voices, e => e.lang)
  const langs                      = Object.keys(groups);
  const voiceGroups                = langs.map(lang => [lang, lang, groups[lang].map(voice => [voice.name, voice.voiceURI])]);
  (<any>window).NativeVoices       = voices;
  (<any>window).NativeVoicesGroups = voiceGroups;
}

export function InitLoading(fontsService: FontsService,): () => Promise<boolean> {
  return async () => {
    try {
      await fontsService.LoadFonts();
      const ua = new UAParser();

      // ensure this is not obs, has speech api and not client
      if (IsOBS() || GetClientType() === ClientType.client || window.speechSynthesis.onvoiceschanged === undefined)
        return true;
      if (ua.getBrowser().name === 'Firefox') {
        if (!window.speechSynthesis.getVoices().length)
          await new Promise(r => speechSynthesis.addEventListener("voiceschanged", r, { once: true }));
        BuildNativeVoices();
        return true;
      }
      else
        await new Promise((res, rej) => {
          window.speechSynthesis.onvoiceschanged = () => {
            BuildNativeVoices();
            res(null);
          };
        })
      return true;
    } catch (error) {
      return true;
    }
  };
}
