import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useThemeStore = create(
  persist(
    (set) => ({
      mode: "light",
      header: "primary",
      theme: ["#24A2B7", "#3B82F6"],
      setDarkMode: () =>
        set({
          mode: "dark",
          header: "#4A5568",
          theme: ["#4A5568", "#282C34"]
        }),
      setLightMode: () =>
        set({
          mode: "light",
          header: "primary",
          theme: ["#24A2B7", "#3B82F6"]
        })
    }),
    {
      name: "theme-store",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

export default useThemeStore;
