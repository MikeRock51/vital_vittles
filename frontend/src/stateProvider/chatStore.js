import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useChatStore = create((set) => ({
  showSidebar: false,
  setShowSidebar: (show) => set({ showSidebar: show }),
  creating: false,
  setCreating: (state) => set({ creating: state }),
  chatSessions: [],
  setChatSessions: (sessions) => set({ chatSessions: sessions }),
  // currentChat: null,
  // setCurrentChat: (chat) => set({ currentChat: chat }),
}));

export const usePChatStore = create(
  persist(
    (set) => ({
      currentChat: null,
      setCurrentChat: (chat) => set({ currentChat: chat }),
      chatHistory: null,
      setChatHistory: (history) => set({ chatHistory: history}),
    }),
    {
      storage: createJSONStorage(() => localStorage),
      name: "chatStore",
    },
  ),
);
