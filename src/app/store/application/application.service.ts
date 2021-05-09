import {Injectable}                from '@angular/core';
import {ApplicationStore}          from './application.store';
import {NetworkService}            from "@store/network/network.service";
import {SpeechService}             from "@store/speech/speech.service";
import {NetworkMode, NetworkStore} from "@store/network/network.store";
import {NetworkQuery}              from "@store/network/network.query";
import {environment}               from "../../../environments/environment";
import {HotToastService}           from "@ngneat/hot-toast";

@Injectable({providedIn: 'root'})
export class ApplicationService {
  constructor(
    private applicationStore: ApplicationStore,
    private networkService: NetworkService,
    private networkQuery: NetworkQuery,
    private networkStore: NetworkStore,
    private speechService: SpeechService,
    private toast: HotToastService
  ) {
    this.ChangeTheme(applicationStore.getValue().theme)
  }

  public CopyLink() {
    const isLocal = this.networkQuery.getValue().networkMode === NetworkMode.localhost;
    let url       = isLocal ? environment.localhostClientPath : environment.remoteClientPath;
    url           = `${url}/client/${this.networkService?.getPeerId()}/${isLocal ? 'local' : ''}`
    navigator.clipboard.writeText(url);
  }

  public async StartHost() {
    try {
      await this.speechService.StartHost();
      try {
        await this.networkService.StartHost();
      } catch (error) {
        this.speechService.Stop();
        throw new Error(error.message);
      }
    } catch (error) {
      this.toast.error(error.message, {position: "bottom-right"})
      console.log(error);
    }
  }

  public StopHost() {
    this.speechService.Stop()
    this.networkService.Stop()
  }

  ChangeTheme(theme: string) {
    document.body.setAttribute('data-theme', theme);
    this.applicationStore.update({theme})
  }
}
