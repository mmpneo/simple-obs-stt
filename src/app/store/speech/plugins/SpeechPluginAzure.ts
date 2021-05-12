import {BasePlugin}      from "@store/speech/plugins/BasePlugin";
import {ConnectionState} from "../../../utils/types";
import {
  AudioConfig,
  AutoDetectSourceLanguageConfig,
  CancellationErrorCode,
  SpeechConfig,
  SpeechRecognizer
}                        from "microsoft-cognitiveservices-speech-sdk";

export class SpeechPluginAzure extends BasePlugin {
  constructor() {
    super();
  }

  private instance: SpeechRecognizer = (<any>window).webkitSpeechRecognition ? new ((<any>window).webkitSpeechRecognition) : null;

  async Start(language: string, data: string[]) {
    try {
      await navigator.mediaDevices.getUserMedia({video: false, audio: true});
      await super.Start(language, data);
      const audioConfig  = AudioConfig.fromDefaultMicrophoneInput();
      const speechConfig = SpeechConfig.fromSubscription(data[0], data[1]);
      const langConfig   = AutoDetectSourceLanguageConfig.fromLanguages([language]);
      SpeechRecognizer.FromConfig(speechConfig, langConfig, audioConfig)
      this.instance             = new SpeechRecognizer(speechConfig, audioConfig);
      this.instance.recognizing = (s, e) => this.onInter$.next(e.result.text);
      this.instance.recognized  = (s, e) => this.onFinal$.next(e.result.text);

      this.onStatusChanged$.next(ConnectionState.Connecting);
      await new Promise((res, rej) => {
        this.instance.canceled = (r, e) => rej(`[Azure] ${CancellationErrorCode[e.errorCode]}`);
        this.instance.startContinuousRecognitionAsync(() => res(null), rej);
      });
      console.log("[Azure] Started")
      this.onStatusChanged$.next(ConnectionState.Connected);
    } catch (error) {
      this.onStatusChanged$.next(ConnectionState.Disconnected);
      throw new Error(error.message);
    }
  }

  async Stop() {
    await super.Stop();
    await new Promise((res, rej) => {
      this.instance?.stopContinuousRecognitionAsync(
        () => this.instance?.close(() => {
          console.log("[Azure] Stopped");
          res(null);
        }, e => rej(e)),
        e => rej(e)
      );
    });
  }
}
