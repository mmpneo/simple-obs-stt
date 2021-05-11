import {BasePlugin}      from "@store/speech/plugins/BasePlugin";
import {ConnectionState} from "../../../utils/types";

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
      await new Promise((res, rej) => {
        if (!this.instance) return rej("Something wrong");
        this.instance.onerror = rej;
        this.instance.onstart = res;
        this.instance.start();
      });
      this.instance.onstart = null;
      this.instance.onerror = null;
      this.onStatusChanged$.next(ConnectionState.Connected);
      this.instance.addEventListener("start", () => this.onStatusChanged$.next(ConnectionState.Connected));
      this.instance.addEventListener("error", (error) => {
        if (error.error === "no-speech") {
          console.log("no speech")
        }
          // else if (error.error === "network")
        //   this.Stop();
        else this.Stop();
        console.error(error)
      })

      window.addEventListener("beforeunload", () => { // temp fix for browser freezing on page reload
        if (this.onStatusChanged$.value === ConnectionState.Connected)
          this.instance?.stop();
      });

      this.instance.addEventListener("end", _event => {
        this.onStatusChanged$.next(ConnectionState.Connecting);
        if (this.onStatusChanged$.value === ConnectionState.Connected) {
          console.log("[Native] Try reconnect");
          this.instance?.start();
        }
      }) // auto restart after silence
      this.BindSpeech();
    } catch (error) {
      this.onStatusChanged$.next(ConnectionState.Disconnected);
      throw new Error(error);
    }
  }

  async Stop() {
    await super.Stop();
    this.instance?.stop();
  }
}
