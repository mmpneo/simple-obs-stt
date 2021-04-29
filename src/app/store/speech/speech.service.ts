import {Injectable}                             from '@angular/core';
import {languages, SpeechSentence, SpeechStore} from './speech.store';
import {SpeechQuery}                            from "@store/speech/speech.query";
import {NetworkService}         from "@store/network/network.service";
import {ConnectionState}                                           from "../../utils/types";
import {arrayAdd, arrayUpdate, arrayUpsert, guid, ID, transaction} from "@datorama/akita";

@Injectable({providedIn: 'root'})
export class SpeechService {
  constructor(
    private speechStore: SpeechStore,
    private speechQuery: SpeechQuery,
    private networkService: NetworkService) {
    networkService.messages$.subscribe(m => {
      if (m.type === 'stt:updatesentence') {
        this.speechStore.update(e => {
          if (e.sentences.length > 20) e.sentences.splice(0,1); // limit number of sentences
          e.sentences = arrayUpsert(e.sentences, m.data.id, m.data);
        })
        this.TriggerShowTimer();
      }
    }); // listen for network messages
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

  private timeout: any;
  TriggerShowTimer() {
    this.speechStore.update({show: true});
    this.timeout && clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.speechStore.update({show: false}), 5000);
  }

  private DeleteSentence(id: ID) {}
  @transaction()
  private UpdateLastSentence(text: string, finalized = false) {
    const sentences = this.speechQuery.getValue().sentences;
    if (sentences.length === 0 || sentences[sentences.length - 1].finalized) {
      // create new
      const newSentence: SpeechSentence = {finalized, value: text, id: guid()};
      this.speechStore.update(e =>{
        if (e.sentences.length > 20) e.sentences.splice(0,1); // limit number of sentences
        e.sentences = arrayAdd(e.sentences, newSentence);
      });
      this.networkService.SendMessage({type: 'stt:updatesentence', data: newSentence})
    }
    else {
      const lastSentence = sentences[this.speechQuery.getValue().sentences.length - 1];
      const updated = {...lastSentence, finalized, value: text}
      this.speechStore.update(({sentences: arrayUpdate(sentences, lastSentence.id, updated)}))
      this.networkService.SendMessage({type: 'stt:updatesentence', data: updated})
    }
    this.TriggerShowTimer();
  }

  private BindSpeechParse() {
    this.recognitionInstance.onresult = (event) => {
      var interim_transcript = '';
      var final_transcript   = '';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
          this.UpdateLastSentence(final_transcript, true)
          console.log("final", final_transcript);
        }
        else {
          interim_transcript += event.results[i][0].transcript;
          this.UpdateLastSentence(interim_transcript);
          console.log("interim", interim_transcript);
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
      this.recognitionInstance.abort();
      await new Promise((res, rej) => {
        this.recognitionInstance.onerror = rej;
        this.recognitionInstance.onstart = res;
        this.recognitionInstance.start();
      });
      this.recognitionInstance.onstart = null;
      this.UpdateNetworkStatus(ConnectionState.Connected);
      this.recognitionInstance.onerror = (error) => {
        if (error.error === "no-speech") {}
        else if (error.error === "network") {
          this.Stop();
        }
        else {
          this.Stop();
          console.error(error)
        }
        console.error(error)
      };
    } catch (error) {
      console.error(error)
      //todo handle startup error
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
