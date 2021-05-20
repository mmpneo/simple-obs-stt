import {Injectable}         from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';
import produce              from "immer";

export interface EmotesState {
  user: {
          name: string,
          avatar: string
        } | null;
  emotes: { [alphabet: string]: { [emoteName: string]: string } };
  keyword: string
  keyword_secondary: string
  bindings: [string, string][]
  bindings_cache: { [first_word: string]: { [second_word: string]: string } }
}

export interface EmoteBinding {
  emote: string,

}

export function createInitialState(): EmotesState {
  return {
    user:              null,
    keyword:           'em',
    keyword_secondary: 'emote',
    emotes:            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!:'
                         .split('')
                         .reduce((obj, letter) => ({...obj, [letter]: {}}), {}),
    bindings:          [],
    bindings_cache:    {},
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'emotes', producerFn: produce, resettable: true})
export class EmotesStore extends Store<EmotesState> {
  constructor() {
    super(createInitialState());
  }

}
