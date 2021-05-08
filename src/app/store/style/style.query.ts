import { Injectable }             from '@angular/core';
import { Query }                  from '@datorama/akita';
import { StyleStore, StyleState } from './style.store';
import {map}                      from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class StyleQuery extends Query<StyleState> {
  constructor(protected store: StyleStore) {
    super(store);
  }

  state$ = this.select();

  currentTemplate$ = this.select("currentTemplate");
  templates$ = this.select("templates");

  current$ = this.select("currentStyle");
  globalConfig$ = this.select("currentStyle").pipe(map(c => c.globalStyle))

}
