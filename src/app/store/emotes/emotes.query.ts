import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { EmotesStore, EmotesState } from './emotes.store';

@Injectable({ providedIn: 'root' })
export class EmotesQuery extends Query<EmotesState> {

  constructor(protected store: EmotesStore) {
    super(store);
  }

  user$ = this.select('user');
  bindings$ = this.select('bindings');

  state$ = this.select();

}
