import {Injectable}         from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';

export interface SoundState {
  isVoicePlaying: boolean
}

export function createInitialState(): SoundState {
  return {
    isVoicePlaying: false
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'sound'})
export class SoundStore extends Store<SoundState> {

  constructor() {
    super(createInitialState());
  }

}
