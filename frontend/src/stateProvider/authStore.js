import { create } from "zustand";


export const useUserStore = create((set) => ({
  currentUser: null,
  setUser: (user) => set({ user: user }),
}));

export const useTokenStore = create((set) => ({
  auth_token: null,
  setUser: (token) => set({ auth_token: token }),
}));
