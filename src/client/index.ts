import 'alpinejs'

import Peer from 'peerjs';
// function getWindow() {return <any>window}

class PeerClient {
  constructor() {
    this.hostID = window.location.hash?.substr(1);
    this.Init();
  }

  private hostID!: string;

  private peerInstance?: Peer;
  private connInstance?: Peer.DataConnection;

  private UpdateStatus = (text: string) => {
    const ele = document.querySelector('#status');
    if (ele) ele.innerHTML = text;
  };

  peers: {[id: string]: Peer.DataConnection} = {};

  private Reset() {
    this.peerInstance?.disconnected && this.peerInstance?.reconnect();
    this.connInstance?.close();
    this.UpdateStatus("Disconnected");
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
    if (data?.type === 'stt')
      this.UpdateStatus(data.value);
  }

  private BindConnection() {
    this.connInstance = this.peerInstance?.connect(this.hostID);
    this.connInstance?.on("open", () => {
      this.UpdateStatus(`Connected`);
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
