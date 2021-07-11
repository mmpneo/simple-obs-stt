import {Injectable}                from '@angular/core';
import {NetworkMode, NetworkStore} from './network.store';
import {NetworkQuery}              from "@store/network/network.query";
import {ConnectionState}           from "../../utils/types";
import {v4 as uuid}                from 'uuid';
import Peer                        from "peerjs";
import {Subject}                   from "rxjs";
import {environment}               from "../../../environments/environment";
import {HotToastService}           from "@ngneat/hot-toast";

interface Message {
  type: string,
  data: any
}

@Injectable({providedIn: 'root'})
export class NetworkService {
  constructor(
    private networkStore: NetworkStore,
    private networkQuery: NetworkQuery,
    private toastService: HotToastService) {
  }

  public messages$          = new Subject<Message>();
  public onClientConnected$ = new Subject();

  private peerInstance?: Peer;
  public getPeerId            = () => this.peerInstance?.id;
  private connInstance?: Peer.DataConnection; // client connection
  private UpdateNetworkStatus = (peerConnectionState: ConnectionState) => this.networkStore.update({peerConnectionState})

  public CopyLink() {
    const isLocal = this.networkQuery.getValue().networkMode === NetworkMode.localhost;
    const url     = `${isLocal ? environment.peerConfig.local.clientHost : environment.peerConfig.remote.clientHost}/${this?.getPeerId()}`
    navigator.clipboard.writeText(url);
    this.toastService.success("Copied!", {theme: "snackbar", position: "bottom-right"})
  }

  public SendAudio(buffer: ArrayBuffer) {
    this.SendMessage({type: 'tts:play', data: buffer});
  }

  public SendMessage(message: Message) {
    if (this.peerInstance?.disconnected)
      return;
    for (let hash in this.peerInstance?.connections)
      for (let peerConnection of this.peerInstance?.connections[hash])
        peerConnection.send(message);
  }

  private ResetClient(hostId: string) {
    this.UpdateNetworkStatus(ConnectionState.Disconnected);
    this.connInstance?.close();
    this.connInstance = undefined;
    this.peerInstance?.destroy();
    this.peerInstance = undefined;
    setTimeout(() => {
      console.log("[Client] Reset")
      this.InitClient(hostId);
    }, 2000);
  }

  StopHost() {
    this.UpdateNetworkStatus(ConnectionState.Disconnected);
    !this.peerInstance?.destroyed && this.peerInstance?.destroy();
  }

  private StartPeer(id: string): Peer {
    const mode = this.networkStore.getValue().networkMode;
    const config = mode === NetworkMode.localhost ? environment.peerConfig.local : environment.peerConfig.remote;

    return new Peer(id, mode === NetworkMode.localhost ? {
      ...config,
      config: {iceServers: environment.peerConfig.local.ice as unknown as RTCIceServer[]}
    } : {
      ...config,
      config: {iceServers: environment.peerConfig.remote.ice as unknown as RTCIceServer[]}
    })
  }

  public InitClient(hostId: string) {
    this.UpdateNetworkStatus(ConnectionState.Connecting);
    this.peerInstance = this.StartPeer(uuid());
    this.peerInstance?.on("open", _id => {
      this.connInstance = this.peerInstance?.connect(hostId, {reliable: true});
      this.connInstance?.on("open", () => {
        this.connInstance?.on("data", data => this.messages$.next(data));
        this.UpdateNetworkStatus(ConnectionState.Connected);
      });
      this.connInstance?.on("close", () => this.ResetClient(hostId));
      this.connInstance?.on("error", error => {
        console.log(error);
      });
    });
    this.peerInstance.on("disconnected", () => {
    })
    this.peerInstance.on("error", error => {
      console.log(error)
      this.ResetClient(hostId);
    });
  }

  public StartHost() {
    this.UpdateNetworkStatus(ConnectionState.Connecting);
    const state  = this.networkQuery.getValue();
    const hostID = state.saveHost ? (state.hostID || uuid()) : uuid(); // reuse or create new id

    this.peerInstance = this.StartPeer(hostID);
    this.peerInstance?.on("error", (error: Error) => {
      this.toastService.error(error.message, {theme: "snackbar", position: "bottom-right"});
      this.StopHost();
    });

    this.peerInstance?.on("open", () => {
      this.networkStore.update({hostID: this.peerInstance?.id});
      this.peerInstance?.on("connection", _peerConnection => {
        _peerConnection.on("open", () => this.onClientConnected$.next(null))
      })
      this.UpdateNetworkStatus(ConnectionState.Connected);
    })
  }

  SwitchSaveHost() {
    this.networkStore.update(e => ({saveHost: !e.saveHost}))
  }

  SwitchNetworkMode() {
    this.networkStore.update(e => ({networkMode: e.networkMode === NetworkMode.localhost ? NetworkMode.network : NetworkMode.localhost}))
  }
}
