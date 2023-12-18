import { create } from "zustand";

export const useRecipeStore = create(
    (set) => ({
      searchTerm: "",
      setSearchTerm: (term) => set({ searchTerm: term }),
      recipes: [],
      setRecipes: (data) => set({ recipes: data }),
      currentPage: 1,
      setCurrentPage: (page) => set({ currentPage: page}),
      filtersOpen: false,
      setFiltersOpen: (open) => set({filtersOpen: open}),
      filters: {},
      setFilters: (params) => set({filters: params})
    }),);

export const useFiltersStore = create(
  (set) => ({
    filters: {},
    setFilters: (params) => set({filters: params}),
    cuisines: [],
    setCuisines: (values) => set({cusines: values}),
    ingredients: [],
    setIngredients: (values) => set({ingredients: values}),
    calories: [],
    setCalories: (values) => set({calories: values}),
    cookTimes: [],
    setCookTimes: (values) => set({cookTimes: values}),
  })
);
