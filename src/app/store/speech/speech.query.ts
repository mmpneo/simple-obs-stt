import {Injectable}               from '@angular/core';
import {Query}                    from '@datorama/akita';
import {SpeechState, SpeechStore} from './speech.store';

@Injectable({providedIn: 'root'})
export class SpeechQuery extends Query<SpeechState> {
  constructor(protected store: SpeechStore) {
    super(store);
  }

  connectionState$ = this.select("speechServiceState");
  sentences$       = this.select("sentences");
  state$           = this.select();
}
