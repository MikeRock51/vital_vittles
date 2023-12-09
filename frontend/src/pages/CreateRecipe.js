import { useState } from "react";

export default function CreateRecipe() {
  const [name, setName] = useState(null);
  const [cuisine, setCuisine] = useState("");
  const [cookingTime, setCookingTime] = useState(null);
  const [totalTime, setTotalTime] = useState(null);
  const [calories, setCalories] = useState(null);
  const [servingSize, setServingSize] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [instructions, setInstructions] = useState(null);

  return (
    <div>
      <form>
        <label>Name</label>
        <input
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Cuisine</label>
        <input
          type="cusine"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
        />
        <label>Cooking Time</label>
        <input
          type="cookingTime"
          value={cookingTime}
          onChange={(e) => setCookingTime(e.target.value)}
        />
        <label>Total Time</label>
        <input
          type="totalTime"
          value={totalTime}
          onChange={(e) => setTotalTime(e.target.value)}
        />
        <label>Calories</label>
        <input
          type="calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        <label>Serving Size</label>
        <input
          type="servingSize"
          value={servingSize}
          onChange={(e) => setServingSize(e.target.value)}
        />
        <label>ingredients</label>
        <input
          type="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <textarea
          id="instructions"
          name="instructions"
          rows="4"
          cols="50"
        ></textarea>
      </form>
    </div>
  );
}
