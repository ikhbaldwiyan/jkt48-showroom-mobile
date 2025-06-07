import { create } from "zustand";
import { STREAM } from "../services";

const useIDNLiveStore = create((set) => ({
  profile: {},
  url: null,
  gifts: [],
  setGifts: (newGift) =>
    set((state) => {
      if (Array.isArray(newGift)) {
        // Resetting the gift array (e.g., setGifts([]))
        return { gifts: newGift };
      }

      // Otherwise, prepend new gift to the array
      return {
        gifts: Array.isArray(state.gifts)
          ? [newGift, ...state.gifts]
          : [newGift],
      };
    }),

  setProfile: (newProfile) => set({ profile: newProfile }),
  getLiveProfile: async (username) => {
    try {
      const response = await STREAM.getIDNLiveDetail(username);
      set({
        profile: response.data
      });
    } catch (error) {
      console.log("get profile idn error", error);
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
      url: null,
      gifts: [],
    }),
  clearUrl: () => set({ url: null })
}));

export default useIDNLiveStore;
