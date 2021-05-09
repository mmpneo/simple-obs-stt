export enum ClientType {
  host,
  client
}

export function GetClientType(): ClientType {
  return (location.pathname === '/' || location.pathname === '/simple-obs-stt/') ?
    ClientType.host :
    ClientType.client;
}
export function IsTauri(): boolean {
  return !!(<any>window).__TAURI__
}
