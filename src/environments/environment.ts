import {EnvType} from "./EnvType";

export const environment: EnvType = {
  tw_client:      '{{CLIENT_ID}}',
  production:     false,
  clientPath:     'http://localhost:4200/client',
  twitchAuthPath: 'http://localhost:4200/auth/twitch'
};

