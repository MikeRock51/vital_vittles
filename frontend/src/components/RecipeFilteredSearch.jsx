import axios from "axios";
import { useEffect, useState } from "react";
import { useFiltersStore, useRecipeStore } from "../stateProvider/recipeStore";
import RecipeFilters from "./RecipeFilters";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useUIStore } from "../stateProvider/uiStore";
import { toTitleCase } from "../utils/Utilities";

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
  const { filterBy, emptyFilters } = useFiltersStore();
  const [search, setSearch] = useState("");
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
    <div className="sm:flex md:p-0">
      <form
        className="flex flex-col gap-3 md:flex-row"
        onSubmit={submitFilters}
      >
        <div className="flex">
          <input
            type="text"
            placeholder="Search recipes"
            className="h-12 w-5/6 rounded-l border-2 border-gray-500 px-3 focus:border-gray-400 focus:outline-none disabled:border-gray-500 sm:w-auto"
            disabled={loading}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              // setSearch(e.target.value);
            }}
          />
          <button
            type="button"
            className="border-r border-primary-40 bg-gray-500 px-3 py-1 text-primary-40 hover:opacity-75 disabled:bg-gray-500"
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
      <div className="m-auto text-sm ml-5 text-left text-gray-500">
        {/* {searchTerm && <h2 className="text-lg">Results for {searchTerm}</h2>} */}
        {JSON.stringify(filters) !== "{}" && (
          <h2>
            Filtered by:{" "}
            {Object.keys(filters).map((key, index) => (
              <span key={index}>
                {toTitleCase(key)}s {"=>"} {toTitleCase(filters[key].join(", "))}
              </span>
            ))}
          </h2>
        )}
      </div>
    </div>
  );
}

export default RecipeFilteredSearch;
