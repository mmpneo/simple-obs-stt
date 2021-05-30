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
      return this.onPluginCrashed$.next("[Native] Native STT is not supported");
    this.instance = new ((<any>window).webkitSpeechRecognition);
    if (!this.instance)
      return this.onPluginCrashed$.next("[Native] Cannot spawn native instance");
    this.instance.lang           = language;
    this.instance.continuous     = true;
    this.instance.interimResults = true;

    this.instance.addEventListener("error", (error) => { // listener for active connection
      if (this.onStatusChanged$.value !== ConnectionState.Connected) return;
      if (error.error === "no-speech") console.log("no speech")
      else if (error.error !== "bad-grammar")
        this.onPluginCrashed$.next("[Native] Lost connection");
    })
    this.instance.addEventListener("end", event => {
      if (this.onStatusChanged$.value !== ConnectionState.Connected) return;
      console.log(`[Native] Stopped`)
      if (event.type === 'end') {
        (<SpeechRecognition>event.target)?.stop()
        setTimeout(() => (<SpeechRecognition>event.target)?.start(), 100);
      }
      else
        this.onPluginCrashed$.next("end");
    }) // auto restart after silence

    this.instance.start();

    this.onStatusChanged$.next(ConnectionState.Connected);
    console.log("[Native] Started");

    window.addEventListener("beforeunload", () => { // temp fix for browser freezing on page reload
      if (this.onStatusChanged$.value === ConnectionState.Connected)
        this.instance?.stop();
    });
    this.BindSpeech();
  }

  async Stop() {
    await super.Stop();
    console.log("[Native] Stopped");
    this.instance?.stop();
  }
}
