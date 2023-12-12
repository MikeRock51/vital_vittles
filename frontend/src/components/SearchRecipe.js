import axios from "axios";
import { useRecipesContext } from "../context/RecipesContext";
import { useState } from "react";

export default function SearchRecipe({ fetchData, setSearchTerm, searchTerm }) {
  const { dispatch } = useRecipesContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // async function handleSubmit(e) {
  //   e.preventDefault();

  //   if (!searchTerm) return;
  //   console.log(searchTerm);

  //   try {
  //     setLoading(true);
  //     setError(null);

  //     const response = await axios.get(
  //       `https://acr-api.mikerock.tech/api/v1/recipes?search=${searchTerm}`,
  //     );

  //     const searchData = response.data;
  //     console.log(searchData);

  //     dispatch({ type: "SEARCH_RECIPES", payload: searchData });

  //     setSearchTerm("");
  //   } catch (error) {
  //     console.error("Error fetching recipes", error);
  //     setError("An error occurred while fetching recipes. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  return (
    <form onSubmit={fetchData}>
      <input
        type="text"
        placeholder="Search recipes"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          sessionStorage.setItem("searchTerm", e.target.value);
          console.log(searchTerm);
        }}
        className="input"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
