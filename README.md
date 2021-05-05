# Simple STT

## Why
This project was started because I personally needed a free, simple and performant solution to compensate speech impairments and overall shyness with subtitles.

The current goal of this project is to help streamers with similar problems to make their streams more interactive and engaging.

## Features
- No installation required
- Simple OBS integration
- Deep visual customization
- Update visuals on the fly
- Use subtitles on multiple clients simultaneously, even over the network

## STT Plugins

- [Azure Speech Services](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/) - high quality speech recognition, has free tier with 5 hours of audio per month, setup is kinda complicated
- [Browser native](https://caniuse.com/speech-recognition) - utilizes browser integrated api. (MS Edge quality is similar to Azure, but free, btw)
- Noop - disable speech recognition and use text input only

## Planned
- [] Templates - Reusable styles 
- [] Custom background for host preview

## Standalone version
*Tested only on windows*
*Node 14 and Rust 1.5.1 required*
1. Clone repo
2. > npm run build
3. > npx tauri build
4. Build will be available at *./src-tauri/target/release/*
