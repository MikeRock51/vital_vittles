import { useRecipesContext } from "../context/RecipesContext";

export default function SearchRecipe() {
  const { searchTerm, setSearchTerm, dispatch } = useRecipesContext();

  function handleSubmit(e) {
    e.preventDefault();

    if (!searchTerm) return;
    dispatch({ type: "SEARCH_RECIPES", payload: searchTerm });
    setSearchTerm("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search recipes"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input"
      />
    </form>
  );
}
