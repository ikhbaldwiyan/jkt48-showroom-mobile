import { create } from "zustand";
import { STREAM } from "../services";

const useIDNLiveStore = create((set) => ({
  profile: {},
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
  clearLiveStream: () =>
    set({
      profile: {}
    })
}));

export default useIDNLiveStore;
