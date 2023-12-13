import { create } from "zustand";

export const useChatStore = create((set) => ({
  showSidebar: false,
  setShowSidebar: (show) => set({ showSidebar: show }),
  creating: false,
  setCreating: (state) => set({ creating: state }),
  chatSessions: [],
  setChatSessions: (sessions) => set({ chatSessions: sessions }),
}));
