export type EmoteMap = { [key: string]: string }

interface TwitchEmote {
  id: number,
  code: string,
}

interface BttvEmote {
  id: string,
  code: string,
  imageType: string,
  userId: string
}

interface FfzEmote {
  id: number,
  name: string,
  height: 32,
  width: 32,
  public: true,
  hidden: false,
  modifier: false,
  offset: null,
  margins: null,
  css: null,
  urls: {
    1: string,
    2: string,
    4: string
  }
}

export interface TwitchUserResponse {
  data: {
    broadcaster_type: string
    created_at: Date
    description: string
    display_name: string
    id: string
    login: string
    offline_image_url: string
    profile_image_url: string
    type: string
    view_count: number
  }[]
}

export interface TwitchResponse {
  emoticon_sets: {[set_id: string]: TwitchEmote[]}
}

export type BttvGlobalResponse = BttvEmote[];

export interface BttvChannelResponse {
  channelEmotes: BttvEmote[];
  sharedEmotes: BttvEmote[];
}

export interface FfzChannelResponse {
  sets: {
    [id: string]: {
      emoticons: FfzEmote[]
    }
  }
}

export interface FfzGlobalResponse {
  sets: {
    [id: string]: {
      emoticons: FfzEmote[]
    }
  }
}
