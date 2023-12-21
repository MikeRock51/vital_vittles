import axios from "axios";
import { create } from "zustand";

export const useRecipeStore = create(
    (set) => ({
      searchTerm: "",
      setSearchTerm: (term) => set({ searchTerm: term }),
      recipes: [],
      setRecipes: (data) => set({ recipes: data }),
      resetRecipes: () => set({ recipes: [] }),
      currentPage: 1,
      setCurrentPage: (page) => set({ currentPage: page}),
      totalPages: 2,
      setTotalPages: (page) => set({ totalPages: page}),
      filtersOpen: false,
      setFiltersOpen: (open) => set({filtersOpen: open}),
      filters: {},
      setFilters: (params) => set({filters: params}),
      resetFilters: () => set({filters: {}}), 
    }),);

export const useFiltersStore = create(
  (set) => ({
    filterBy: {
      cuisine: [],
      ingredients: [],
      calories_per_serving: [],
      cook_time_minutes: [],
    },
    setFilterBy: (params) => set({filters: params}),
    resetFilterBy: () => set({filterBy: {
      cuisine: [],
      ingredients: [],
      calories_per_serving: [],
      cook_time_minutes: [],
    }}),
    emptyFilters: {
      cuisine: [],
      ingredients: [],
      calories_per_serving: [],
      cook_time_minutes: [],
    },
    cuisines: [],
    setCuisines: (values) => set({cusines: values}),
    ingredients: [],
    setIngredients: (values) => set({ingredients: values}),
    calories_per_serving: [],
    setCalories: (values) => set({calories_per_serving: values}),
    cook_time_minutes: [],
    setCookTimes: (values) => set({cook_time_minutes: values}),
  })
);
