import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NetworkQuery}                               from "@store/network/network.query";
import {SpeechQuery}                                from "@store/speech/speech.query";
import {SpeechService}                              from "@store/speech/speech.service";
import {ApplicationQuery}                           from "@store/application/application.query";
import {ApplicationService}                         from "@store/application/application.service";
import {languages}                                  from "@store/speech/speech.store";
import {StyleService}                               from "@store/style/style.service";
import {StyleQuery}                                 from "@store/style/style.query";
import {RGBA}                                       from "ngx-color";
import {NetworkService}                             from "@store/network/network.service";
import {SPEECH_PLUGINS, SpeechPluginDescriptor}     from "@store/speech/plugins";
import {ConnectionState}                            from "../../utils/types";
import {environment}                                from "../../../environments/environment";
import {VOICE_PLUGINS, VoicePluginDescriptor}       from "@store/voice/plugins";
import {VoiceService}                               from "@store/voice/voice.service";
import {VoiceQuery}                                 from "@store/voice/voice.query";

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
    public styleQuery: StyleQuery,
    public voiceService: VoiceService,
    public voiceQuery: VoiceQuery,
  ) {
  }

  environment = environment;

  connectionState = ConnectionState;

  speechPlugins: SpeechPluginDescriptor = {};
  langs                                 = languages;
  voicePlugins: VoicePluginDescriptor   = [];

  get voicePluginLanguages() {
    const state = this.voiceQuery.getValue();
    const selectedPlugin = this.voicePlugins[state.selectedPlugin[0]];
    return selectedPlugin?.languages ?? [];
  }

  get voicePluginVoices(): [string, string][] {
    const state = this.voiceQuery.getValue();
    const selectedPlugin = this.voicePlugins[state.selectedPlugin[0]];
    return selectedPlugin?.languages[state.selectedPlugin[1]][2] ?? [];
  }

  RgbaToString(rgba: RGBA) {
    return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
  }

  stt_start     = () => this.speechService.StartHost();
  stt_stop      = () => this.speechService.StopHost();
  network_start = () => this.networkService.StartHost();
  network_stop  = () => this.networkService.StopHost();
  voice_start   = () => this.voiceService.StartHost();
  voice_stop    = () => this.voiceService.StopHost();

  ngOnInit(): void {
    this.speechPlugins = Object
      .keys(SPEECH_PLUGINS)
      .reduce((sum, pluginKey) => SPEECH_PLUGINS[pluginKey].platformValidate() ? {
        ...sum,
        [pluginKey]: SPEECH_PLUGINS[pluginKey]
      } : sum, {});
    this.voicePlugins  = VOICE_PLUGINS.filter(plugin => plugin.platformValidate());
  }

}
