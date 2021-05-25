import {Injectable}                from '@angular/core';
import {ApplicationStore}          from './application.store';
import {NetworkService}            from "@store/network/network.service";
import {SpeechService}             from "@store/speech/speech.service";
import {NetworkMode, NetworkStore} from "@store/network/network.store";
import {NetworkQuery}              from "@store/network/network.query";
import {environment}               from "../../../environments/environment";
import {HotToastService}           from "@ngneat/hot-toast";
import {SpeechQuery}               from "@store/speech/speech.query";

@Injectable({providedIn: 'root'})
export class ApplicationService {
  constructor(
    private applicationStore: ApplicationStore,
    private networkService: NetworkService,
    private networkQuery: NetworkQuery,
    private speechQuery: SpeechQuery,
    private networkStore: NetworkStore,
    private speechService: SpeechService,
    private toast: HotToastService
  ) {
    this.ChangeTheme(applicationStore.getValue().theme)
  }

  public CopyLink() {
    const isLocal = this.networkQuery.getValue().networkMode === NetworkMode.localhost;
    const url           = `${environment.clientPath}/${this.networkService?.getPeerId()}/${isLocal ? 'local' : ''}`
    navigator.clipboard.writeText(url);
  }

  public async StartHost() {
    // process only if everything is down
    if (this.speechQuery.getValue().speechServiceState > 0 || this.networkQuery.getValue().peerConnectionState > 0)
      return;
    try {
      await this.speechService.StartHost();
      try {
        await this.networkService.StartHost();
      } catch (error) {
        await this.speechService.StopHost();
        throw new Error(error.message);
      }
    } catch (error) {
      this.toast.error(error.message || error, {position: "bottom-right"})
      throw new Error(error.message || error);
    }
  }

  public StopHost() {
    this.speechService.StopHost();
    this.networkService.Stop();
  }

  ChangeTheme(theme: string) {
    document.body.setAttribute('data-theme', theme);
    this.applicationStore.update({theme})
  }
}
