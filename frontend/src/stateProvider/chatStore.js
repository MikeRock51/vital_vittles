import { create } from "zustand";

export const useChatStore = create((set) => ({
  showSidebar: false,
  setShowSidebar: (show) => set({ showSidebar: show }),
}));
