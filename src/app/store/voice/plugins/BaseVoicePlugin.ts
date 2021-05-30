import {BehaviorSubject, Subject} from "rxjs";
import {ConnectionState}          from "../../../utils/types";

export class BaseVoicePlugin {
  public readonly onFinal$: Subject<string>                          = new Subject<string>();
  public readonly onInter$: Subject<string>                          = new Subject<string>();
  public readonly onNotification$: Subject<string>                   = new Subject<string>();
  public readonly onPluginCrashed$: Subject<string>                  = new Subject<string>();
  public readonly onStatusChanged$: BehaviorSubject<ConnectionState> = new BehaviorSubject<ConnectionState>(ConnectionState.Disconnected);

  async Start(language: string, data: string[]) {
    this.onStatusChanged$.next(ConnectionState.Connecting);
    console.log(`[Base voice] Start ${language}`);
  };

  async Stop() {
    console.log("[Base voice] Stop");
    this.onStatusChanged$.next(ConnectionState.Disconnected);
    this.onFinal$.complete();
    this.onInter$.complete();
    this.onNotification$.complete();
    this.onPluginCrashed$.complete();
  };
}
