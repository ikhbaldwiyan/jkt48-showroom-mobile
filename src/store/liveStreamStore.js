// store/liveStreamStore.ts
import { create } from "zustand";

const useLiveStreamStore = create((set) => ({
  profile: {},
  liveInfo: {},
  url: null,
  users: [],
  token: null,
  hideComment: false,
  streamOptions: [],

  setProfile: (newProfile) => set({ profile: newProfile }),
  setToken: (newToken) => set({ token: newToken }),
  setHideComment: (value) => set({ hideComment: value }),
  setLiveInfo: (info) => set({ liveInfo: info }),
  setUrl: (url) => set({ url }),
  setStreamOptions: (options) => set({ streamOptions: options }),
  clearLiveStream: () =>
    set({
      profile: {},
      liveInfo: {},
      url: null,
      premiumLive: {},
      users: [],
      token: null,
      hideComment: false,
      streamOptions: [],
    }),

  clearUrl: () => set({ url: null }),
}));

export default useLiveStreamStore;
