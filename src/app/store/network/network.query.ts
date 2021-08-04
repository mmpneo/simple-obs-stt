import { Injectable }                 from '@angular/core';
import { Query }                      from '@datorama/akita';
import { NetworkStore, NetworkState } from './network.store';
import {distinctUntilChanged}         from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class NetworkQuery extends Query<NetworkState> {
  constructor(protected store: NetworkStore) {
    super(store);
  }

  connectionState$ = this.select("peerConnectionState").pipe(distinctUntilChanged())
  state$ = this.select();

}
