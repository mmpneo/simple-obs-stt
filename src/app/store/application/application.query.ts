import {Injectable}                         from '@angular/core';
import {combineQueries, Query}              from '@datorama/akita';
import {ApplicationState, ApplicationStore} from './application.store';
import {NetworkQuery}                       from "@store/network/network.query";
import {SpeechQuery}                        from "@store/speech/speech.query";
import {map}                                from "rxjs/operators";
import {ConnectionState}                    from "../../utils/types";

@Injectable({providedIn: 'root'})
export class ApplicationQuery extends Query<ApplicationState> {
  constructor(protected store: ApplicationStore, private networkQuery: NetworkQuery, private speechQuery: SpeechQuery) {
    super(store);
  }

  fonts$ = this.select('fonts');

  connectionState$ = combineQueries([this.networkQuery.state$, this.speechQuery.state$]).pipe(
    map(([networkQuery, speechQuery]) => {
      if (networkQuery.peerConnectionState === ConnectionState.Connected && speechQuery.speechServiceState === ConnectionState.Connected)
        return ConnectionState.Connected;
      if (networkQuery.peerConnectionState === ConnectionState.Disconnected && speechQuery.speechServiceState === ConnectionState.Disconnected)
        return ConnectionState.Disconnected
      return ConnectionState.Connecting;
    })
  )
}
