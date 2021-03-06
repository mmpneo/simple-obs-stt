import {Injectable}                                from '@angular/core';
import {EntityState, EntityStore, ID, StoreConfig} from '@datorama/akita';
import {ConnectionState}                           from "../../utils/types";
import produce                                     from "immer";
import {SpeechSentenceModel}                       from "@store/speech/speech.model";

export enum SpeechSentenceType {
  voice,
  text
}

export interface SpeechSentence {
  id: ID;
  type: SpeechSentenceType;
  finalized: boolean;
  valueNext: string[][],
  ttsValue: string,
  animation: {
    animate: boolean
    animateWords: boolean,
    interval: number
  }
}

export interface SpeechState extends EntityState<SpeechSentenceModel, ID> {
  selectedPlugin: [string, any],
  selectedPluginData: string[],
  selectedLanguage: [number, number],
  connectionState: ConnectionState,
  textInput: string;
  show: boolean;
  profanityWords: string[]
}

export function createInitialState(): SpeechState {
  return {
    selectedPlugin:     ["native", null],
    selectedPluginData: [],
    selectedLanguage:   [0, 0],
    connectionState:    ConnectionState.Disconnected,
    textInput:          "",
    show:               false,
    profanityWords: []
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'speech', producerFn: produce})
export class SpeechStore extends EntityStore<SpeechState> {

  constructor() {
    super(createInitialState());
  }

}

export const languages = [
  // ['Afrikaans', ['af-ZA']],
  // ['አማርኛ', ['am-ET']],
  // ['Azərbaycanca', ['az-AZ']],
  // ['বাংলা',
  //   ['bn-BD', 'বাংলাদেশ'],
  //   ['bn-IN', 'ভারত']],
  // ['Bahasa Indonesia', ['id-ID']],
  // ['Bahasa Melayu', ['ms-MY']],
  // ['Català', ['ca-ES']],
  // ['Čeština', ['cs-CZ']],
  ['Dansk', ['da-DK']],
  ['Deutsch', ['de-DE']],
  ['English',
    ['en-AU', 'Australia'],
    ['en-CA', 'Canada'],
    ['en-IN', 'India'],
    // ['en-KE', 'Kenya'],
    // ['en-TZ', 'Tanzania'],
    // ['en-GH', 'Ghana'],
    // ['en-IE', 'Ireland'],
    // ['en-NZ', 'New Zealand'],
    // ['en-NG', 'Nigeria'],
    // ['en-ZA', 'South Africa'],
    // ['en-PH', 'Philippines'],
    ['en-GB', 'United Kingdom'],
    ['en-US', 'United States']],
  ['Español',
    // ['es-AR', 'Argentina'],
    // ['es-BO', 'Bolivia'],
    // ['es-CL', 'Chile'],
    // ['es-CO', 'Colombia'],
    // ['es-CR', 'Costa Rica'],
    // ['es-EC', 'Ecuador'],
    // ['es-SV', 'El Salvador'],
    ['es-ES', 'España'],
    // ['es-US', 'Estados Unidos'],
    // ['es-GT', 'Guatemala'],
    // ['es-HN', 'Honduras'],
    ['es-MX', 'México'],
    // ['es-NI', 'Nicaragua'],
    // ['es-PA', 'Panamá'],
    // ['es-PY', 'Paraguay'],
    // ['es-PE', 'Perú'],
    // ['es-PR', 'Puerto Rico'],
    // ['es-DO', 'República Dominicana'],
    // ['es-UY', 'Uruguay'],
    // ['es-VE', 'Venezuela']
  ],
  // ['Euskara', ['eu-ES']],
  // ['Filipino', ['fil-PH']],
  ['Français', ['fr-FR']],
  // ['Basa Jawa', ['jv-ID']],
  // ['Galego', ['gl-ES']],
  // ['ગુજરાતી', ['gu-IN']],
  // ['Hrvatski', ['hr-HR']],
  // ['IsiZulu', ['zu-ZA']],
  // ['Íslenska', ['is-IS']],
  ['Italiano', ['it-IT']],
  // ['it-IT', 'Italia'],
  // ['it-CH', 'Svizzera']],
  // ['ಕನ್ನಡ', ['kn-IN']],
  // ['ភាសាខ្មែរ', ['km-KH']],
  // ['Latviešu', ['lv-LV']],
  // ['Lietuvių', ['lt-LT']],
  // ['മലയാളം', ['ml-IN']],
  // ['मराठी', ['mr-IN']],
  // ['Magyar', ['hu-HU']],
  // ['ລາວ', ['lo-LA']],
  ['Nederlands', ['nl-NL']],
  // ['नेपाली भाषा', ['ne-NP']],
  ['Norsk bokmål', ['nb-NO']],
  ['Polski', ['pl-PL']],
  ['Português',
    ['pt-BR', 'Brasil'],
    ['pt-PT', 'Portugal']],
  // ['Română', ['ro-RO']],
  // ['සිංහල', ['si-LK']],
  // ['Slovenščina', ['sl-SI']],
  // ['Basa Sunda', ['su-ID']],
  // ['Slovenčina', ['sk-SK']],
  ['Suomi', ['fi-FI']],
  ['Svenska', ['sv-SE']],
  // ['Kiswahili',
  //   ['sw-TZ', 'Tanzania'],
  //   ['sw-KE', 'Kenya']],
  // ['ქართული', ['ka-GE']],
  // ['Հայերեն', ['hy-AM']],
  // ['தமிழ்',
  //   ['ta-IN', 'இந்தியா'],
  //   ['ta-SG', 'சிங்கப்பூர்'],
  //   ['ta-LK', 'இலங்கை'],
  //   ['ta-MY', 'மலேசியா']],
  // ['తెలుగు', ['te-IN']],
  // ['Tiếng Việt', ['vi-VN']],
  // ['Türkçe', ['tr-TR']],
  // ['اُردُو',
  //   ['ur-PK', 'پاکستان'],
  //   ['ur-IN', 'بھارت']],
  // ['Ελληνικά', ['el-GR']],
  // ['български', ['bg-BG']],
  ['Pусский', ['ru-RU']],
  // ['Српски', ['sr-RS']],
  // ['Українська', ['uk-UA']],
  ['한국어', ['ko-KR']],
  ['中文', ['cmn-Hans-CN']
    // ['cmn-Hans-CN', '普通话 (中国大陆)'],
    // ['cmn-Hans-HK', '普通话 (香港)'],
    // ['cmn-Hant-TW', '中文 (台灣)'],
    // ['yue-Hant-HK', '粵語 (香港)']],
  ],
  ['日本語', ['ja-JP']],
  ['हिन्दी', ['hi-IN']],
  ['ภาษาไทย', ['th-TH']]
];
