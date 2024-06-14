import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeStorage } from "../utils/storage";

const useAuthStore = create(
  persist(
    (set) => ({
      profile: "",
      userProfile: "",
      user: "",
      session: "",
      setUser: (user) => {
        set({ user });
      },
      setUserProfile: (userProfile) => {
        set({ userProfile });
      },
      setProfile: (profile) => {
        set({ profile });
      },
      setSession: (session) => {
        storeStorage("isLogin", true)
        set({ session, isLogin: true });
      },
      logout: () => {
        storeStorage("isLogin", false)
        set({
          profile: "",
          userProfile: "",
          user: "",
          session: ""
        });
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

export default useAuthStore;
