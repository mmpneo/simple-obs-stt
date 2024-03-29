import {VoicePluginAzure}  from "@store/voice/plugins/VoicePluginAzure";
import {BaseVoicePlugin}   from "@store/voice/plugins/BaseVoicePlugin";
import {VoicePluginNative} from "@store/voice/plugins/VoicePluginNative";
import UAParser            from "ua-parser-js";
import {environment}       from "../../../../environments/environment";

type voices = [string, string][]

export type VoicePluginDescriptor = {
  name: string,
  plugin: { new(): BaseVoicePlugin },
  pluginDataFields: string[],
  // langName, langCode, [voiceName, voiceCode][]
  languages: () => [
    string,
    string,
    voices
  ][],
  platformValidate: () => boolean
}[];

export const VOICE_PLUGINS: VoicePluginDescriptor = [
  {
    name: 'Native',
    plugin: VoicePluginNative,
    languages: () => (<any>window)?.NativeVoicesGroups || [],
    platformValidate: () => true,
    pluginDataFields: []
  },
  {
    name:      "Azure Cognitive Services",
    plugin:    VoicePluginAzure,
    languages: () => [
      ["Arabic (Egypt)", "ar-EG", [["SalmaNeural", "ar-EG-SalmaNeural"], ["ShakirNeural", "ar-EG-ShakirNeural"]]],
      ["Arabic (Saudi Arabia)", "ar-SA", [["ZariyahNeural", "ar-SA-ZariyahNeural"], ["HamedNeural", "ar-SA-HamedNeural"]]],
      ["Bulgarian (Bulgaria)", "bg-BG", [["KalinaNeural", "bg-BG-KalinaNeural"], ["BorislavNeural", "bg-BG-BorislavNeural"]]],
      ["Catalan (Spain)", "ca-ES", [["AlbaNeural", "ca-ES-AlbaNeural"], ["JoanaNeural", "ca-ES-JoanaNeural"], ["EnricNeural", "ca-ES-EnricNeural"]]],
      ["Chinese (Cantonese, Traditional)", "zh-HK", [["HiuGaaiNeural", "zh-HK-HiuGaaiNeural"], ["HiuMaanNeural", "zh-HK-HiuMaanNeural"], ["WanLungNeural", "zh-HK-WanLungNeural"]]],
      ["Chinese (Mandarin, Simplified)", "zh-CN", [
        ["XiaoxiaoNeural", "zh-CN-XiaoxiaoNeural"],
        ["XiaoyouNeural", "zh-CN-XiaoyouNeural"],
        ["XiaomoNeural", "zh-CN-XiaomoNeural"],
        ["XiaoxuanNeural", "zh-CN-XiaoxuanNeural"],
        ["XiaohanNeural", "zh-CN-XiaohanNeural"],
        ["XiaoruiNeural", "zh-CN-XiaoruiNeural"],
        ["YunyangNeural", "zh-CN-YunyangNeural"],
        ["YunyeNeural", "zh-CN-YunyeNeural"],
        ["YunxiNeural", "zh-CN-YunxiNeural"],
      ]],
      ["Chinese (Taiwanese Mandarin)", "zh-TW", [["HsiaoChenNeural", "zh-TW-HsiaoChenNeural"], ["HsiaoYuNeural", "zh-TW-HsiaoYuNeural"], ["YunJheNeural", "zh-TW-YunJheNeural"],]],
      ["Croatian (Croatia)", "hr-HR", [["GabrijelaNeural", "hr-HR-GabrijelaNeural"], ["SreckoNeural", "hr-HR-SreckoNeural"]]],
      ["Czech (Czech)", "cs-CZ", [["VlastaNeural", "cs-CZ-VlastaNeural"], ["AntoninNeural", "cs-CZ-AntoninNeural"]]],
      ["Danish (Denmark)", "da-DK", [["ChristelNeural", "da-DK-ChristelNeural"], ["JeppeNeural", "da-DK-JeppeNeural"]]],
      ["Dutch (Belgium)", "nl-BE", [["DenaNeural", "nl-BE-DenaNeural"], ["ArnaudNeural", "nl-BE-ArnaudNeural"]]],
      ["Dutch (Netherlands)", "nl-NL", [["ColetteNeural", "nl-NL-ColetteNeural"], ["FennaNeural", "nl-NL-FennaNeural"], ["MaartenNeural", "nl-NL-MaartenNeural"]]],
      ["English (Australia)", "en-AU", [["NatashaNeural", "en-AU-NatashaNeural"], ["WilliamNeural", "en-AU-WilliamNeural"]]],
      ["English (Canada)", "en-CA", [["ClaraNeural", "en-CA-ClaraNeural"], ["LiamNeural", "en-CA-LiamNeural"]]],
      ["English (Hongkong)", "en-HK", [["YanNeural", "en-HK-YanNeural"], ["SamNeural", "en-HK-SamNeural"]]],
      ["English (India)", "en-IN", [["NeerjaNeural", "en-IN-NeerjaNeural"], ["PrabhatNeural", "en-IN-PrabhatNeural"]]],
      ["English (Ireland)", "en-IE", [["EmilyNeural", "en-IE-EmilyNeural"], ["ConnorNeural", "en-IE-ConnorNeural"]]],
      ["English (New Zealand)", "en-NZ", [["MollyNeural", "en-NZ-MollyNeural"], ["MitchellNeural", "en-NZ-MitchellNeural"]]],
      ["English (Philippines)", "en-PH", [["RosaNeural", "en-PH-RosaNeural"], ["JamesNeural", "en-PH-JamesNeural"]]],
      ["English (Singapore)", "en-SG", [["LunaNeural", "en-SG-LunaNeural"], ["WayneNeural", "en-SG-WayneNeural"]]],
      ["English (South Africa)", "en-ZA", [["LeahNeural", "en-ZA-LeahNeural"], ["LukeNeural", "en-ZA-LukeNeural"]]],
      ["English (United Kingdom)", "en-GB", [["LibbyNeural", "en-GB-LibbyNeural"], ["MiaNeural", "en-GB-MiaNeural"], ["RyanNeural", "en-GB-RyanNeural"]]],
      ["English (United States)", "en-US", [["AriaNeural", "en-US-AriaNeural"], ["JennyNeural", "en-US-JennyNeural"], ["GuyNeural", "en-US-GuyNeural"]]],
      ["Estonian (Estonia)", "et-EE", [["AnuNeural", "et-EE-AnuNeural"], ["KertNeural", "et-EE-KertNeural"]]],
      ["Finnish (Finland)", "fi-FI", [["NooraNeural", "fi-FI-NooraNeural"], ["SelmaNeural", "fi-FI-SelmaNeural"], ["HarriNeural", "fi-FI-HarriNeural"]]],
      ["French (Belgium)", "fr-BE", [["CharlineNeural", "fr-BE-CharlineNeural"], ["GerardNeural", "fr-BE-GerardNeural"]]],
      ["French (Canada)", "fr-CA", [["SylvieNeural", "fr-CA-SylvieNeural"], ["AntoineNeural", "fr-CA-AntoineNeural"], ["JeanNeural", "fr-CA-JeanNeural"]]],
      ["French (France)", "fr-FR", [["DeniseNeural", "fr-FR-DeniseNeural"], ["HenriNeural", "fr-FR-HenriNeural"]]],
      ["French (Switzerland)", "fr-CH", [["ArianeNeural", "fr-CH-ArianeNeural"], ["FabriceNeural", "fr-CH-FabriceNeural"]]],
      ["German (Austria)", "de-AT", [["IngridNeural", "de-AT-IngridNeural"], ["JonasNeural", "de-AT-JonasNeural"]]],
      ["German (Germany)", "de-DE", [["KatjaNeural", "de-DE-KatjaNeural"], ["ConradNeural", "de-DE-ConradNeural"]]],
      ["German (Switzerland)", "de-CH", [["LeniNeural", "de-CH-LeniNeural"], ["JanNeural", "de-CH-JanNeural"]]],
      ["Greek (Greece)", "el-GR", [["AthinaNeural", "el-GR-AthinaNeural"], ["NestorasNeural", "el-GR-NestorasNeural"]]],
      ["Gujarati (India)", "gu-IN", [["DhwaniNeural", "gu-IN-DhwaniNeural"], ["NiranjanNeural", "gu-IN-NiranjanNeural"]]],
      ["Hebrew (Israel)", "he-IL", [["HilaNeural", "he-IL-HilaNeural"], ["AvriNeural", "he-IL-AvriNeural"]]],
      ["Hindi (India)", "hi-IN", [["SwaraNeural", "hi-IN-SwaraNeural"], ["MadhurNeural", "hi-IN-MadhurNeural"]]],
      ["Hungarian (Hungary)", "hu-HU", [["NoemiNeural", "hu-HU-NoemiNeural"], ["TamasNeural", "hu-HU-TamasNeural"]]],
      ["Indonesian (Indonesia)", "id-ID", [["GadisNeural", "id-ID-GadisNeural"], ["ArdiNeural", "id-ID-ArdiNeural"]]],
      ["Irish (Ireland)", "ga-IE", [["OrlaNeural", "ga-IE-OrlaNeural"], ["ColmNeural", "ga-IE-ColmNeural"]]],
      ["Italian (Italy)", "it-IT", [["ElsaNeural", "it-IT-ElsaNeural"], ["IsabellaNeural", "it-IT-IsabellaNeural"], ["DiegoNeural", "it-IT-DiegoNeural"]]],
      ["Japanese (Japan)", "ja-JP", [["NanamiNeural", "ja-JP-NanamiNeural"], ["KeitaNeural", "ja-JP-KeitaNeural"]]],
      ["Korean (Korea)", "ko-KR", [["SunHiNeural", "ko-KR-SunHiNeural"], ["InJoonNeural", "ko-KR-InJoonNeural"]]],
      ["Latvian (Latvia)", "lv-LV", [["EveritaNeural", "lv-LV-EveritaNeural"], ["NilsNeural", "lv-LV-NilsNeural"]]],
      ["Lithuanian (Lithuania)", "lt-LT", [["OnaNeural", "lt-LT-OnaNeural"], ["LeonasNeural", "lt-LT-LeonasNeural"]]],
      ["Malay (Malaysia)", "ms-MY", [["YasminNeural", "ms-MY-YasminNeural"], ["OsmanNeural", "ms-MY-OsmanNeural"]]],
      ["Maltese (Malta)", "mt-MT", [["GraceNeural", "mt-MT-GraceNeural"], ["JosephNeural", "mt-MT-JosephNeural"]]],
      ["Marathi (India)", "mr-IN", [["AarohiNeural", "mr-IN-AarohiNeural"], ["ManoharNeural", "mr-IN-ManoharNeural"]]],
      ["Norwegian (Bokmål, Norway)", "nb-NO", [["IselinNeural", "nb-NO-IselinNeural"], ["PernilleNeural", "nb-NO-PernilleNeural"], ["FinnNeural", "nb-NO-FinnNeural"]]],
      ["Polish (Poland)", "pl-PL", [["AgnieszkaNeural", "pl-PL-AgnieszkaNeural"], ["ZofiaNeural", "pl-PL-ZofiaNeural"], ["MarekNeural", "pl-PL-MarekNeural"]]],
      ["Portuguese (Brazil)", "pt-BR", [["FranciscaNeural", "pt-BR-FranciscaNeural"], ["AntonioNeural", "pt-BR-AntonioNeural"]]],
      ["Portuguese (Portugal)", "pt-PT", [["FernandaNeural", "pt-PT-FernandaNeural"], ["RaquelNeural", "pt-PT-RaquelNeural"], ["DuarteNeural", "pt-PT-DuarteNeural"]]],
      ["Romanian (Romania)", "ro-RO", [["AlinaNeural", "ro-RO-AlinaNeural"], ["EmilNeural", "ro-RO-EmilNeural"]]],
      ["Russian (Russia)", "ru-RU", [["DariyaNeural", "ru-RU-DariyaNeural"], ["SvetlanaNeural", "ru-RU-SvetlanaNeural"], ["DmitryNeural", "ru-RU-DmitryNeural"]]],
      ["Slovak (Slovakia)", "sk-SK", [["ViktoriaNeural", "sk-SK-ViktoriaNeural"], ["LukasNeural", "sk-SK-LukasNeural"]]],
      ["Slovenian (Slovenia)", "sl-SI", [["PetraNeural", "sl-SI-PetraNeural"], ["RokNeural", "sl-SI-RokNeural"]]],
      ["Spanish (Argentina)", "es-AR", [["ElenaNeural", "es-AR-ElenaNeural"], ["TomasNeural", "es-AR-TomasNeural"]]],
      ["Spanish (Colombia)", "es-CO", [["SalomeNeural", "es-CO-SalomeNeural"], ["GonzaloNeural", "es-CO-GonzaloNeural"]]],
      ["Spanish (Mexico)", "es-MX", [["DaliaNeural", "es-MX-DaliaNeural"], ["JorgeNeural", "es-MX-JorgeNeural"]]],
      ["Spanish (Spain)", "es-ES", [["ElviraNeural", "es-ES-ElviraNeural"], ["AlvaroNeural", "es-ES-AlvaroNeural"]]],
      ["Spanish (US)", "es-US", [["PalomaNeural", "es-US-PalomaNeural"], ["AlonsoNeural", "es-US-AlonsoNeural"]]],
      ["Swahili (Kenya)", "sw-KE", [["ZuriNeural", "sw-KE-ZuriNeural"], ["RafikiNeural", "sw-KE-RafikiNeural"]]],
      ["Swedish (Sweden)", "sv-SE", [["HilleviNeural", "sv-SE-HilleviNeural"], ["SofieNeural", "sv-SE-SofieNeural"], ["MattiasNeural", "sv-SE-MattiasNeural"]]],
      ["Tamil (India)", "ta-IN", [["PallaviNeural", "ta-IN-PallaviNeural"], ["ValluvarNeural", "ta-IN-ValluvarNeural"]]],
      ["Telugu (India)", "te-IN", [["ShrutiNeural", "te-IN-ShrutiNeural"], ["MohanNeural", "te-IN-MohanNeural"]]],
      ["Thai (Thailand)", "th-TH", [["AcharaNeural", "th-TH-AcharaNeural"], ["PremwadeeNeural", "th-TH-PremwadeeNeural"], ["NiwatNeural", "th-TH-NiwatNeural"]]],
      ["Turkish (Turkey)", "tr-TR", [["EmelNeural", "tr-TR-EmelNeural"], ["AhmetNeural", "tr-TR-AhmetNeural"]]],
      ["Ukrainian (Ukraine)", "uk-UA", [["PolinaNeural", "uk-UA-PolinaNeural"], ["OstapNeural", "uk-UA-OstapNeural"]]],
      ["Urdu (Pakistan)", "ur-PK", [["UzmaNeural", "ur-PK-UzmaNeural"], ["AsadNeural", "ur-PK-AsadNeural"]]],
      ["Vietnamese (Vietnam)", "vi-VN", [["HoaiMyNeural", "vi-VN-HoaiMyNeural"], ["NamMinhNeural", "vi-VN-NamMinhNeural"]]],
      ["Welsh (United Kingdom)", "cy-GB", [["NiaNeural", "cy-GB-NiaNeural"], ["AledNeural", "cy-GB-AledNeural"]]],
    ],
    pluginDataFields: ["Service key", "Service location"],
    platformValidate: () => true
  }
]
