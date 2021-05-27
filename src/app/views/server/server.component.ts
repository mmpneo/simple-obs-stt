import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NetworkQuery}                               from "@store/network/network.query";
import {SpeechQuery}                            from "@store/speech/speech.query";
import {SpeechService}                          from "@store/speech/speech.service";
import {ApplicationQuery}                       from "@store/application/application.query";
import {ApplicationService}                     from "@store/application/application.service";
import {languages}                              from "@store/speech/speech.store";
import {StyleService}                           from "@store/style/style.service";
import {StyleQuery}                             from "@store/style/style.query";
import {RGBA}                                   from "ngx-color";
import {NetworkService}                         from "@store/network/network.service";
import {SPEECH_PLUGINS, SpeechPluginDescriptor} from "@store/speech/plugins";
import {ConnectionState}                        from "../../utils/types";
import {environment}                            from "../../../environments/environment";

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
    public applicationQuery: ApplicationQuery,
    public applicationService: ApplicationService,
    public speechService: SpeechService,
    public speechQuery: SpeechQuery,
    public styleService: StyleService,
    public styleQuery: StyleQuery
  ) {
  }

  environment = environment;

  connectionState = ConnectionState;

  plugins: SpeechPluginDescriptor = {};
  langs                           = languages;

  RgbaToString(rgba: RGBA) {
    return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
  }

  ngOnInit(): void {
    this.plugins = Object.keys(SPEECH_PLUGINS).reduce((sum, pluginKey) => {
      if (SPEECH_PLUGINS[pluginKey].platformValidate())
        return {...sum, [pluginKey]: SPEECH_PLUGINS[pluginKey]}
      return sum;
    }, {});
  }

}
