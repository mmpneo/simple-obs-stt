import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { StyleStore, StyleState } from './style.store';

@Injectable({ providedIn: 'root' })
export class StyleQuery extends Query<StyleState> {
  constructor(protected store: StyleStore) {
    super(store);
  }

  current$ = this.select("currentStyle");

}
