import { create } from "zustand";

const useThemeStore = create((set) => ({
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
}));

export default useThemeStore;
