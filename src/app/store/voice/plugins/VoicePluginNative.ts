import {BaseVoicePlugin} from "@store/voice/plugins/BaseVoicePlugin";
import {ConnectionState} from "../../../utils/types";


export class VoicePluginNative extends BaseVoicePlugin {
  constructor() {
    super();
  }
  private instance?: SpeechSynthesisUtterance;

  async Start(language: string, voice: string, data: string[]): Promise<void> {
    super.Start(language, voice, data);
    const voices: SpeechSynthesisVoice[] = (<any>window).NativeVoices;
    this.instance = new SpeechSynthesisUtterance();
    const findVoice = voices.find(v => voice === v.voiceURI);
    if (!findVoice) {
      this.onPluginCrashed$.next("[Native] cannot initialize voice");
      return;
    }
    this.instance.onstart = () => console.log("start");
    this.instance.lang = language;
    this.instance.volume = 1;
    this.instance.voice = findVoice;
    this.onStatusChanged$.next(ConnectionState.Connected);
  }

  RequestPlay(text: string, volume: number | string) {
    if (!this.instance)
      return;
    this.instance.text = text;
    this.instance.volume = typeof volume === "string" ? parseFloat(volume) : volume;
    window.speechSynthesis.speak(this.instance);
  }

  async Stop(): Promise<void> {
    super.Stop();
  }
}
