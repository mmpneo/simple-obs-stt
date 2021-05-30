import {BasePlugin}      from "@store/speech/plugins/BasePlugin";
import {ConnectionState} from "../../../utils/types";

export class SpeechPluginNoop extends BasePlugin {
  constructor() {
    super();
  }

  async Start(language: string, data: string[]) {
    super.Start(language, data);
    this.onStatusChanged$.next(ConnectionState.Connected);
  }

  async Stop() {
    await super.Stop();
  }
}
