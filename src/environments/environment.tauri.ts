import {EnvType} from "./EnvType";

export const environment: EnvType = {
  tw_client:      '{{CLIENT_ID}}',
  server_host:    '{{SERVER_HOST}}',
  production:     true,
  clientPath:     'http://localhost:3030/client',
  twitchAuthPath: 'http://localhost:3030/auth/twitch'
};
