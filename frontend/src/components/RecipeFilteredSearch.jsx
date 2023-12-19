import axios from "axios";
import { useState } from "react";
import { useFiltersStore, useRecipeStore } from "../stateProvider/recipeStore";
import RecipeFilters from "./RecipeFilters";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

function RecipeFilteredSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    recipes,
    setRecipes,
    setFiltersOpen,
  } = useRecipeStore();
  const {filterBy, emptyFilters } = useFiltersStore();
  const filters = {};

  async function handleSubmit(e) {
    e.preventDefault();

    // console.log(filterBy, emptyFilters);

    if (!searchTerm && JSON.stringify(filterBy) === JSON.stringify(emptyFilters)) return;
    console.log(searchTerm);

    try {
      setLoading(true);
      setError(null);

      for (let key in filterBy ) {
        if (filterBy[key].length > 0) {
          filters[key] = filterBy[key];
        }
      }

      console.log(filters)

      const response = await axios.get(
        `https://acr-api.mikerock.tech/api/v1/recipes?page=${currentPage}&search=${searchTerm}&filter_by=${JSON.stringify(filters)}`,
      );

      const searchData = response?.data?.data;
      console.log("search", response?.data);

      setCurrentPage(Number(response?.data?.page));
      setRecipes([...searchData]);
    } catch (error) {
      console.error("Error fetching recipes", error);
      setError("An error occurred while fetching recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="md:p-0">
      <form className="flex flex-col gap-3 md:flex-row" onSubmit={handleSubmit}>
        <div className="flex">
          <input
            type="text"
            placeholder="Search recipes"
            className="h-10 rounded-l border-2 border-gray-500 px-3 focus:border-gray-400 focus:outline-none disabled:border-gray-500"
            disabled={loading}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
            <button
              type="button"
              className="px-3 py-1 bg-gray-500 text-primary-40 hover:opacity-75 disabled:bg-gray-500 border-r border-primary-40"
              title="Apply filterBy"
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
            {/* {loading ? "Searching..." : "Search"} */}
            {/* <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" /> */}
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </form>
      {/* <RecipeFilters /> */}
    </div>
  );
}

export default RecipeFilteredSearch;
