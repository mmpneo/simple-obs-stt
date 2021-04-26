import { Injectable }         from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import {ConnectionState}      from "../../utils/types";

export interface NetworkState {
   hostID: string;
   peerConnectionState: ConnectionState;
}

export function createInitialState(): NetworkState {
  return {
    hostID: '',
    peerConnectionState: ConnectionState.Disconnected
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'network' })
export class NetworkStore extends Store<NetworkState> {
  constructor() {
    super(createInitialState());
  }

}
