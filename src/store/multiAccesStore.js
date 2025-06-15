import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useMultiAccessStore = create(
  persist(
    (set) => ({
      showMultiAccess: true,
      setCloseMultiModal: () =>
        set({
          showMultiAccess: false
        }),
      setOpenMultiModal: () =>
        set({
          showMultiAccess: true
        }),
    }),
    {
      name: "multi-live-access",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

export default useMultiAccessStore;
