// stores/apiConfigStore.js
import create from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useApiConfig = create(
  persist(
    (set) => ({
      SHOWROOM_API: "",
      USER_API: "",
      AUTH_API: "",
      HISTORY_API: "",
      JKT48_SHOWROOM_API: "",
      PODIUM_API: "",

      // Method to update the API configuration
      setApiConfig: (config) => set(config),
    }),
    {
      name: "api-config-storage", // Unique name for the storage key
      getStorage: () => AsyncStorage, // Use AsyncStorage for React Native
    }
  )
);

export default useApiConfig;
