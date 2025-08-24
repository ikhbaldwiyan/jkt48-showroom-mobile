import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SHOWROOM_API,
  USER_API,
  AUTH_API,
  HISTORY_API,
  JKT48_SHOWROOM_API,
  PODIUM_API,
  ROOM_LIST_API,
  PUBLIC_CHAT_API,
  ADMIN_USERS,
  ADMIN_TOKEN,
  ADMIN_COOKIE,
} from "@env";

const useApiConfig = create(
  persist(
    (set) => ({
      SHOWROOM_API,
      USER_API,
      AUTH_API,
      HISTORY_API,
      JKT48_SHOWROOM_API,
      PODIUM_API,
      ROOM_LIST_API,
      PUBLIC_CHAT_API,
      ADMIN_USERS,
      ADMIN_TOKEN,
      ADMIN_COOKIE,
      DONATION_IMG: "",
      MINIMUM_WATCH_MULTI_lIVE: 150,
      IS_MULTI_LIVE_RELEASE: false,
      IS_MULTI_LIVE_INFO: false,
      IS_MULTI_LIVE_CLOSED: false,
      SETTING_MULTI_ROOM_GLOBAL: false,

      // Method to update the API configuration
      setApiConfig: (config) => set(config),
    }),
    {
      name: "api-config-storage", // Unique name for the storage key
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useApiConfig;
