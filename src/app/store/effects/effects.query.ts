import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { EffectsStore, EffectsState } from './effects.store';

@Injectable({ providedIn: 'root' })
export class EffectsQuery extends Query<EffectsState> {

  constructor(protected store: EffectsStore) {
    super(store);
  }

}
