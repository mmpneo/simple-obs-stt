import 'alpinejs'

import UAParser from "ua-parser-js";
import Peer from 'peerjs';

function getWindow() {
  return <any>window
}

function Log(message: string) {
  console.log(`[Server] ${message}`)
}

function IsUsable(): boolean {
  return new UAParser().getBrowser().name === "Chrome"
}

class PeerServer {
  constructor() {
    if (!IsUsable()) {
      this.ShowOverlay();
      return;
    }
    Log('Create host instance');
    this.ShowView("connect");
    this.hostId = localStorage.getItem('obs_key');
  }

  hostId: string | null   = "";
  peerInstance?: Peer;
  recognitionInstance!: SpeechRecognition;
  languageDialect?: string;
  private isSpeechRunning = false;

  public ChangeHostId(value: string) {
    localStorage.setItem('obs_key', value);
    this.hostId = value;
  }

  private UpdateNetworkStatus = (text: string) => {
    const ele = document.querySelector('#status-network');
    if (ele) ele.innerHTML = text;
  };

  private ShowOverlay() {
    const template: any = document.querySelector(`#block-overlay`);
    const clone         = document.importNode(template.content, true);
    document.body.appendChild(clone);
  }

  private ShowView(targetView: 'connect' | 'starting' | 'running') {
    const view = document.querySelector('#view');
    if (!view)
      return;
    const template: any = document.querySelector(`#view-${targetView}`);
    const clone         = document.importNode(template.content, true);
    view.innerHTML      = '';
    view.appendChild(clone);
  }

  private UpdateSTTStatus = (text: string) => {
    const ele = document.querySelector('#status-stt');
    if (ele) ele.innerHTML = text;
  };

  private UpdateSttValue(value: string) {
    const ele = document.querySelector('#stt-value');
    if (ele) ele.innerHTML = value;
    for (let hash in this.peerInstance?.connections) {
      for (let peerConnection of this.peerInstance?.connections[hash])
        peerConnection.send({type: 'stt', value});
    }
  }

  private UpdatLanguageStatus = (text: string) => {
    const ele = document.querySelector('#status-language');
    if (ele) ele.innerHTML = text;
  };

  public Reset() {
    Log('Reset');
    this.isSpeechRunning = false;
    this.peerInstance?.destroy();
    this.recognitionInstance?.stop();
    this.ShowView("connect");
    this.UpdateNetworkStatus('-');
    this.UpdateSTTStatus('-');
    this.UpdatLanguageStatus('-');
  }

  public CopyLink() {
    let url = location.href.split("/").slice(0, -2).join("/");
    console.log(url)
    navigator.clipboard.writeText(`${url}/client#${this.peerInstance?.id}`)
  }

  private BindPeer() {
    Log('Bind peer');
    this.UpdateNetworkStatus('Connecting');
    this.peerInstance = new Peer(this.hostId || "");
    this.peerInstance?.on("open", _id => {
      this.UpdateNetworkStatus(`Connected`);
      this.BindRecognition();
    })
    this.peerInstance?.on("error", _error => {
      console.error(_error)
      this.Reset();
    })
    this.peerInstance?.on("connection", peerConnection => this.BindClientConnection(peerConnection))
  }

  private BindClientConnection(peerConnection: Peer.DataConnection) {
    peerConnection.on("open", () => {
      // do something with connected client
    });
  }

  public SelectDialect(value: string) {
    this.languageDialect = value;
  }

  BindRecognition() {
    Log("Initialize recognition");
    if (!this.languageDialect)
      return;
    this.UpdateSTTStatus("Connecting");
    this.recognitionInstance                = new (getWindow().webkitSpeechRecognition)
    this.recognitionInstance.lang           = this.languageDialect;
    this.recognitionInstance.continuous     = true;
    this.recognitionInstance.interimResults = true;
    this.recognitionInstance.onerror        = (error) => {
      if (error.error === "no-speech"){Log("OnError Silence error");}
      else {
        this.Reset();
        console.error(error)
      }
    };
    this.recognitionInstance.onend          = _event => {
      if (!this.isSpeechRunning)
        return;
      Log("OnEnd Restart recognition");
      this.recognitionInstance.start();
    } // auto restart after silence
    this.recognitionInstance.onstart        = () => {
      if (this.isSpeechRunning) // if restarting after silence
        return;
      Log("Start recognition");
      this.isSpeechRunning = true;
      this.UpdateSTTStatus("Connected");
      this.languageDialect && this.UpdatLanguageStatus(this.languageDialect);
      this.ShowView("running");
    };
    this.recognitionInstance.onresult       = (event) => {
      var interim_transcript = '';
      var final_transcript   = '';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
          this.UpdateSttValue(final_transcript);

        }
        else {
          interim_transcript += event.results[i][0].transcript;
          this.UpdateSttValue(interim_transcript);
        }
      }
    };
    this.recognitionInstance?.start();
  }

  Init(): void {
    if (!this.languageDialect)
      return;
    this.ShowView("starting");
    this.BindPeer();
  }
}

getWindow().dialectList    = [];
getWindow().getDialectList = (index: number) => {
  const lang                     = getWindow().langs[index];
  const [_langName, ...dialects] = lang;
  getWindow().dialectList        = lang[1]
  return dialects;
};

