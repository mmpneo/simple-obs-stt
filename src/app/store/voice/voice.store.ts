import { Injectable }         from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import {ConnectionState}      from "../../utils/types";
import {SpeechSentence}       from "@store/speech/speech.store";

export interface VoiceState {
  selectedPlugin: [string, any],
  selectedPluginData: string[],
  selectedLanguage: [number, number],
  connectionState: ConnectionState,
  sentences: SpeechSentence[],
  textInput: string;
  show: boolean
}

export function createInitialState(): VoiceState {
  return {
    selectedPlugin:     ["native", null],
    selectedPluginData: [],
    selectedLanguage:   [0, 0],
    connectionState:    ConnectionState.Disconnected,
    sentences:          [],
    textInput:          "",
    show:               false
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'voice' })
export class VoiceStore extends Store<VoiceState> {

  constructor() {
    super(createInitialState());
  }

}
