import {APP_INITIALIZER}    from '@angular/core';
import {ApplicationService} from "@store/application/application.service";

export const InitializeApplication = {
  provide:    APP_INITIALIZER,
  useFactory: InitLoading,
  deps:       [ApplicationService,],
  multi:      true
};

export function InitLoading(
  applicationService: ApplicationService,
): () => Promise<boolean> {
  return async () => {
    try {
      await applicationService.LoadFonts();
      return true;
    } catch (error) {
      return true;
    }
  };
}
