import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { VoiceStore, VoiceState } from './voice.store';

@Injectable({ providedIn: 'root' })
export class VoiceQuery extends Query<VoiceState> {
  constructor(protected store: VoiceStore) {
    super(store);
  }

  state$ = this.select();
}
