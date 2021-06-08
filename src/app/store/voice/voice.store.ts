import {Injectable}         from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';
import {ConnectionState}    from "../../utils/types";
import produce              from "immer";

export interface VoiceState {
  // plugin index, language index, voice index
  selectedPlugin: [number, number, number],
  selectedPluginData: string[],
  connectionState: ConnectionState,
  mute: boolean
}

export function createInitialState(): VoiceState {
  return {
    selectedPlugin:     [0, 0, 0],
    selectedPluginData: [],
    connectionState:    ConnectionState.Disconnected,
    mute:               true,
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'voice', producerFn: produce})
export class VoiceStore extends Store<VoiceState> {

  constructor() {
    super(createInitialState());
  }

}
