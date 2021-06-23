import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SoundStore, SoundState } from './sound.store';

@Injectable({ providedIn: 'root' })
export class SoundQuery extends Query<SoundState> {
  constructor(protected store: SoundStore) {
    super(store);
  }

  isVoicePlaying$ = this.select("isVoicePlaying");
  mute$ = this.select("mute");

}
