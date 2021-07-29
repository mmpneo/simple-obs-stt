import {APP_INITIALIZER} from '@angular/core';
import {FontsService}    from "@store/fonts/fonts.service";
import {groupBy} from "lodash-es";

export const InitializeApplication = {
  provide:    APP_INITIALIZER,
  useFactory: InitLoading,
  deps:       [FontsService],
  multi:      true
};

export function InitLoading(fontsService: FontsService,): () => Promise<boolean> {
  return async () => {
    try {
      await fontsService.LoadFonts();
      await new Promise((res, rej) => {
        if (window.speechSynthesis)
          window.speechSynthesis.onvoiceschanged = () => {
            const voices = window.speechSynthesis.getVoices();
            const groups = groupBy(voices, e => e.lang)
            const langs = Object.keys(groups);
            const voiceGroups = langs.map(lang => [lang, lang, groups[lang].map(voice => [voice.name, voice.voiceURI])]);
            (<any>window).NativeVoices = voices;
            (<any>window).NativeVoicesGroups = voiceGroups;
            res(null);
          }
        else {
          res(null);

        }
      })
      return true;
    } catch (error) {
      return true;
    }
  };
}
