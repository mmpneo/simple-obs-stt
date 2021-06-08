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
    try {
      super.Start(language, voice, data);
      const player = new SpeakerAudioDestination();
      this.onStatusChanged$.next(ConnectionState.Connecting);
      const speechConfig                    = SpeechConfig.fromSubscription('096b84e66cf548eb9fa4d76f830b9854', 'westeurope');
      // const audioConfig                     = AudioConfig.fromSpeakerOutput(player);
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
