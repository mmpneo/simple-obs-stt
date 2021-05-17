import {Injectable}         from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';
import produce              from "immer";

export interface EmotesState {
  user: {
    name: string,
    avatar: string
  } | null;
  emotes: { [alphabet: string]: { [emoteName: string]: string } };
}

export function createInitialState(): EmotesState {
  return {
    user: null,
    emotes: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!:'
              .split('')
              .reduce((obj, letter) => ({...obj, [letter]: {}}), {})
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'emotes', producerFn: produce, resettable: true})
export class EmotesStore extends Store<EmotesState> {
  constructor() {
    super(createInitialState());
  }

}
