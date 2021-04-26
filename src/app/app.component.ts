import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SpeechService}                      from "@store/speech/speech.service";
import {NetworkService}                     from "@store/network/network.service";

@Component({
  selector:        'app-root',
  templateUrl:     'app.component.html',
  styles:          [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private s: SpeechService, private n: NetworkService) {
  }
}
