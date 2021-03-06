import {SpeechPluginNative} from "@store/speech/plugins/SpeechPluginNative";
import {BasePlugin}         from "@store/speech/plugins/BasePlugin";
import {SpeechPluginAzure}  from "@store/speech/plugins/SpeechPluginAzure";
import {environment}        from "../../../../environments/environment";
import UAParser             from "ua-parser-js";

export type SpeechPluginDescriptor = {
  [pluginName: string]: {
    name: string,
    plugin: { new(): BasePlugin },
    dataFields: SpeechPluginDataField[]
    platformValidate: () => boolean,
    throttleInterim: number
  }
}


export type SpeechPluginDataField = {
  name: string
  description: string
  defaultValue: string
} & (
  {
    type: 'input'
    textInputType: 'text' | 'password' | 'number'
  } |
  {
    type: 'select'
    options: string[],
  }
)

export const SPEECH_PLUGINS: SpeechPluginDescriptor = {
  "native": {
    name:                        'Native',
    plugin:                      SpeechPluginNative,
    platformValidate:            () => {
      const ua = new UAParser();
      return environment.platform === "app" || (ua.getBrowser().name === 'Edge' || ua.getBrowser().name === 'Chrome');
    },
    dataFields: [],
    throttleInterim: 140
  },
  "azure":  {
    name:                        "Azure Cognitive Services",
    plugin:                      SpeechPluginAzure,
    platformValidate:            () => true,
    throttleInterim: 0,
    dataFields: [
      {
        name: "Service key",
        description: "Api key (KEY 1 or KEY 2 from your resource)",
        type: 'input',
        textInputType: 'password',
        defaultValue: ''
      },
      {
        name: "Service location",
        description: "Resource location",
        type: 'input',
        textInputType: 'password',
        defaultValue: ''
      },
      {
        name: "Silence Timeout",
        description: "Amount of seconds of silence required to put azure in sleeping mode. Default is 20 seconds",
        type: 'input',
        textInputType: 'number',
        defaultValue: '20'
      },
      {
        name: "Profanity filter",
        description: "Profanity filter",
        type: 'select',
        options: ["masked", "removed", "raw"],
        defaultValue: "masked"
      }
    ]
  }
}
