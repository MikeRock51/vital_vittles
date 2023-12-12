import axios from "axios";
// import { useRecipesContext } from "../context/RecipesContext";
import { useState } from "react";
import { useRecipeStore } from "../stateProvider/recipeStore";

export default function SearchRecipe() {
  // const { dispatch } = useRecipesContext();
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

      // dispatch({ type: "SEARCH_RECIPES", payload: searchData });
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
    <form className="space-x-1 " onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search recipes"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        className="input"
      />
      <button
        className="rounded-3xl border  px-3 py-1.5 hover:bg-orange-200 focus:outline-none focus:ring focus:ring-orange-200 focus:ring-offset-2"
        type="submit"
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
