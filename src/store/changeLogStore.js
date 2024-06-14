import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useChangeLogStore = create(
  persist(
    (set) => ({
      showChangeLog: true,
      setCloseModal: () =>
        set({
          showChangeLog: false
        }),
      setOpenModal: () =>
        set({
          showChangeLog: true
        }),
    }),
    {
      name: "change-log",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

export default useChangeLogStore;
