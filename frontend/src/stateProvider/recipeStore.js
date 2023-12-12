import { create } from "zustand";
// import { persist, createJSONStorage } from 'zustand/middleware';

export const useRecipeStore = create(
    (set) => ({
      searchTerm: "",
      setSearchTerm: (term) => set({ searchTerm: term }),
      recipes: [],
      setRecipes: (data) => set({ recipes: data }),
      currentPage: 1,
      setCurrentPage: (page) => set({ currentPage: page}),
    }),);
