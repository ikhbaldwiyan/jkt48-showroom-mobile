import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        set({ session });
      },
      logout: () => {
        set({
          profile: "",
          userProfile: "",
          user: "",
          session: "",
        })
      }
    }),
    {
      name: "user",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

export default useAuthStore;
