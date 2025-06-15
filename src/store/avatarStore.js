import { create } from 'zustand';

const useAvatarStore = create((set) => ({
  avatarImage: null,
  setAvatarImage: (image) => set({ avatarImage: image }),
  resetAvatar: () => set({ avatarImage: null }),
}));

export default useAvatarStore; 