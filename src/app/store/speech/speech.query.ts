import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SpeechStore, SpeechState } from './speech.store';

@Injectable({ providedIn: 'root' })
export class SpeechQuery extends Query<SpeechState> {
  constructor(protected store: SpeechStore) {
    super(store);
  }

  value$ = this.select("speechValue");
  state$ = this.select();
}
