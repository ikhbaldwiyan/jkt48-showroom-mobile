import { create } from "zustand";
import { ROOMS } from "../services";

const useProfileStore = create((set) => ({
  profile: null,
  getProfile: async (roomId) => {
    try {
      const response = await ROOMS.getRoomProfile({ room_id: roomId });
      set({ profile: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  clearProfile: () => set({ profile: null }),
}));

export default useProfileStore;
