import {ChangeDetectionStrategy, Component, Optional} from '@angular/core';
import {SpeechService}                                from "@store/speech/speech.service";
import {NetworkService}                     from "@store/network/network.service";
import {Router}                             from "@angular/router";
import {StyleService}                       from "@store/style/style.service";
import {ClientType, GetClientType}          from "./utils/client_type";
import {FontsService}                       from "@store/fonts/fonts.service";
import {SoundService}                       from "@store/sound/sound.service";
import {SwUpdate}                           from "@angular/service-worker";
import {environment}                        from "../environments/environment";
import {HotToastService}                    from "@ngneat/hot-toast";
import {EmotesService}                      from "@store/emotes/emotes.service";

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
    private _emotesService: EmotesService,
    private router: Router,
    private toast: HotToastService,
    @Optional() private updates: SwUpdate) {

    console.log("[System] platform:", environment.platform);
    (environment.platform === "web") && this.CheckUpdate();
    let path          = localStorage.getItem('path');
    let path_fragment = localStorage.getItem('path-fragment');
    if (path) {
      localStorage.removeItem('path');
      localStorage.removeItem('path-fragment');
      this.router.navigate([path.replace("simple-obs-stt", "")], {fragment: path_fragment || undefined});
    }
  }

  CheckUpdate() {
    if (GetClientType() === ClientType.client || environment.platform === "app" || !environment.production)
      return;
    this.updates.available.subscribe(event => {
      this.updates.activateUpdate().then(_ => this.toast.success("Update available. Refresh page"))
    })
    this.updates.checkForUpdate();
  }

}
