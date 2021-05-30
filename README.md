<h1 align="center"><img src=".github/images/logo.png" height="200"/></h1>
<p align="center">
  Speech-to-text and keyboard input captions for OBS.<br>
  <a href="#examples">See examples</a><br>
</p>

## Features
- <img src="https://cdn.betterttv.net/emote/5d38aaa592fc550c2d5996b8/1x" width="20" height="20"> **Web version**
- <img src="https://cdn.betterttv.net/emote/5b490e73cf46791f8491f6f4/1x" width="20" height="20"> **Standalone version**
- <img src="https://cdn.betterttv.net/emote/5c857788f779543bcdf37124/1x" width="20" height="20"> **Keyboard only mode**
- <img src="https://cdn.betterttv.net/emote/601b35be4e3ab965ef7684b2/1x" width="20" height="20"> **Deep visual customization**
- <img src="https://cdn.betterttv.net/emote/5cf69d7767398f2d6a1f9726/1x" width="20" height="20"> **Twitch/BTTV/FFZ emotes integration**
- <img src="https://cdn.betterttv.net/emote/5ad22a7096065b6c6bddf7f3/1x" width="20" height="20"> **Google Fonts integration** - about 1000 free fonts
- <img src="https://cdn.betterttv.net/emote/6086e99a39b5010444d069fc/1x" width="20" height="20"> **Simple OBS integration**
- <img src="https://cdn.betterttv.net/emote/587fc95dafc2ff756c3f3012/1x" width="20" height="20"> **Auto saves styles and configuration**
- <img src="https://cdn.betterttv.net/emote/5b35cae2f3a33e2b6f0058ef/1x" width="20" height="20"> **Style changes applied on the fly**
- <img src="https://cdn.frankerfacez.com/emoticon/145916/1" width="20" height="20"> **Share captions with multiple browser sources over the network**

## Main view
<img src=".github/images/screenshots/screenshot-1.png" width="100%"/>

## STT Plugins
- <img src=".github/images/browsers/desktop_main.png" height=20> [Azure Speech Services](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/) - high quality speech recognition, has free tier with 5 hours of audio per month, setup is kinda complicated
- <img src=".github/images/browsers/chrome.png" height=20><img src=".github/images/browsers/edge.png" height=20> [Browser native](https://caniuse.com/speech-recognition) - browser integrated api. Not available in desktop version
- <img src=".github/images/browsers/desktop_main.png" height=20> Noop - keyboard input only

## Quick start
1. Open [host page](https://mmpneo.github.io/simple-obs-stt)
2. Press "Host" button on the top-right
3. Start captions server
4. Select STT plugin and start it, if required
5. Copy client link on the left of "Host" button
6. Create browser source in OBS and past link

## Examples
<img src=".github/images/examples/ex-1.gif">
<img src=".github/images/examples/ex-1.png">
<img src=".github/images/examples/ex-5.jpg">
<img src=".github/images/examples/ex-2.png">
<img src=".github/images/examples/ex-3.png">
<img src=".github/images/examples/ex-4.jpg">

## Planned
- [x] Twitch emotes integration
- [x] Fonts - Google fonts integration
- [x] Style Templates - Instant switching between styles. For ex: Swappable styles for different games
- [ ] Sounds - typing sounds
- [ ] Text animation - simple appearing animation
- [ ] Custom background for host preview

## Standalone version
Experimental, WebView2(Edge) based, electron-like app.  
Works offline (Still requires connection for STT).

**How to build**  
*Tested on windows.*  
*Node 14 and Rust stable required.*
1. Clone repo
2. ``` npm i ```
3. ``` npx ng build --configuration=tauri ```
4. ```npx tauri build```
5. Build will be available at *./src-tauri/target/release/*

<img src="https://visitor-badge.glitch.me/badge?page_id=mmpneo.simple-obs-stt">

![](https://cdn.betterttv.net/emote/603bef907c74605395f3604a/1x) DO DO DO ![](https://cdn.betterttv.net/emote/603bef907c74605395f3604a/1x) DO DO DO ![](https://cdn.betterttv.net/emote/603bef907c74605395f3604a/1x) DO DO DO ![](https://cdn.betterttv.net/emote/603bef907c74605395f3604a/1x) DO DO DO ![](https://cdn.betterttv.net/emote/603bef907c74605395f3604a/1x) DO DO DO ![](https://cdn.betterttv.net/emote/603bef907c74605395f3604a/1x)
