import {Injectable}             from '@angular/core';
import {languages, SpeechStore} from './speech.store';
import {SpeechQuery}            from "@store/speech/speech.query";
import {NetworkService}  from "@store/network/network.service";
import {ConnectionState} from "../../utils/types";

@Injectable({providedIn: 'root'})
export class SpeechService {
  constructor(
    private speechStore: SpeechStore,
    private speechQuery: SpeechQuery,
    private networkService: NetworkService) {
    networkService.messages$.subscribe(m => m.type === 'stt' && this.ShowUpdatedSpeech(m.data)); // listen for network messages
    this.BindSpeechParse();
  }

  private recognitionInstance: SpeechRecognition = new ((<any>window).webkitSpeechRecognition);
  private UpdateNetworkStatus                    = (speechServiceState: ConnectionState) => this.speechStore.update({speechServiceState})

  public SelectLanguage = (index: string) => this.speechStore.update(e => ({selectedLanguage: [parseInt(index), 0]}));
  public SelectDialect  = (index: string) => this.speechStore.update(e => ({selectedLanguage: [e.selectedLanguage[0], parseInt(index)]}));

  public Stop() {
    this.UpdateNetworkStatus(ConnectionState.Disconnected);
    this.recognitionInstance?.stop();
  }

  private UpdateSttValue(data: string) {
    this.ShowUpdatedSpeech(data);
    this.networkService.SendMessage({type: 'stt', data});
  }

  private tm: any;
  private ShowUpdatedSpeech(data: string) {
    this.speechStore.update({speechValue: data});
    this.tm && clearTimeout(this.tm);
    this.tm = setTimeout(() => this.speechStore.update({speechValue: ""}), 3000);
  }

  private BindSpeechParse() {
    this.recognitionInstance.onresult = (event) => {
      var interim_transcript = '';
      var final_transcript   = '';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
          this.UpdateSttValue(final_transcript);

        }
        else {
          interim_transcript += event.results[i][0].transcript;
          this.UpdateSttValue(interim_transcript);
        }
      }
    };
  }

  async InitHostSpeech() {
    const selected        = this.speechQuery.getValue().selectedLanguage;
    const langs           = languages;
    const selectedDialect = langs[selected[0]][selected[1] + 1][0];

    this.UpdateNetworkStatus(ConnectionState.Connecting);
    this.recognitionInstance.lang           = selectedDialect;
    this.recognitionInstance.continuous     = true;
    this.recognitionInstance.interimResults = true;

    try {
      await new Promise((res, rej) => {
        this.recognitionInstance.onerror = rej;
        this.recognitionInstance.onstart = res;
        this.recognitionInstance.start();
      });
      this.recognitionInstance.onstart = null;
      this.UpdateNetworkStatus(ConnectionState.Connected);
      this.recognitionInstance.onerror = (error) => {
        if (error.error === "no-speech") {}
        else {
          this.Stop();
          console.error(error)
        }
      };
    } catch (error) {
      //todo handle startup error
    }
    try {
    } catch (error) {
      this.Stop();
    }

    this.recognitionInstance.onend   = _event => {
      if (this.speechQuery.getValue().speechServiceState === ConnectionState.Connected) {
        console.log("Reconnect");
        this.recognitionInstance.start();
      }
    } // auto restart after silence

  }
}
