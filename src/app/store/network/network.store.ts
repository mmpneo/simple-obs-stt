import {Injectable}         from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';
import {ConnectionState}    from "../../utils/types";
import {IsTauri}            from "../../utils/client_type";
export interface NetworkState {
  hostID: string;
  saveHost: boolean;
  networkMode: NetworkMode,
  peerConnectionState: ConnectionState;
}

export enum NetworkMode {
  localhost,
  network
}

export function createInitialState(): NetworkState {
  return {
    hostID:              '',
    saveHost:            false,
    networkMode: IsTauri() ? NetworkMode.localhost : NetworkMode.network,
    peerConnectionState: ConnectionState.Disconnected
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'network'})
export class NetworkStore extends Store<NetworkState> {
  constructor() {
    super(createInitialState());
  }

}
