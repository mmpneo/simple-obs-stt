import {Injectable}                         from '@angular/core';
import {Query}                              from '@datorama/akita';
import {ApplicationState, ApplicationStore} from './application.store';

@Injectable({providedIn: 'root'})
export class ApplicationQuery extends Query<ApplicationState> {
  constructor(protected store: ApplicationStore) {
    super(store);
  }

  theme$ = this.select('theme');
}
