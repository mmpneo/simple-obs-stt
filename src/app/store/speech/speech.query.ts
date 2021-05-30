import {Injectable}               from '@angular/core';
import {combineQueries, Query}    from '@datorama/akita';
import {SpeechState, SpeechStore} from './speech.store';
import {StyleQuery}                        from "@store/style/style.query";
import {distinctUntilChanged, filter, map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class SpeechQuery extends Query<SpeechState> {
  constructor(protected store: SpeechStore, private styleQuery: StyleQuery) {
    super(store);
  }

  showBubble$ = combineQueries([
    this.select(),
    this.styleQuery.globalConfig$
  ]).pipe(map(([speechState, config]) =>
    !config.hideOnInactivity?.value[0] || // if should always show
    (speechState.show && speechState.sentences.length > 0)),
    distinctUntilChanged()
  ); // if time to show and has anything to show

  onSentenceUpdate$ = this.select("sentences").pipe(filter(v => v.length !== 0));

  sentences$ = this.select("sentences");
  state$     = this.select();
  connectionState$     = this.select("speechServiceState");
}
