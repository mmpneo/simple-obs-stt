import {Injectable}                        from '@angular/core';
import {combineQueries, Query}             from '@datorama/akita';
import {SpeechState, SpeechStore}          from './speech.store';
import {StyleQuery}                        from "@store/style/style.query";
import {distinctUntilChanged, filter, map} from "rxjs/operators";
import {SoundQuery}                        from "@store/sound/sound.query";

@Injectable({providedIn: 'root'})
export class SpeechQuery extends Query<SpeechState> {
  constructor(protected store: SpeechStore, private styleQuery: StyleQuery, private soundQuery: SoundQuery) {
    super(store);
  }

  showBubble$ = combineQueries([
    this.select(),
    this.styleQuery.globalConfig$,
    this.soundQuery.isVoicePlaying$
  ]).pipe(map(([speechState, config, isVoicePlaying]) =>
    !config.hideOnInactivity?.value[0] || // if should always show
    (isVoicePlaying || (speechState.show && speechState.sentences.length > 0))),
    distinctUntilChanged()
  ); // if time to show and has anything to show

  onSentenceUpdate$ = this.select("sentences").pipe(filter(v => v.length !== 0));

  sentences$ = this.select("sentences");
  state$     = this.select();

  onNewLastSentence$ = this.select("sentences").pipe(
    map(sentences => {
      const list = sentences.filter(s => s.finalized);
      return list[list.length - 1] ?? null;
    }),
    distinctUntilChanged((a, b) => a?.id === b?.id)
  )
}
