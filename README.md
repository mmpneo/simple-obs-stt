# Simple STT
Real-time speech-to-text and keyboard input subtitles for OBS.

## Why
This project was started because I personally needed a free, simple and performant solution to compensate speech impairments and overall shyness with subtitles.

The current goal of this project is to help streamers with similar problems to make their streams more interactive and engaging.

## Features
- <img src="https://cdn.betterttv.net/emote/5d38aaa592fc550c2d5996b8/1x" width="20" height="20"> No installation required
- <img src="https://cdn.betterttv.net/emote/6086e99a39b5010444d069fc/1x" width="20" height="20"> Simple OBS integration
- <img src="https://cdn.betterttv.net/emote/601b35be4e3ab965ef7684b2/1x" width="20" height="20"> Deep visual customization
- <img src="https://cdn.betterttv.net/emote/587fc95dafc2ff756c3f3012/1x" width="20" height="20"> Auto saves everything from last session
- <img src="https://cdn.betterttv.net/emote/5b35cae2f3a33e2b6f0058ef/1x" width="20" height="20"> All Changes automatically applied to client on the fly
- <img src="https://cdn.frankerfacez.com/emoticon/145916/1" width="20" height="20"> Use subtitles on multiple clients simultaneously

## STT Plugins

- [Azure Speech Services](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/) - high quality speech recognition, has free tier with 5 hours of audio per month, setup is kinda complicated
- [Browser native](https://caniuse.com/speech-recognition) - utilizes browser integrated api. (MS Edge quality is similar to Azure, but free, btw)
- Noop - disable speech recognition and use text input only

## Planned
- [ ] Fonts - Google fonts integration 
- [ ] Text animation - different text typing animations
- [ ] Sounds - typing sounds, text bubble appearing sound etc
- [ ] Templates - Reusable styles
- [ ] Custom background for host preview

## Standalone version
Experimental, WebView2(Edge) based, electron-like app. 
Works like trash (No native stt, eating 130mb+ memory for nothing, not reusing already opened browser). 
Still more efficient than electron, though ![txt](https://cdn.frankerfacez.com/emoticon/128054/1)

*Tested on windows.*
*Node 14 and Rust stable required.*
1. Clone repo
2. ``` npm run build ```
3. ```npx tauri build```
4. Build will be available at *./src-tauri/target/release/*
