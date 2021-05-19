import {EnvType} from "./EnvType";

export const environment: EnvType = {
  tw_client:      '{{CLIENT_ID}}',
  production:     true,
  clientPath:     'http://localhost:3030/client',
  twitchAuthPath: 'https://custom-protocol-taurilocalhost/oauth_twitch.html'
};
