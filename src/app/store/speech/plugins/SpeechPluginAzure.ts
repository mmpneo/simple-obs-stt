import {BasePlugin}      from "@store/speech/plugins/BasePlugin";
import {ConnectionState} from "../../../utils/types";
import {
  AudioConfig,
  AutoDetectSourceLanguageConfig,
  CancellationErrorCode, PropertyId,
  SpeechConfig,
  SpeechRecognizer
} from "microsoft-cognitiveservices-speech-sdk";

export class SpeechPluginAzure extends BasePlugin {
  constructor() {
    super();
  }

  private instance!: SpeechRecognizer;

  async Start(language: string, data: string[]) {
    if (!data[0] || !data[1])
      throw new Error("[Azure] Invalid service key or location");
    await navigator.mediaDevices.getUserMedia({video: false, audio: true});
    await super.Start(language, data);
    const audioConfig  = AudioConfig.fromDefaultMicrophoneInput();
    const speechConfig = SpeechConfig.fromSubscription(data[0], data[1]);
    speechConfig.setProperty(PropertyId.SpeechServiceConnection_InitialSilenceTimeoutMs.toString(), "10000");
    speechConfig.setProperty(PropertyId.SpeechServiceConnection_EndSilenceTimeoutMs.toString(), "20000");
    speechConfig.enableDictation();

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
    this.instance.canceled = (r, e) => {
      console.log(`[Azure] ${CancellationErrorCode[e.errorCode]}`);
      if (!CancellationErrorCode.NoError)
        this.onPluginCrashed$.next(`[Azure] ${CancellationErrorCode[e.errorCode]}`);
    };
    this.instance.startContinuousRecognitionAsync(undefined, e => this.onPluginCrashed$.next(e));
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
