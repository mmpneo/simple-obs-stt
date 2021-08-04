import {BasePlugin}      from "@store/speech/plugins/BasePlugin";
import {ConnectionState} from "../../../utils/types";

export class SpeechPluginNative extends BasePlugin {
  constructor() {super();}

  private instance?: SpeechRecognition;
  private refreshInterval: any;
  private lastResultDate!: number;

  private BindSpeech() {
    if (!this.instance)
      return;
    this.instance.onresult = (event) => {
      let interim_transcript = '';
      let final_transcript   = '';
      this.lastResultDate = Date.now();
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

  private stopInProgress = false;
  private BindSilence() { // restart every x seconds if no speech detected
    this.lastResultDate = Date.now();
    this.refreshInterval = setInterval(() => {
      if (this.onStatusChanged$.value !== ConnectionState.Connected)
        return;

      const currentDate = Date.now();
      const sinceLastUpdate = currentDate - (this.lastResultDate || currentDate);

      if (this.stopInProgress || sinceLastUpdate < 6400)
        return;
      this.instance?.stop();
      this.stopInProgress = true;
      setTimeout(() => {
        try {
          this.instance?.start();
          this.lastResultDate = Date.now();
        } catch (e) {/** still running **/} finally {
          this.stopInProgress = false;
        }
      }, 700);
    }, 500)
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

    this.instance.addEventListener("start", () => {
      this.lastResultDate = Date.now();
    });

    this.instance.addEventListener("error", (error) => { // listener for active connection
      if (this.onStatusChanged$.value !== ConnectionState.Connected) return;
      console.log(`[Native] Error: ${error.error}`)
      // if (error.error === "no-speech")
      // else if (error.error !== "bad-grammar")
      //   this.onPluginCrashed$.next(`[Native] Error: ${error.error}`);
    })
    this.instance.addEventListener("end", event => {
      if (this.onStatusChanged$.value !== ConnectionState.Connected)
        clearInterval(this.refreshInterval);
    }) // auto restart after silence

    this.instance.start();

    this.onStatusChanged$.next(ConnectionState.Connected);
    this.BindSilence();
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
