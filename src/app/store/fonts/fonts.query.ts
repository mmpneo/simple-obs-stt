import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { FontsStore, FontsState } from './fonts.store';

@Injectable({ providedIn: 'root' })
export class FontsQuery extends Query<FontsState> {

  constructor(protected store: FontsStore) {
    super(store);
  }

}
