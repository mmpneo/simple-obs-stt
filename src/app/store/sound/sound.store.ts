import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface SoundState {
   key: string;
}

export function createInitialState(): SoundState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'sound' })
export class SoundStore extends Store<SoundState> {

  constructor() {
    super(createInitialState());
  }

}
