import {Injectable}         from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';
import {ConnectionState}    from "../../utils/types";

export interface NetworkState {
  hostID: string;
  saveHost: boolean;
  networkMode: NetworkMode,
  peerConnectionState: ConnectionState;
  crashError: string
}

export enum NetworkMode {
  localhost,
  network
}

export function createInitialState(): NetworkState {
  return {
    hostID:              '',
    saveHost:            false,
    networkMode:         NetworkMode.localhost,
    peerConnectionState: ConnectionState.Disconnected,
    crashError: ''
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'network'})
export class NetworkStore extends Store<NetworkState> {
  constructor() {
    super(createInitialState());
  }

}
