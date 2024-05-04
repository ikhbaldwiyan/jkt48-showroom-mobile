import { create } from "zustand";
import { ROOMS } from "../services";

const useProfileStore = create((set) => ({
  profile: null,
  historyLive: null,
  getProfile: async (roomId) => {
    try {
      const response = await ROOMS.getRoomProfile({ room_id: roomId });
      set({ profile: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  clearProfile: () => set({ profile: null, historyLive: null }),
  getHistoryLive: async (roomId) => {
    try {
      const response = await ROOMS.getHistoryLives(roomId);
      set({ historyLive: response.data.recents });
    } catch (error) {
      console.log(error);
    }
  }
}));

export default useProfileStore;
