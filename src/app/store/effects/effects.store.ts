import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface EffectsState {
   key: string;
}

export function createInitialState(): EffectsState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'effects' })
export class EffectsStore extends Store<EffectsState> {

  constructor() {
    super(createInitialState());
  }

}
