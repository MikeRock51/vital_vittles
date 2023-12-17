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

export const useFilters = create(
  (set) => ({
    filters: {},
    setFilters: (params) => set({filters: params}),
    cuisines: null,
    setCuisines: (values) => set({cusines: values}),
    ingredients: null,
    setIngredients: (values) => set({ingredients: values}),
    calories: null,
    setCalories: (values) => set({calories: values}),
    cookTimes: null,
    setCookTimes: (values) => set({cookTimes: values}),
  })
);
