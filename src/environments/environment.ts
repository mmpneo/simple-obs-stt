import {EnvType} from "./EnvType";

export const environment: EnvType = {
  platform:   'web',
  peerConfig: {
    local:  {
      host:   '{{SERVER_HOST}}',
      clientHost: 'http://localhost:4200/client',
      port:   443,
      key:    'peerjs',
      path:   'server',
      secure: true,
      ice:    [
        {url: "stun:stun.l.google.com:19302"},
        {url: 'stun:stun1.l.google.com:19302'},
        {url: "turn:0.peerjs.com:3478", username: "peerjs", credential: "peerjsp"}
      ],
    },
    remote: {
      host:   '{{SERVER_HOST}}',
      clientHost: 'https://mmpneo.github.io/simple-obs-stt/client',
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

  tw_client:  '{{CLIENT_ID}}',

  production:     false,
  clientPath:     'http://localhost:4200/client',
  twitchAuthPath: 'http://localhost:4200/auth/twitch',
  features:       {EMOTES: true, SHAREABLE: false}
};

