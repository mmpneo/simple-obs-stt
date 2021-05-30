import {BaseVoicePlugin} from "@store/voice/plugins/BaseVoicePlugin";
import {
  AudioConfig,
  SpeechConfig,
  SpeechSynthesisOutputFormat,
  SpeechSynthesisResult,
  SpeechSynthesizer
}                        from "microsoft-cognitiveservices-speech-sdk";

export class VoicePluginNative extends BaseVoicePlugin {
  constructor() {
    super();
  }


  async Start(language: string, data: string[]): Promise<void> {
    super.Start(language, data);
    const speechConfig                       = SpeechConfig.fromSubscription('096b84e66cf548eb9fa4d76f830b9854', 'westeurope');
    const audioConfig                        = AudioConfig.fromSpeakerOutput();
    speechConfig.speechSynthesisOutputFormat = SpeechSynthesisOutputFormat.Riff16Khz16BitMonoPcm;
    speechConfig.speechSynthesisLanguage     = "en-Us";
    speechConfig.speechSynthesisVoiceName    = "en-US-AriaNeural";
    const ss                                 = new SpeechSynthesizer(speechConfig, audioConfig);
    // ss.synthesisCompleted                    = (s, e) => {
    //   e.result.audioData
    // }
    ss.speakTextAsync("hello world 1.", (result: SpeechSynthesisResult): void => {
      console.info("speaking finished, turn 1", result.audioData);
      const a = new Audio();
      const blob = new Blob([result.audioData], { type: "audio/wav" });
      a.src = window.URL.createObjectURL(blob);
      a.play();
      a.onended = () => window.URL.revokeObjectURL(a.src);
    }, (e: string): void => {
      console.error(e);
    });

    // const s = window.speechSynthesis;
    // s.addEventListener("voiceschanged", (e) => {
    //   const voices = speechSynthesis.getVoices()
    //   console.log(voices);
    //   var utterThis = new SpeechSynthesisUtterance(voices[0].name);
    //   utterThis.text = "Standardss subscribed with Prime Gaming. They've subscribed for 13 months!";
    //   s.speak(utterThis)
    // });

  }
}
