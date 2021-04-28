import {Injectable}       from '@angular/core';
import {ApplicationStore} from './application.store';
import {NetworkService}   from "@store/network/network.service";
import {SpeechService}    from "@store/speech/speech.service";
import {NetworkStore}     from "@store/network/network.store";
import {NetworkQuery}     from "@store/network/network.query";
import {SpeechQuery}      from "@store/speech/speech.query";
import {combineQueries}   from "@datorama/akita";
import {ConnectionState}  from "../../utils/types";

@Injectable({providedIn: 'root'})
export class ApplicationService {
  constructor(
    private applicationStore: ApplicationStore,
    private networkService: NetworkService,
    private networkQuery: NetworkQuery,
    private speechService: SpeechService,
    private speechQuery: SpeechQuery,
    private networkStore: NetworkStore,
  ) {
  }

  public ChangeHostId = (hostID: string) => this.networkStore.update({hostID});

  public CopyLink() {
    let url = location.href.split("/").slice(0, -1).join("/");
    navigator.clipboard.writeText(`${url}/client/${this.networkService?.getPeerId()}`)
  }

  public async StartHost() {
    try {
      await this.speechService.InitHostSpeech();
      await this.networkService.InitServer();

      combineQueries([this.speechQuery.connectionState$, this.networkQuery.connectionState$]).subscribe(([s,n]) => {
        if (s === ConnectionState.Disconnected || n === ConnectionState.Disconnected) {
          this.StopHost();
        }
      });

    } catch (error) {throw new Error(error);}}
  public StopHost() {
    this.speechService.Stop()
    this.networkService.Stop()
  }

  public StartClient() {
  }

}
