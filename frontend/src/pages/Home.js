import Toast from "../providers/ToastProvider";
import toast from "react-hot-toast";

import CardItem from "../components/CardItem";
import { useEffect, useState } from "react";
import Loader from "../ui/Loader";
import axios from "axios";
// import { useRecipesContext } from "../context/RecipesContext";
import SearchRecipe from "../components/SearchRecipe";
import { useRecipeStore } from "../stateProvider/recipeStore";
import RecipeFilteredSearch from "../components/RecipeFilteredSearch";
// toast.success("Toast setup successfully!");

const API_URL = "https://acr-api.mikerock.tech/api/v1/recipes";
const PAGE_SIZE = 10;

export default function Home() {
  // const [recipes, setRecipes] = useState({ data: [] });
  // const [currentPage, setCurrentPage] = useState(1);
  const {
    recipes,
    setRecipes,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
  } = useRecipeStore();
  const [fetch, setFetch] = useState(false);

  // const { recipes, currentPage, dispatch } = useRecipesContext();

  const handleLoadMore = () => {
    // dispatch({ type: "NEXT_PAGE", payload: currentPage + 1 });
    setCurrentPage(currentPage + 1);
  };

  // console.log(searchTerm);
  const fetchData = async () => {
    setSearchTerm("");
    try {
      const response = await axios.get(
        `${API_URL}?page=${currentPage}&pageSize=${PAGE_SIZE}${
          searchTerm ? `&search=${searchTerm}` : ""
        })}`,
      );
      const newData = response?.data?.data;
      console.log(newData);
      setCurrentPage(Number(response?.data?.page));
      setRecipes([...recipes, ...newData]);
    } catch (error) {
      console.log("Error fetching recipes", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);
  
  return (
    <div className="mt-20">
      <Toast />

      <h1 className="mb-4 text-center text-3xl font-bold">
        Amazing Recipes in Africa
      </h1>
      {/* <SearchRecipe /> */}
      <RecipeFilteredSearch />

      {recipes ? (
        <div className="flex flex-col items-center">
          <ul className="flex flex-wrap items-center justify-center gap-20 ">
            {recipes?.map((recipe) => (
              <CardItem key={recipe.id} id={recipe.id} name={recipe.name} />
            ))}
          </ul>

          <button
            className="mx-auto mt-6 rounded-lg bg-orange-300 px-7 py-2.5 text-center text-sm font-bold text-stone-800 outline-none drop-shadow-xl transition-colors duration-300 hover:bg-orange-400 focus:outline-none focus:ring focus:ring-orange-400 focus:ring-offset-2"
            onClick={handleLoadMore}
          >
            Load More...
          </button>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
