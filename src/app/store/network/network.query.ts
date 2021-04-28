import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { NetworkStore, NetworkState } from './network.store';

@Injectable({ providedIn: 'root' })
export class NetworkQuery extends Query<NetworkState> {
  constructor(protected store: NetworkStore) {
    super(store);
  }

  connectionState$ = this.select("peerConnectionState")
  state$ = this.select();

}
