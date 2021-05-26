import {EnvType} from "./EnvType";

export const environment: EnvType = {
  platform:   'web',
  peerConfig: {
    local:  {
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

  tw_client: '{{CLIENT_ID}}',

  production:     true,
  clientPath:     "https://mmpneo.github.io/simple-obs-stt/client",
  twitchAuthPath: "https://mmpneo.github.io/simple-obs-stt/auth/twitch",
  features:       {EMOTES: true, SHAREABLE: false}
};
