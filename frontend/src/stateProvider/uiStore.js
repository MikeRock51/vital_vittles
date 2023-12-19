import { create } from "zustand";

export const useUIStore = create((set) => ({
  render: true,
  setRender: (state) => set({ render: state }),
}));
