import {BaseVoicePlugin}                              from "@store/voice/plugins/BaseVoicePlugin";
import {
  AudioConfig, SpeakerAudioDestination,
  SpeechConfig,
  SpeechSynthesizer
} from "microsoft-cognitiveservices-speech-sdk";
import {ConnectionState}                              from "../../../utils/types";

export class VoicePluginNative extends BaseVoicePlugin {
  constructor() {
    super();
  }

  private instance!: SpeechSynthesizer;

  RequestPlay(text: string) {
    this.instance.speakTextAsync(text, e => {
      this.onFinal$.next(e.audioData);
    }, e => {console.log(e)});
  }

  async Start(language: string, voice: string, data: string[]): Promise<void> {
    if (!data[0] || !data[1])
      throw new Error("[Azure] Invalid voice configuration");
    try {
      super.Start(language, voice, data);
      // const player = new SpeakerAudioDestination();
      // const audioConfig                     = AudioConfig.fromSpeakerOutput(player);
      this.onStatusChanged$.next(ConnectionState.Connecting);
      const speechConfig                    = SpeechConfig.fromSubscription(data[0], data[1]);
      speechConfig.speechSynthesisLanguage  = language;
      speechConfig.speechSynthesisVoiceName = voice;
      this.instance                         = new SpeechSynthesizer(speechConfig, null as any);
      this.onStatusChanged$.next(ConnectionState.Connected);
    } catch (error) {
      this.onPluginCrashed$.next(error.message || error);
    }
  }

  async Stop(): Promise<void> {
    this.instance?.close()
    super.Stop();

  }
}
