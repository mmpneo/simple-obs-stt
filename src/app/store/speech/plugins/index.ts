import {SpeechPluginNative} from "@store/speech/plugins/SpeechPluginNative";
import {BasePlugin}         from "@store/speech/plugins/BasePlugin";
import {SpeechPluginAzure}  from "@store/speech/plugins/SpeechPluginAzure";
import {SpeechPluginNoop}   from "@store/speech/plugins/SpeechPluginNoop";
import {environment}        from "../../../../environments/environment";

export type SpeechPluginDescriptor = {
  [pluginName: string]: {
    name: string,
    dataInputLabel: string,
    hastDataInput: boolean
    plugin: { new(): BasePlugin },
    pluginDataFields: string[],
    platformValidate: () => boolean
  }
}

export const SPEECH_PLUGINS: SpeechPluginDescriptor = {
  "native": {
    name:           'Native (Only Chrome and Edge)',
    dataInputLabel: '',
    hastDataInput:  false,
    plugin:         SpeechPluginNative,
    pluginDataFields: [],
    platformValidate: () => environment.platform === "web"
  },
  "noop": {
    name:           'Noop (Text input only)',
    dataInputLabel: '',
    hastDataInput:  false,
    plugin:         SpeechPluginNoop,
    pluginDataFields: [],
    platformValidate: () => true
  },
  "azure":  {
    name:           "Azure Cognitive Services",
    dataInputLabel: 'Service key',
    hastDataInput:  true,
    plugin:         SpeechPluginAzure,
    pluginDataFields: ["Service key", "Service location"],
    platformValidate: () => true
  }
}
