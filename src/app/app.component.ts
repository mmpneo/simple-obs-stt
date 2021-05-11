import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SpeechService}                      from "@store/speech/speech.service";
import {NetworkService}                     from "@store/network/network.service";
import {Router}                             from "@angular/router";
import {StyleService}                       from "@store/style/style.service";
import {IsTauri}                            from "./utils/client_type";
import {FontsService}                       from "@store/fonts/fonts.service";
import {SoundService}                       from "@store/sound/sound.service";
import {SwUpdate}                           from "@angular/service-worker";
import {environment}                        from "../environments/environment";
import {HotToastService}                    from "@ngneat/hot-toast";

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
    private toast: HotToastService,
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
    if (IsTauri() || !environment.production)
      return;
    this.updates.available.subscribe(event => {
      this.updates.activateUpdate().then(_ => this.toast.success("Update available. Refresh page"))
    })
    this.updates.checkForUpdate();
  }

}
