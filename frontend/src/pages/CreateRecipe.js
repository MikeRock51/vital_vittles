import axios from "axios";
import { useState } from "react";
import { useRecipesContext } from "../context/RecipesContext";
import { useUserStore } from "../stateProvider/authStore";

export default function CreateRecipe() {
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [calories, setCalories] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const { dispatch } = useRecipesContext();
  const { authToken } = useUserStore();

  async function handleSubmit(e) {
    e.preventDefault();

    const recipe = {
      name,
      cuisine,
      cookingTime,
      totalTime,
      calories,
      servingSize,
      ingredients,
      instructions,
    };

    try {
      const token = authToken;

      const response = await axios.post(
        "https://acr-api.mikerock.tech/api/v1/recipes",
        recipe,
        {
          headers: {
            "auth-token": token,
          },
        },
      );

      dispatch({ type: "CREATE_RECIPES", payload: response });
      setName("");
      setCuisine("");
      setCookingTime("");
      setTotalTime("");
      setCalories("");
      setServingSize("");
      setIngredients("");
      setInstructions("");
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <div className="mx-auto mt-28 mt-8 max-w-xl rounded-lg bg-gray-100 p-4 shadow-md">
      <h2 className="mb-4 text-center text-xl font-bold">Create Your Recipe</h2>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="font-semibold sm:basis-40">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input grow"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="font-semibold sm:basis-40">Cuisine</label>
          <input
            type="text"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="input grow"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="font-semibold sm:basis-40">Cooking Time</label>
          <input
            type="number"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            className="input grow"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="font-semibold sm:basis-40">Total Time</label>
          <input
            type="number"
            value={totalTime}
            onChange={(e) => setTotalTime(e.target.value)}
            className="input grow"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="font-semibold sm:basis-40">Calories</label>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="input grow"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="font-semibold sm:basis-40">Serving Size</label>
          <input
            type="number"
            value={servingSize}
            onChange={(e) => setServingSize(e.target.value)}
            className="input grow"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="font-semibold sm:basis-40">Ingredients</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="input grow"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="font-semibold sm:basis-40">Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows="4"
            cols="50"
            className="input grow"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-orange-300 py-2 font-bold text-white hover:bg-orange-400 focus:outline-none focus:ring focus:ring-orange-400 focus:ring-offset-2"
        >
          Create
        </button>
      </form>
    </div>
  );
}

// import axios from "axios";
// import { useState } from "react";
// import { useRecipesContext } from "../context/RecipesContext";
// import { useUserStore } from "../stateProvider/authStore";

// export default function CreateRecipe() {
//   const [name, setName] = useState("");
//   const [cuisine, setCuisine] = useState("");
//   const [cookingTime, setCookingTime] = useState("");
//   const [totalTime, setTotalTime] = useState("");
//   const [calories, setCalories] = useState("");
//   const [servingSize, setServingSize] = useState("");
//   const [ingredients, setIngredients] = useState("");
//   const [instructions, setInstructions] = useState("");

//   const { dispatch } = useRecipesContext();
//   const { authToken } = useUserStore();

//   async function handleSubmit(e) {
//     e.preventDefault();

//     const recipe = {
//       name,
//       cuisine,
//       cookingTime,
//       totalTime,
//       calories,
//       servingSize,
//       ingredients,
//       instructions,
//     };

//     try {
//       const token = authToken;

//       const response = await axios.post(
//         "https://acr-api.mikerock.tech/api/v1/recipes",
//         recipe,
//         {
//           headers: {
//             "auth-token": token,
//           },
//         },
//       );

//       dispatch({ type: "CREATE_RECIPES", payload: response });
//       setName("");
//       setCuisine("");
//       setCookingTime("");
//       setTotalTime("");
//       setCalories("");
//       setServingSize("");
//       setIngredients("");
//       setInstructions("");
//     } catch (error) {
//       console.log("Error:", error);
//     }
//   }

//   return (
//     <div className="mx-auto mt-24 max-w-2xl rounded-2xl bg-slate-200 px-4 py-6">
//       <h2 className="mb-8 text-xl font-bold">Create Your Recipe</h2>

//       <form onSubmit={handleSubmit}>
//         <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
//           <label className="font-semibold sm:basis-40">Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="input grow"
//           />
//         </div>

//         <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
//           <label className="font-semibold sm:basis-40">Cuisine</label>
//           <input
//             type="text"
//             value={cuisine}
//             onChange={(e) => setCuisine(e.target.value)}
//             className="input grow"
//           />
//         </div>

//         <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
//           <label className="font-semibold sm:basis-40">Cooking Time</label>
//           <input
//             type="number"
//             value={cookingTime}
//             onChange={(e) => setCookingTime(e.target.value)}
//             className="input grow"
//           />
//         </div>

//         <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
//           <label className="font-semibold sm:basis-40">Total Time</label>
//           <input
//             type="number"
//             value={totalTime}
//             onChange={(e) => setTotalTime(e.target.value)}
//             className="input grow"
//           />
//         </div>

//         <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
//           <label className="font-semibold sm:basis-40">Calories</label>
//           <input
//             type="number"
//             value={calories}
//             onChange={(e) => setCalories(e.target.value)}
//             className="input grow"
//           />
//         </div>

//         <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
//           <label className="font-semibold sm:basis-40">Serving Size</label>
//           <input
//             type="number"
//             value={servingSize}
//             onChange={(e) => setServingSize(e.target.value)}
//             className="input grow"
//           />
//         </div>

//         <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
//           <label className="font-semibold sm:basis-40">Ingredients</label>
//           <input
//             type="text"
//             value={ingredients}
//             onChange={(e) => setIngredients(e.target.value)}
//             className="input grow"
//           />
//         </div>

//         <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
//           <label className="font-semibold sm:basis-40">Instructions</label>
//           <textarea
//             value={instructions}
//             onChange={(e) => setInstructions(e.target.value)}
//             rows="4"
//             cols="50"
//             className="input grow"
//           ></textarea>
//         </div>

//         <div>
//           <button className="mx-auto mt-6 rounded-lg bg-orange-300 px-7 py-2.5 text-center text-sm font-bold text-stone-800 outline-none drop-shadow-xl transition-colors duration-300 hover:bg-orange-400 focus:outline-none focus:ring focus:ring-orange-400 focus:ring-offset-2">
//             Create
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
