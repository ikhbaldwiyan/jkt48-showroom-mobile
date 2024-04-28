import { create } from "zustand";
import { STREAM } from "../services";

const useLiveStreamStore = create((set) => ({
  profile: {},
  liveInfo: {},
  url: null,
  setProfile: (newProfile) => set({ profile: newProfile }),
  getLiveInfo: async (roomId, cookieLoginId) => {
    try {
      const response = await STREAM.getStreamInfo(
        roomId,
        cookieLoginId ?? "cookies"
      );
      set({ liveInfo: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  getStreamUrl: async (roomId, cookieLoginId) => {
    try {
      const streams = await STREAM.getStreamUrl(roomId, cookieLoginId);
      set({ url: streams?.data[0]?.url });
    } catch (error) {
      console.log(error);
    }
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
  clearLiveStream: () => set({ profile: {}, liveInfo: {}, url: null }),
  clearUrl: () => set({ url: null })
}));

export default useLiveStreamStore;
