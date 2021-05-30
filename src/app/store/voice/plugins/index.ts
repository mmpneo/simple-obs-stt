import {BasePlugin}        from "@store/speech/plugins/BasePlugin";
import {VoicePluginNative} from "@store/voice/plugins/VoicePluginNative";

export type VoicePluginDescriptor = {
  [pluginName: string]: {
    name: string,
    plugin: { new(): BasePlugin },
    pluginDataFields: string[],
    platformValidate: () => boolean
  }
}

export const VOICE_PLUGINS: VoicePluginDescriptor = {
  // "native": {
  //   name:             'Native (Chrome and Edge)',
  //   plugin:           VoicePluginNative,
  //   pluginDataFields: [],
  //   platformValidate: () => environment.platform === "web"
  // },
  "azure":  {
    name:             "Azure Cognitive Services",
    plugin:           VoicePluginNative,
    pluginDataFields: ["Service key", "Service location"],
    platformValidate: () => true
  }
  // "noop":   {
  //   name:             'Noop (Keyboard input only)',
  //   plugin:           SpeechPluginNoop,
  //   pluginDataFields: [],
  //   platformValidate: () => true
  // },
}
