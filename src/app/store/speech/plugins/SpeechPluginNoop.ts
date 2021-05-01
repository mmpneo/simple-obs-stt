import {BasePlugin}      from "@store/speech/plugins/BasePlugin";
import {ConnectionState} from "../../../utils/types";

export class SpeechPluginNoop extends BasePlugin {
  constructor() {
    super();
  }

  async Start(language: string, data: string[]) {
    this.onStatusChanged$.next(ConnectionState.Connected);
    await super.Start(language, data);
  }

  async Stop() {
    await super.Stop();
  }
}
