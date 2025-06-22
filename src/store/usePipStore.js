import { create } from 'zustand';

const usePipStore = create((set) => ({
  isPipMode: false,
  setIsPipMode: (isPip) => set({ isPipMode: isPip }),
}));

export default usePipStore;
