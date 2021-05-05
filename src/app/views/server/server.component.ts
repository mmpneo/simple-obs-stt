import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NetworkQuery}                                                  from "@store/network/network.query";
import {SpeechQuery}                                                   from "@store/speech/speech.query";
import {SpeechService}                                                 from "@store/speech/speech.service";
import {ApplicationQuery}                                              from "@store/application/application.query";
import {ApplicationService}                                            from "@store/application/application.service";
import {languages}                                                     from "@store/speech/speech.store";
import {StyleService}                                                  from "@store/style/style.service";
import {StyleQuery}                                                    from "@store/style/style.query";
import {RGBA}                                                          from "ngx-color";
import {NetworkService}                                                from "@store/network/network.service";
import {SPEECH_PLUGINS}                                                from "@store/speech/plugins";

@Component({
  selector:        'app-server',
  templateUrl:     './server.component.html',
  styles:          [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerComponent implements OnInit {
  constructor(
    public networkQuery: NetworkQuery,
    public networkService: NetworkService,
    public speechQuery: SpeechQuery,
    public applicationQuery: ApplicationQuery,
    public applicationService: ApplicationService,
    public speechService: SpeechService,
    public styleService: StyleService,
    public styleQuery: StyleQuery,
    private detector: ChangeDetectorRef
  ) {
  }

  activeTab: 'text' | 'box' | 'avatar' | 'global' = 'text';

  ChangeTab(value: ServerComponent["activeTab"]) {
    this.activeTab = value;
    this.detector.markForCheck();
  }

  plugins = SPEECH_PLUGINS;
  langs   = languages;
  usable  = true;

  RgbaToString(rgba: RGBA) {
    return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
  }

  ngOnInit(): void {}

}
