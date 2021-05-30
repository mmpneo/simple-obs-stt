import {Injectable}       from '@angular/core';
import {ApplicationStore} from './application.store';

@Injectable({providedIn: 'root'})
export class ApplicationService {
  constructor(
    private applicationStore: ApplicationStore
  ) {
    this.ChangeTheme(applicationStore.getValue().theme)
  }

  ChangeTheme(theme: string) {
    document.body.setAttribute('data-theme', theme);
    this.applicationStore.update({theme})
  }
}
