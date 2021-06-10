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
    pluginDataFieldsType: string[],
    pluginDataFieldsDescription: string[],
    platformValidate: () => boolean
  }
}

export const SPEECH_PLUGINS: SpeechPluginDescriptor = {
  "native": {
    name:           'Native (Chrome and Edge)',
    plugin:         SpeechPluginNative,
    pluginDataFields: [],
    pluginDataFieldsType: [],
    pluginDataFieldsDescription: [],
    platformValidate: () => environment.platform === "web"
  },
  "noop": {
    name:           'Noop (Keyboard input only)',
    plugin:         SpeechPluginNoop,
    pluginDataFields: [],
    pluginDataFieldsType: [],
    pluginDataFieldsDescription: [],
    platformValidate: () => true
  },
  "azure":  {
    name:           "Azure Cognitive Services",
    plugin:         SpeechPluginAzure,
    pluginDataFields: ["Service key", "Service location", "Silence Timeout"],
    pluginDataFieldsType: ["password", "password", "number"],
    pluginDataFieldsDescription: ["Api key (KEY 1 or KEY 2 from your resource)", "Resource location", "Amount of seconds of silence required to put azure in sleeping mode. Default is 20 seconds"],
    platformValidate: () => true
  }
}
