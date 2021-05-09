import {APP_INITIALIZER} from '@angular/core';
import {FontsService}    from "@store/fonts/fonts.service";

export const InitializeApplication = {
  provide:    APP_INITIALIZER,
  useFactory: InitLoading,
  deps:       [FontsService],
  multi:      true
};

export function InitLoading(
  fontsService: FontsService,
): () => Promise<boolean> {
  return async () => {
    try {
      await fontsService.LoadFonts();
      return true;
    } catch (error) {
      return true;
    }
  };
}
