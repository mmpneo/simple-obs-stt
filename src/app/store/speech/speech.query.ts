import {Injectable}                               from '@angular/core';
import {combineQueries, Query, QueryEntity}       from '@datorama/akita';
import {SpeechSentence, SpeechState, SpeechStore} from './speech.store';
import {StyleQuery}                               from "@store/style/style.query";
import {distinctUntilChanged, map}                from "rxjs/operators";
import {SoundQuery}                               from "@store/sound/sound.query";
import {Subject}                                  from "rxjs";

@Injectable({providedIn: 'root'})
export class SpeechQuery extends QueryEntity<SpeechState> {
  constructor(protected store: SpeechStore, private styleQuery: StyleQuery, private soundQuery: SoundQuery) {
    super(store);
  }

  list$ = this.selectAll();

  state$ = this.select();

  showBubble$ = combineQueries([
    this.select(),
    this.selectCount(),
    this.styleQuery.globalConfig$,
    this.soundQuery.isVoicePlaying$
  ]).pipe(map(([speechState, count, styleConfig, isVoicePlaying]) =>
    !styleConfig.hideOnInactivity?.value[0] || // if should always show
    (isVoicePlaying || (speechState.show && count > 0))),
    distinctUntilChanged()
  ); // if time to show and has anything to show

  onTypingEvent$ = new Subject();

  onNewLastSentence$ = this.selectAll().pipe(
    map(sentences => {
      const list = sentences.filter(s => s.finalized);
      return list[list.length - 1] ?? null;
    }),
    distinctUntilChanged((a, b) => a?.id === b?.id)
  )
}
