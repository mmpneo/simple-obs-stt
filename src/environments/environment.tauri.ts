import {EnvType} from "./EnvType";

export const environment: EnvType = {
  platform:   'web',
  peerConfig: {
    local:  {
      host:   'localhost',
      port:   3030,
      key:    '',
      path:   'ws',
      secure: false,
      ice:    [],
    },
    remote: {
      host:   '{{SERVER_HOST}}',
      port:   443,
      key:    'peerjs',
      path:   'server',
      secure: true,
      ice:    [
        {url: "stun:stun.l.google.com:19302"},
        {url: 'stun:stun1.l.google.com:19302'},
        {url: "turn:0.peerjs.com:3478", username: "peerjs", credential: "peerjsp"}
      ],
    }
  },

  tw_client: 'u93n4exg8mhj8m1my8ko8pf2fxpqmw',

  production:     true,
  clientPath:     'http://localhost:3030/client',
  twitchAuthPath: 'http://localhost:3030/auth/twitch',
  features:       {EMOTES: true, SHAREABLE: false}
};
