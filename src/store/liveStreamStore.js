import { create } from "zustand";
import { STREAM } from "../services";

const useLiveStreamStore = create((set) => ({
  profile: {},
  liveInfo: {},
  url: null,
  premiumLive: {},
  users: [],
  token: null,
  hideComment: false,
  streamOptions: [],
  setProfile: (newProfile) => set({ profile: newProfile }),
  setToken: (newToken) => set({ token: newToken }),
  setHideComment: (value) => set({ hideComment: value }),
  getLiveInfo: async (roomId, cookieLoginId) => {
    try {
      const response = await STREAM.getStreamInfo(
        roomId,
        cookieLoginId ?? "cookies"
      );
      set({ liveInfo: response.data });
    } catch (error) {
      console.log("get live Info error", error);
    }
  },
  getStreamUrl: async (roomId, cookieLoginId) => {
    try {
      const streams = await STREAM.getStreamUrl(roomId, cookieLoginId);
      set({ url: streams?.data[0]?.url });
    } catch (error) {
      console.log("get stream url error", error);
    }
  },
  getStreamOptions: async (roomId, cookieLoginId) => {
    try {
      const streamsOptions = await STREAM.getStreamUrlOptions(
        roomId,
        cookieLoginId
      );
      if (Array.isArray(streamsOptions?.data) && streamsOptions.data.length > 0) {
        set({ streamOptions: streamsOptions.data });
      } 
    } catch (error) {
      console.log("get stream url error", error);
    }
  },
  setSelectedUrl: (newUrl) => {
    set({ url: newUrl });
  },
  registerUserRoom: async (session, profile) => {
    try {
      await STREAM.visitRoom({
        cookies_login_id: session?.cookie_login_id,
        room_id: profile?.room_id
      });
    } catch (error) {
      console.log(error);
    }
  },
  getPremiumLive: async () => {
    try {
      const response = await STREAM.getPremiumLiveToday();
      set({
        premiumLive: response.data,
        users: response?.data?.sharingLiveUsers
      });
    } catch (error) {
      console.log(error);
    }
  },
  clearLiveStream: () =>
    set({
      profile: {},
      liveInfo: {},
      url: null,
      premiumLive: {},
      users: [],
      token: null,
      hideComment: false
    }),
  clearUrl: () => set({ url: null })
}));

export default useLiveStreamStore;
