import { create } from "zustand";
import { STREAM } from "../services";

const useIDNLiveStore = create((set) => ({
  profile: {},
  url: null,
  setProfile: (newProfile) => set({ profile: newProfile }),
  getLiveProfile: async (username) => {
    try {
      const response = await STREAM.getIDNLiveDetail(username);
      set({
        profile: response.data
      });
    } catch (error) {
      console.log(error);
    }
  },
  getStreamUrl: async (username) => {
    try {
      const response = await STREAM.getIDNLiveDetail(username);
      set({
        url: response.data.stream_url
      });
    } catch (error) {
      console.log("get stream url error", error);
    }
  },
  clearLiveStream: () =>
    set({
      profile: {},
      url: null
    }),
  clearUrl: () => set({ url: null })
}));

export default useIDNLiveStore;
