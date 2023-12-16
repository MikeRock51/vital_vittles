import axios from "axios";
import { useState } from "react";
import { useRecipeStore } from "../stateProvider/recipeStore";
import RecipeFilters from "./RecipeFilters";

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
  } = useRecipeStore();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!searchTerm) return;
    console.log(searchTerm);

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `https://acr-api.mikerock.tech/api/v1/recipes?page=1&pageSize=10&search=${searchTerm}`,
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
    <div className="mb-5 px-2 md:p-0">
      <form
        className="flex flex-col gap-3 md:ml-5 md:flex-row"
        onSubmit={handleSubmit}
      >
        <div className="flex">
          <input
            type="text"
            placeholder="Search recipes"
            className="h-10 w-3/5 rounded-l border-2 border-yellow-500 px-3 focus:border-yellow-200 focus:outline-none disabled:border-gray-500 md:w-5/6"
            disabled={loading}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <button
            type="submit"
            className="w-2/5 rounded-r bg-yellow-500 px-2 py-0 font-semibold text-white hover:opacity-75 disabled:bg-gray-500 md:px-3 md:py-1"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>
      <RecipeFilters />
    </div>
  );
}

export default RecipeFilteredSearch;
