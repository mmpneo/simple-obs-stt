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

  private instance!: SpeechRecognizer;

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

      this.instance.sessionStopped = (s, e) => {
        console.log("[Azure] Session stopped", e)
      }
      this.instance.sessionStarted = (s, e) => {
        console.log("[Azure] Session started")
        this.onStatusChanged$.next(ConnectionState.Connected);
      }

      await new Promise((res, rej) => {
        this.instance.canceled = (r, e) => rej(`[Azure] ${CancellationErrorCode[e.errorCode]}`);
        this.instance.startContinuousRecognitionAsync(() => res(null), rej);
      });
      this.instance.canceled = (r, e) => {
        console.log(`[Azure] ${CancellationErrorCode[e.errorCode]}`);
        this.onStatusChanged$.next(ConnectionState.Disconnected);
        if (CancellationErrorCode.ConnectionFailure || CancellationErrorCode.ServiceTimeout)
          this.onPluginCrashed$.next();
      };
    } catch (error) {
      this.onStatusChanged$.next(ConnectionState.Disconnected);
      throw new Error(error);
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
