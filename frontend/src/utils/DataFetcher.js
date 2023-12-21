import axios from "axios";
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_URL;

export async function GetUserDP(token) {
    try {
      const response = await axios.get(`${API_URL}/users/dp`, {
        headers: { "auth-token": token },
      });
      console.log(response)
      console.log("User DP retrieved successfully!");
      return response.data.url;
    } catch (error) {
      console.log(error);
      return false;
    }
  }


export async function fetchRecipes(currentPage, searchTerm, filters) {
    try {
      const response = await axios.get(
        `${API_URL}/recipes?page=${currentPage}&search=${searchTerm}&filter_by=${JSON.stringify(
          filters,
        )}`,
      );

      const recipes = response?.data?.data;
      console.log("recipes", response);

      const page = Number(response?.data?.page);
      const totalPages = Number(response?.data?.total_pages);
      return { recipes, page, totalPages }
    } catch (error) {
      console.error("Error fetching recipes", error);
      toast.error("An error occurred while fetching recipes. Please try again.");
    }
  }
