import {appWindow} from "@tauri-apps/api/window";

export enum ClientType {
  host,
  client
}

export function GetClientType(): ClientType {
  return (
    location.pathname === '/' ||
    location.pathname === '/auth/twitch' ||
    location.pathname === '/simple-obs-stt/' ||
    location.pathname === '/simple-obs-stt/auth/twitch'
  ) ?
    ClientType.host :
    ClientType.client;
}
export function IsTauri(): boolean {
  return !!appWindow;
}
