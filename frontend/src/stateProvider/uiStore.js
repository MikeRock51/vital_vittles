import { create } from "zustand";

export const useUIStore = create((set) => ({
  render: true,
  setRender: (render) => set({ render: !render }),
}));
