interface IceConfig {
  url: string,
  username?: string,
  credential?: string
}
interface PeerConfig {
  host: string;
  port: number;
  key: string;
  path: string;
  secure: boolean;
  ice: IceConfig[];
  clientHost: string;
}
export interface EnvType {
  platform: 'app' | 'web';
  peerConfig: {
    local: PeerConfig,
    remote: PeerConfig,
  }

  tw_client: string;

  production: boolean;
  clientPath: string;
  twitchAuthPath: string;
  features: {
    EMOTES: boolean,
    SHAREABLE: boolean
  }
}
