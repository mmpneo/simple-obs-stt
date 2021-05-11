import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SpeechService}                      from "@store/speech/speech.service";
import {NetworkService}                     from "@store/network/network.service";
import {Router}                             from "@angular/router";
import {StyleService}                       from "@store/style/style.service";
import {ClientType, GetClientType, IsTauri} from "./utils/client_type";
import {FontsService}                       from "@store/fonts/fonts.service";
import {SoundService}                       from "@store/sound/sound.service";
import {SwUpdate}                           from "@angular/service-worker";

@Component({
  selector:        'app-root',
  templateUrl:     'app.component.html',
  styles:          [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(
    private _speechService: SpeechService,
    private _networkService: NetworkService,
    private _styleService: StyleService,
    private _fontsService: FontsService,
    private _soundService: SoundService,
    private router: Router,
    private updates: SwUpdate) {

    console.log("[System] Is tauri:", IsTauri());
    !IsTauri() && this.CheckUpdate();
    let path = localStorage.getItem('path');
    if (path) {
      localStorage.removeItem('path');
      this.router.navigate([path.replace("simple-obs-stt", "")]);
    }
  }

  CheckUpdate() {
    this.updates.available.subscribe(event => {
      if (GetClientType() === ClientType.client)
        this.updates.activateUpdate().then(document.location.reload)
      else if (window.confirm("Update available. Update now"))
        this.updates.activateUpdate().then(document.location.reload)
    })
    this.updates.checkForUpdate();
  }

}
