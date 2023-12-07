import Toast from "../providers/ToastProvider";
import toast from "react-hot-toast";

import CardItem from "../components/CardItem";
import { useEffect, useState } from "react";
import Loader from "../ui/Loader";
import axios from "axios";
toast.success("Toast setup successfully!");

const API_URL = "https://acr-api.mikerock.tech/api/v1/recipes";

export default function Home() {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data;
        console.log(data);
        setRecipes(data);
      } catch (error) {
        console.log("Error fetching recipes", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="mt-5">
      <Toast />
      <h1 className="text-3xl font-bold mb-4 text-center">
        Amazing Recipes in Africa
      </h1>
      {recipes ? (
        <ul className="flex gap-20 flex-wrap ">
          {recipes.data.map((recipe) => (
            <CardItem key={recipe.id} id={recipe.id} name={recipe.name} />
          ))}
        </ul>
      ) : (
        <Loader />
      )}
    </div>
  );
}
