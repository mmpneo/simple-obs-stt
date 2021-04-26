import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface ApplicationState {
   key: string;
}

export function createInitialState(): ApplicationState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'application' })
export class ApplicationStore extends Store<ApplicationState> {

  constructor() {
    super(createInitialState());
  }

}
