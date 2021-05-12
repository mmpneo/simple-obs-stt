import {BasePlugin}            from "@store/speech/plugins/BasePlugin";
import {ConnectionState}       from "../../../utils/types";
import {CancellationErrorCode} from "microsoft-cognitiveservices-speech-sdk";

export class SpeechPluginNative extends BasePlugin {
  constructor() {super();}

  private instance?: SpeechRecognition;

  private BindSpeech() {
    if (!this.instance)
      return;
    this.instance.onresult = (event) => {
      let interim_transcript = '';
      let final_transcript   = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
          this.onFinal$.next(final_transcript)
        }
        else {
          interim_transcript += event.results[i][0].transcript;
          this.onInter$.next(interim_transcript);
        }
      }
    };
  }

  async Start(language: string, data: string[]) {
    await navigator.mediaDevices.getUserMedia({video: false, audio: true});
    await super.Start(language, data);
    if (!(<any>window).webkitSpeechRecognition)
      throw new Error("[Native] Native STT is not supported");
    this.instance = new ((<any>window).webkitSpeechRecognition);
    if (!this.instance)
      throw new Error("[Native] Cannot spawn native instance");
    this.instance.lang           = language;
    this.instance.continuous     = true;
    this.instance.interimResults = true;

    try {
      this.instance.addEventListener("error", (error) => { // listener for active connection
        if (this.onStatusChanged$.value !== ConnectionState.Connected) return;
        if (error.error === "no-speech") console.log("no speech")
        else if (error.error === "network")
          this.onPluginCrashed$.next();
        console.error(error)
      })
      this.instance.addEventListener("end", event => {
        if (this.onStatusChanged$.value !== ConnectionState.Connected) return;
        console.log(`[Native] Stopped`, event)
        this.onPluginCrashed$.next();
      }) // auto restart after silence

      //region initialization
      const errorTimeoutPromise = new Promise<false>((res) => setTimeout(() => res(false), 500));
      const listenErrorPromise = new Promise<string>((res, rej) => {
        if (!this.instance) return rej("[Native] Cannot spawn native instance");
        this.instance.onerror = (e) => {
          if (this.instance) this.instance.onerror = null;
          res(e.error);
        };
      });
      this.instance.start();

      const hasError: false | string = await Promise.race([errorTimeoutPromise, listenErrorPromise]); // wait for initial error

      if (hasError !== false) {
        this.instance.abort();
        throw new Error(hasError);
      }

      //endregion
      this.onStatusChanged$.next(ConnectionState.Connected);
      console.log("[Native] Started");

      window.addEventListener("beforeunload", () => { // temp fix for browser freezing on page reload
        if (this.onStatusChanged$.value === ConnectionState.Connected)
          this.instance?.stop();
      });
      this.BindSpeech();
    } catch (error) {
      this.onStatusChanged$.next(ConnectionState.Disconnected);
      throw new Error(error);
    }
  }

  async Stop() {
    await super.Stop();
    console.log("[Native] Stopped");
    this.instance?.stop();
  }
}
