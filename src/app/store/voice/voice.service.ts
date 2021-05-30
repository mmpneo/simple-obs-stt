import {Injectable}        from '@angular/core';
import {VoiceStore}        from './voice.store';
import {VoicePluginNative} from "@store/voice/plugins/VoicePluginNative";
import {SPEECH_PLUGINS}    from "@store/speech/plugins";

@Injectable({providedIn: 'root'})
export class VoiceService {
  constructor(private voiceStore: VoiceStore) {
    console.log("init")
    const plugin = new VoicePluginNative();
    // plugin.Start("", []);
  }

  public SelectPlugin     = (key: string) => {
    this.voiceStore.update(e => ({
      selectedPluginData: new Array(SPEECH_PLUGINS[key].pluginDataFields.length).fill(null),
      selectedPlugin:     [key, e.selectedPlugin[1]]
    }));
  };
  public UpdatePluginData = (index: number, data: string) => this.voiceStore.update(e => {
    e.selectedPluginData[index] = data
  });
  public SelectLanguage   = (index: string) => this.voiceStore.update(e => ({selectedLanguage: [parseInt(index), 0]}));
  public SelectDialect    = (index: string) => this.voiceStore.update(e => ({selectedLanguage: [e.selectedLanguage[0], parseInt(index)]}));

  StartHost(){

  }

  StopHost() {

  }
}
