import 'alpinejs'

import Peer from 'peerjs';

// function getWindow() {return <any>window}

class PeerClient {
  constructor() {
    this.hostID = window.location.hash?.substr(1);
    this.Init();
    this.UpdateSpeechValue("");
  }

  private hostID!: string;

  private peerInstance?: Peer;
  private connInstance?: Peer.DataConnection;

  private UpdateStatus      = (text: string) => {
    const ele = document.querySelector('#stt-status');
    if (ele) ele.innerHTML = text;
  };

  private uptime?: NodeJS.Timeout;
  private UpdateSpeechValue      = (text: string) => {
    const ele = document.querySelector('#stt-value');
    if (!ele)
      return;
    ele.innerHTML = text;
    this.uptime && clearTimeout(this.uptime);
    this.uptime = setTimeout(() => ele.innerHTML = "", 3000);
  };

  peers: { [id: string]: Peer.DataConnection } = {};


  private Reset() {
    this.UpdateStatus("Disconnected");
    this.peerInstance?.disconnected && this.peerInstance?.reconnect();
    this.peerInstance = undefined;
    this.connInstance?.close();
    this.connInstance = undefined;
    setTimeout(() => {
      this.Init();
    }, 1000);
  }

  private BindPeer() {
    this.peerInstance = new Peer();
    this.peerInstance?.on("open", _ => {
      this.UpdateStatus(`Connecting...`);
      this.BindConnection();
    });
    this.peerInstance?.on("error", _error => this.Reset())
  }

  private ParseServerMessage(data: any) {
    data?.type === 'stt' && this.UpdateSpeechValue(data.value);
  }

  private BindConnection() {
    this.connInstance = this.peerInstance?.connect(this.hostID);
    this.connInstance?.on("open", () => {
      this.UpdateStatus(``);
      this.UpdateSpeechValue(`STT ready`);
      this.connInstance?.on("data", data => this.ParseServerMessage(data));
    });
    this.connInstance?.on("close", () => this.Reset());
    this.connInstance?.on("error", () => this.Reset());
  }

  Init(): void {
    this.UpdateStatus('Connecting to relay');
    this.BindPeer();
  }
}

window.onload = () => new PeerClient();
