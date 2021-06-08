import {EnvType} from "./EnvType";

export const environment: EnvType = {
  platform:   'app',
  peerConfig: {
    local:  {
      host:   'localhost',
      clientHost: 'http://localhost:3030/client',
      port:   3030,
      key:    '',
      path:   'ws',
      secure: false,
      ice:    [],
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

  tw_client: '{{CLIENT_ID}}',

  production:     true,
  clientPath:     'http://localhost:3030/client',
  twitchAuthPath: 'http://localhost:3030/auth/twitch',
  features:       {EMOTES: true, SHAREABLE: false, TTS: true}
};
