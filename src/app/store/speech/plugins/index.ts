import {SpeechPluginNative} from "@store/speech/plugins/SpeechPluginNative";
import {BasePlugin}         from "@store/speech/plugins/BasePlugin";
import {SpeechPluginAzure}  from "@store/speech/plugins/SpeechPluginAzure";
import {SpeechPluginNoop}   from "@store/speech/plugins/SpeechPluginNoop";
import {environment}        from "../../../../environments/environment";

export type SpeechPluginDescriptor = {
  [pluginName: string]: {
    name: string,
    plugin: { new(): BasePlugin },
    pluginDataFields: string[],
    platformValidate: () => boolean
  }
}

export const SPEECH_PLUGINS: SpeechPluginDescriptor = {
  "native": {
    name:           'Native (Chrome and Edge)',
    plugin:         SpeechPluginNative,
    pluginDataFields: [],
    platformValidate: () => environment.platform === "web"
  },
  "noop": {
    name:           'Noop (Keyboard input only)',
    plugin:         SpeechPluginNoop,
    pluginDataFields: [],
    platformValidate: () => true
  },
  "azure":  {
    name:           "Azure Cognitive Services",
    plugin:         SpeechPluginAzure,
    pluginDataFields: ["Service key", "Service location"],
    platformValidate: () => true
  }
}
