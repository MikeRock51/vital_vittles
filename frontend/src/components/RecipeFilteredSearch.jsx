import axios from "axios";
import { useEffect, useState } from "react";
import { useFiltersStore, useRecipeStore } from "../stateProvider/recipeStore";
import RecipeFilters from "./RecipeFilters";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useUIStore } from "../stateProvider/uiStore";

function RecipeFilteredSearch({ submitFilters, loading }) {
  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    setTotalPages,
    recipes,
    setRecipes,
    resetRecipes,
    setFiltersOpen,
    filters,
    setFilters,
  } = useRecipeStore();
  const {filterBy, emptyFilters } = useFiltersStore();
  const [ search, setSearch ] = useState("");
  const { render, setRender } = useUIStore();

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   resetRecipes();

  //   if (!searchTerm && JSON.stringify(filterBy) === JSON.stringify(emptyFilters)) return;
  //   setCurrentPage(1);

  //   for (let key in filterBy ) {
  //     if (filterBy[key].length > 0) {
  //       setFilters({...filters, [key]: filterBy[key]})
  //     }
  //   }
  //   setRender(!render)
  // }

  return (
    <div className="md:p-0">
      <form className="flex flex-col gap-3 md:flex-row" onSubmit={submitFilters}>
        <div className="flex">
          <input
            type="text"
            placeholder="Search recipes"
            className="h-12 w-5/6 sm:w-auto rounded-l border-2 border-gray-500 px-3 focus:border-gray-400 focus:outline-none disabled:border-gray-500"
            disabled={loading}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              // setSearch(e.target.value);
            }}
          />
            <button
              type="button"
              className="px-3 py-1 bg-gray-500 text-primary-40 hover:opacity-75 disabled:bg-gray-500 border-r border-primary-40"
              title="Apply filters"
              onClick={() => setFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          <button
            type="submit"
            className="rounded-r bg-gray-500 px-3 py-1 font-semibold text-primary-40 hover:opacity-75 disabled:bg-gray-500"
            disabled={loading}
            title="Search"
          >
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </form>
      {/* <RecipeFilters /> */}
    </div>
  );
}

export default RecipeFilteredSearch;