window.onload = () => getWindow().server = new PeerServer();

getWindow().langs = [
  ['Afrikaans', ['af-ZA']],
  ['አማርኛ', ['am-ET']],
  ['Azərbaycanca', ['az-AZ']],
  ['বাংলা',
    ['bn-BD', 'বাংলাদেশ'],
    ['bn-IN', 'ভারত']],
  ['Bahasa Indonesia', ['id-ID']],
  ['Bahasa Melayu', ['ms-MY']],
  ['Català', ['ca-ES']],
  ['Čeština', ['cs-CZ']],
  ['Dansk', ['da-DK']],
  ['Deutsch', ['de-DE']],
  ['English',
    ['en-AU', 'Australia'],
    ['en-CA', 'Canada'],
    ['en-IN', 'India'],
    ['en-KE', 'Kenya'],
    ['en-TZ', 'Tanzania'],
    ['en-GH', 'Ghana'],
    ['en-IE', 'Ireland'],
    ['en-NZ', 'New Zealand'],
    ['en-NG', 'Nigeria'],
    ['en-ZA', 'South Africa'],
    ['en-PH', 'Philippines'],
    ['en-GB', 'United Kingdom'],
    ['en-US', 'United States']],
  ['Español',
    ['es-AR', 'Argentina'],
    ['es-BO', 'Bolivia'],
    ['es-CL', 'Chile'],
    ['es-CO', 'Colombia'],
    ['es-CR', 'Costa Rica'],
    ['es-EC', 'Ecuador'],
    ['es-SV', 'El Salvador'],
    ['es-ES', 'España'],
    ['es-US', 'Estados Unidos'],
    ['es-GT', 'Guatemala'],
    ['es-HN', 'Honduras'],
    ['es-MX', 'México'],
    ['es-NI', 'Nicaragua'],
    ['es-PA', 'Panamá'],
    ['es-PY', 'Paraguay'],
    ['es-PE', 'Perú'],
    ['es-PR', 'Puerto Rico'],
    ['es-DO', 'República Dominicana'],
    ['es-UY', 'Uruguay'],
    ['es-VE', 'Venezuela']],
  ['Euskara', ['eu-ES']],
  ['Filipino', ['fil-PH']],
  ['Français', ['fr-FR']],
  ['Basa Jawa', ['jv-ID']],
  ['Galego', ['gl-ES']],
  ['ગુજરાતી', ['gu-IN']],
  ['Hrvatski', ['hr-HR']],
  ['IsiZulu', ['zu-ZA']],
  ['Íslenska', ['is-IS']],
  ['Italiano',
    ['it-IT', 'Italia'],
    ['it-CH', 'Svizzera']],
  ['ಕನ್ನಡ', ['kn-IN']],
  ['ភាសាខ្មែរ', ['km-KH']],
  ['Latviešu', ['lv-LV']],
  ['Lietuvių', ['lt-LT']],
  ['മലയാളം', ['ml-IN']],
  ['मराठी', ['mr-IN']],
  ['Magyar', ['hu-HU']],
  ['ລາວ', ['lo-LA']],
  ['Nederlands', ['nl-NL']],
  ['नेपाली भाषा', ['ne-NP']],
  ['Norsk bokmål', ['nb-NO']],
  ['Polski', ['pl-PL']],
  ['Português',
    ['pt-BR', 'Brasil'],
    ['pt-PT', 'Portugal']],
  ['Română', ['ro-RO']],
  ['සිංහල', ['si-LK']],
  ['Slovenščina', ['sl-SI']],
  ['Basa Sunda', ['su-ID']],
  ['Slovenčina', ['sk-SK']],
  ['Suomi', ['fi-FI']],
  ['Svenska', ['sv-SE']],
  ['Kiswahili',
    ['sw-TZ', 'Tanzania'],
    ['sw-KE', 'Kenya']],
  ['ქართული', ['ka-GE']],
  ['Հայերեն', ['hy-AM']],
  ['தமிழ்',
    ['ta-IN', 'இந்தியா'],
    ['ta-SG', 'சிங்கப்பூர்'],
    ['ta-LK', 'இலங்கை'],
    ['ta-MY', 'மலேசியா']],
  ['తెలుగు', ['te-IN']],
  ['Tiếng Việt', ['vi-VN']],
  ['Türkçe', ['tr-TR']],
  ['اُردُو',
    ['ur-PK', 'پاکستان'],
    ['ur-IN', 'بھارت']],
  ['Ελληνικά', ['el-GR']],
  ['български', ['bg-BG']],
  ['Pусский', ['ru-RU']],
  ['Српски', ['sr-RS']],
  ['Українська', ['uk-UA']],
  ['한국어', ['ko-KR']],
  ['中文',
    ['cmn-Hans-CN', '普通话 (中国大陆)'],
    ['cmn-Hans-HK', '普通话 (香港)'],
    ['cmn-Hant-TW', '中文 (台灣)'],
    ['yue-Hant-HK', '粵語 (香港)']],
  ['日本語', ['ja-JP']],
  ['हिन्दी', ['hi-IN']],
  ['ภาษาไทย', ['th-TH']]
];
