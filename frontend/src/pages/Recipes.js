import Toast from "../providers/ToastProvider";
import toast from "react-hot-toast";

import CardItem from "../components/CardItem";
import { useEffect, useState } from "react";
import Loader from "../ui/Loader";
import axios from "axios";
// import { useRecipesContext } from "../context/RecipesContext";
import SearchRecipe from "../components/SearchRecipe";
import { useFiltersStore, useRecipeStore } from "../stateProvider/recipeStore";
import RecipeFilteredSearch from "../components/RecipeFilteredSearch";
import RecipeFilters from "../components/RecipeFilters";
import { useUIStore } from "../stateProvider/uiStore";
import { fetchRecipes } from "../utils/DataFetcher";
// toast.success("Toast setup successfully!");

const API_URL = "https://acr-api.mikerock.tech/api/v1/recipes";

export default function Recipes() {
  // const [recipes, setRecipes] = useState({ data: [] });
  // const [currentPage, setCurrentPage] = useState(1);
  const {
    recipes,
    setRecipes,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    setTotalPages,
    filters,
    setFilters,
    totalPages,
  } = useRecipeStore();
  const { filterBy, emptyFilters } = useFiltersStore();
  const [fetch, setFetch] = useState(false);
  const { render, setRender } = useUIStore();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getRecipes() {
    setError(null);
    setLoading(true);
    const recipeData = await fetchRecipes(currentPage, searchTerm, filters);
    if (recipeData) {
      setRecipes(recipeData.recipes);
      setCurrentPage(recipeData.page);
      setTotalPages(recipeData.totalPages);
    }
    setLoading(false)
  }

  useEffect(() => {
    getRecipes();
    window.scrollTo(0, 0);
  }, [render]);

  // console.log(recipes)
  console.log(currentPage, searchTerm, filters);

  return (
    <div className="mt-20">
      <Toast />
      {/* <RecipeFilteredSearch /> */}
      <RecipeFilters
        fetchRecipes={fetchRecipes}
        loading={loading}
        setLoading={setLoading}
        setError={setError}
      />
      {loading && <Loader />}
      {!loading && recipes?.length > 0 ? (
        <div className="mt-10 flex flex-col items-center">
          <ul className="flex flex-wrap items-center justify-center gap-10 lg:gap-x-20 ">
            {recipes?.map((recipe) => (
              <CardItem
                key={recipe.id}
                name={recipe.name}
                id={recipe.id}
                src={recipe.dps[0]?.filePath}
              />
            ))}
          </ul>

          <div className="my-12">
            {currentPage > 1 && (
              <button
                className="mx-8 my-3 rounded-lg bg-orange-300 px-7 py-2.5 text-center text-sm font-bold text-stone-800 outline-none drop-shadow-xl transition-colors duration-300 hover:bg-orange-400 focus:outline-none focus:ring focus:ring-orange-400 focus:ring-offset-2"
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                  setRender(!render);
                }}
              >
                Prev Page
              </button>
            )}
            {totalPages > currentPage && (
              <button
                className="mx-8 my-3 rounded-lg bg-orange-300 px-7 py-2.5 text-center text-sm font-bold text-stone-800 outline-none drop-shadow-xl transition-colors duration-300 hover:bg-orange-400 focus:outline-none focus:ring focus:ring-orange-400 focus:ring-offset-2"
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                  setRender(!render);
                }}
              >
                Next Page
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-40 text-xl">No match found!</div>
      )}
    </div>
  );
}
