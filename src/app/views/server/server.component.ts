import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NetworkQuery}                               from "@store/network/network.query";
import {SpeechQuery}                                from "@store/speech/speech.query";
import {SpeechService}                              from "@store/speech/speech.service";
import {ApplicationQuery}                           from "@store/application/application.query";
import {ApplicationService}                         from "@store/application/application.service";
import {languages}                                  from "@store/speech/speech.store";

@Component({
  selector:        'app-server',
  templateUrl:     './server.component.html',
  styles:          [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerComponent implements OnInit {
  constructor(
    public networkQuery: NetworkQuery,
    public speechQuery: SpeechQuery,
    public applicationQuery: ApplicationQuery,
    public applicationService: ApplicationService,
    public speechService: SpeechService) {
  }

  langs = languages;

  ngOnInit(): void {
  }

}
