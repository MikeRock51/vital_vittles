import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      authToken: null,
      setAuthToken: (token) => set({ authToken: token }),
    }),
    { 
      storage: createJSONStorage(() => localStorage),
      name: 'userStore',
    }
  )
);
