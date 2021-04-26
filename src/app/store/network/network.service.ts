import {Injectable}      from '@angular/core';
import {NetworkStore}    from './network.store';
import Peer              from "peerjs";
import {NetworkQuery}    from "@store/network/network.query";
import {ConnectionState} from "../../utils/types";
import {Subject}         from "rxjs";

interface Message {
  type: string,
  data: any
}

@Injectable({providedIn: 'root'})
export class NetworkService {
  constructor(private networkStore: NetworkStore, private networkQuery: NetworkQuery) {}

  public messages$ = new Subject<Message>();

  private peerInstance?: Peer;
  public getPeerId = () => this.peerInstance?.id;
  private connInstance?: Peer.DataConnection; // client connection
  private UpdateNetworkStatus = (peerConnectionState: ConnectionState) => this.networkStore.update({peerConnectionState})

  public SendMessage(message: Message) {
    if (this.peerInstance?.disconnected)
      return;
    for (let hash in this.peerInstance?.connections)
      for (let peerConnection of this.peerInstance?.connections[hash])
        peerConnection.send(message);
  }

  private ResetClient(hostId: string) {
    this.UpdateNetworkStatus(ConnectionState.Disconnected);
    this.peerInstance?.disconnected && this.peerInstance?.reconnect();
    this.peerInstance = undefined;
    this.connInstance?.close();
    this.connInstance = undefined;
    setTimeout(() => {
      console.log("Reconnect")
      this.InitClient(hostId);
    }, 1000);
  }

  Stop() {
    this.UpdateNetworkStatus(ConnectionState.Disconnected);
    !this.peerInstance?.disconnected && this.peerInstance?.disconnect()
  }

  public InitClient(hostId: string) {
    this.UpdateNetworkStatus(ConnectionState.Connecting);
    this.peerInstance = new Peer();
    this.peerInstance?.on("open", _id => {
      this.peerInstance?.connect(hostId)
      this.connInstance = this.peerInstance?.connect(hostId);
      this.connInstance?.on("open", () => {
        this.connInstance?.on("data", data => this.messages$.next(data));
        this.UpdateNetworkStatus(ConnectionState.Connected);
      });
      this.connInstance?.on("close", () => this.ResetClient(hostId));
      this.connInstance?.on("error", error => {
        console.log(error)
        this.ResetClient(hostId);
      });
    });
    this.peerInstance.on("error", error => this.ResetClient(hostId));
  }

  public async InitServer() {
    this.UpdateNetworkStatus(ConnectionState.Connecting);
    this.peerInstance = new Peer(this.networkQuery.getValue().hostID || undefined);
    try {
      await new Promise((res, rej) => {
        this.peerInstance?.on("open", res);
        this.peerInstance?.on("error", rej);
      });
      this.UpdateNetworkStatus(ConnectionState.Connected)
    } catch (error) {
      throw new Error(error);
    }
    // this.peerInstance?.on("connection", peerConnection => this.BindClientConnection(peerConnection))
  }
}
