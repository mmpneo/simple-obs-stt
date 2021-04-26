import {Injectable}       from '@angular/core';
import {ApplicationStore} from './application.store';
import {NetworkService}   from "@store/network/network.service";
import {SpeechService}    from "@store/speech/speech.service";
import {NetworkStore}     from "@store/network/network.store";

@Injectable({providedIn: 'root'})
export class ApplicationService {
  constructor(
    private applicationStore: ApplicationStore,
    private networkService: NetworkService,
    private speechService: SpeechService,
    private networkStore: NetworkStore
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
    } catch (error) {throw new Error(error);}
    try {
      await this.networkService.InitServer();
    } catch (error) {throw new Error(error);}
  }
  public StopHost() {
    this.speechService.Stop()
    this.networkService.Stop()
  }

  public StartClient() {
  }

}
