// store/useIDNLiveStore.ts
import { create } from "zustand";

const useIDNLiveStore = create((set) => ({
  profile: {},
  url: null,
  gifts: [],

  setProfile: (profile) => set({ profile }),
  setUrl: (url) => set({ url }),
  setGifts: (newGift) =>
    set((state) => {
      if (Array.isArray(newGift)) return { gifts: newGift };
      return { gifts: [newGift, ...state.gifts] };
    }),

  clearLiveStream: () => set({ profile: {}, url: null, gifts: [] }),
  clearUrl: () => set({ url: null }),
}));

export default useIDNLiveStore;
