import { create } from "zustand";


export const useUserStore = create((set) => ({
  currentUser: null,
  auth_token: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  setAuthToken: (token) => set({ auth_token: token }),
}));
