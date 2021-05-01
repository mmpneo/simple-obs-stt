import {Injectable}               from '@angular/core';
import {combineQueries, Query}    from '@datorama/akita';
import {SpeechState, SpeechStore} from './speech.store';
import {StyleQuery}               from "@store/style/style.query";
import {map}                      from "rxjs/operators";
import {ConnectionState}          from "../../utils/types";

@Injectable({providedIn: 'root'})
export class SpeechQuery extends Query<SpeechState> {
  constructor(protected store: SpeechStore, private styleQuery: StyleQuery) {
    super(store);
  }

  showBubble$ = combineQueries([
    this.select(),
    this.styleQuery.globalConfig$
  ]).pipe(map(([speechState, config]) =>
    speechState.speechServiceState === ConnectionState.Connected || // if hosting
    !!config.alwaysShow.value || // if should always show
    (speechState.show && speechState.sentences.length > 0))); // if time to show and has anything to show

  sentences$       = this.select("sentences");
  state$           = this.select();
}
