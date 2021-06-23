import {Injectable}         from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';
import produce              from "immer";

export interface SoundState {
  isVoicePlaying: boolean,
  mute: boolean
}

export function createInitialState(): SoundState {
  return {
    isVoicePlaying: false,
    mute: false
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'sound', producerFn: produce})
export class SoundStore extends Store<SoundState> {

  constructor() {
    super(createInitialState());
  }

}
