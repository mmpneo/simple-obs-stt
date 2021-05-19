import {Injectable}                         from '@angular/core';
import {EmotesStore}                        from './emotes.store';
import {
  BttvChannelResponse,
  BttvGlobalResponse,
  EmoteMap,
  FfzChannelResponse,
  FfzGlobalResponse,
  TwitchResponse,
  TwitchUserResponse
}                                           from "@store/emotes/emotes.models";
import {environment}                        from "../../../environments/environment";
import {ClientType, GetClientType, IsTauri} from "../../utils/client_type";

@Injectable({providedIn: 'root'})
export class EmotesService {
  constructor(private emotesStore: EmotesStore) {
    GetClientType() === ClientType.host && this.Init();
  }

  // load twitch user and emotes if auth'd
  private async Init() {
    const key = localStorage.getItem('tw-key')
    if (!key)
      return;
    const request_user                          = await fetch('https://api.twitch.tv/helix/users', {headers: [
        ['Accept', 'application/vnd.twitchtv.v5+json'],
        ['Client-ID', environment.tw_client],
        ['Authorization', `Bearer ${key}`],
      ]
    });
    const request_user_json: TwitchUserResponse = await request_user.json();
    const twitch_user                           = request_user_json.data?.[0];
    if (!twitch_user)
      return;
    this.emotesStore.update(state => {
      state.user = {
        name:   twitch_user.display_name,
        avatar: twitch_user.profile_image_url
      }
    });

    // load all
    let request_all = await Promise.allSettled([
      this.Load_TWITCH_GLOBAL(twitch_user.id, environment.tw_client, key),
      this.Load_BTTV_GLOBAL(),
      this.Load_BTTV_CHANNEL(twitch_user.id),
      this.Load_FFZ_GLOBAL(),
      this.Load_FFZ_CHANNEL(twitch_user.id)
    ]);

    // merge all success request into one map
    let filtered: { [key: string]: string } = request_all.reduce((sum, {status, value}: any) => status === "fulfilled" ? ({...sum, ...value}) : sum, {});
    // split emotes into alphabet chunks
    this.emotesStore.update(state => {
      for (let key in filtered) if (state.emotes[key[0]])
        state.emotes[key[0]][key] = filtered[key]
    });

  }

  async LogOut() {
    if (localStorage.getItem('tw-key'))
      await fetch(`https://id.twitch.tv/oauth2/revoke?client_id=${environment.tw_client}&token=${localStorage.getItem('tw-key')}`, {method: 'POST'});
    this.emotesStore.update({user: null})
    localStorage.setItem('tw-key', '');
  }

  Login() {
    this.emotesStore.reset();
    const auth_link    = `https://id.twitch.tv/oauth2/authorize?client_id=${environment.tw_client}&redirect_uri=${environment.twitchAuthPath}&response_type=token&scope=user_subscriptions`
    const auth_window = window.open(auth_link, '', 'width=600,height=600');
    if (auth_window) auth_window.onbeforeunload = ev => this.Init()
  }

  private async Load_TWITCH_GLOBAL(id: string, app_id: string, auth_id: string) {
    const emotes: EmoteMap               = {};
    const tw_emotes                      = await fetch(`https://api.twitch.tv/kraken/users/${id}/emotes`, {
      headers: [
        ['Accept', 'application/vnd.twitchtv.v5+json'],
        ['Client-ID', app_id],
        ['Authorization', `OAuth ${auth_id}`],
      ]
    })
    const tw_emotes_json: TwitchResponse = await tw_emotes.json();
    Object.keys(tw_emotes_json.emoticon_sets).forEach(set_id => {
      tw_emotes_json.emoticon_sets[set_id].forEach(emote => emotes[emote.code] = `https://static-cdn.jtvnw.net/emoticons/v1/${emote.id}/1.0`)
    })
    return emotes;
  }

  private async Load_BTTV_GLOBAL(): Promise<EmoteMap> {
    const emotes: EmoteMap                     = {};
    const bttv_global                          = await fetch('https://api.betterttv.net/3/cached/emotes/global');
    const json_bttv_global: BttvGlobalResponse = await bttv_global.json();
    for (let i = 0; i < json_bttv_global.length; i++)
      emotes[json_bttv_global[i].code] = `https://cdn.betterttv.net/emote/${json_bttv_global[i].id}/1x`
    return emotes;
  }

  private async Load_BTTV_CHANNEL(id: string): Promise<EmoteMap> {
    const emotes: EmoteMap                       = {};
    const bttv_channel                           = await fetch(`https://api.betterttv.net/3/cached/users/twitch/${id}`);
    const json_bttv_channel: BttvChannelResponse = await bttv_channel.json();
    for (let i = 0; i < json_bttv_channel.channelEmotes.length; i++)
      emotes[json_bttv_channel.channelEmotes[i].code] = `https://cdn.betterttv.net/emote/${json_bttv_channel.channelEmotes[i].id}/1x`
    for (let i = 0; i < json_bttv_channel.sharedEmotes.length; i++)
      emotes[json_bttv_channel.sharedEmotes[i].code] = `https://cdn.betterttv.net/emote/${json_bttv_channel.sharedEmotes[i].id}/1x`
    return emotes;
  }

  private ParseFFz(data: FfzGlobalResponse) {
    const emotes: EmoteMap = {};
    Object.keys(data.sets).forEach(set_key => {
      for (let i = 0; i < data.sets[set_key].emoticons.length; i++) {
        const emoticon        = data.sets[set_key].emoticons[i];
        emotes[emoticon.name] = emoticon.urls["1"]
      }
    });
    return emotes;
  }

  private async Load_FFZ_GLOBAL(): Promise<EmoteMap> {
    const ffz_global                         = await fetch('https://api.frankerfacez.com/v1/set/global');
    const json_ffz_global: FfzGlobalResponse = await ffz_global.json();
    return this.ParseFFz(json_ffz_global);
  }

  private async Load_FFZ_CHANNEL(id: string): Promise<EmoteMap> {
    const ffz_channel                          = await fetch(`https://api.frankerfacez.com/v1/room/id/${id}`);
    const json_ffz_channel: FfzChannelResponse = await ffz_channel.json();
    return this.ParseFFz(json_ffz_channel);
  }

}


