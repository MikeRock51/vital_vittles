import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import Loader from "../ui/Loader";
import axios from "axios";

export default function FoodDetails() {
  const { id } = useParams();
  const [foodDetails, setFoodDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://acr-api.mikerock.tech/api/v1/recipes/${id}`,
        );
        const data = response.data;
        console.log(data);
        setFoodDetails(data);
      } catch (error) {
        console.log("Error fetching food details", error);
      }
    };

    fetchData();
  }, [id]);

  if (!foodDetails) return <Loader />;

  return (
    <div className="mx-auto mt-10 px-4 py-16 sm:px-8 md:px-8 lg:px-12">
      <h1 className="mb-5 sm:mb-10 text-xl font-bold text-black sm:text-3xl md:tracking-widest lg:text-4xl">
        {foodDetails.data.name}
      </h1>
      <div className="flex flex-col-reverse gap-12 md:flex-row">
        <img
          className="h-[600px] w-full rounded-2xl object-cover md:w-1/2"
          src={foodDetails.data.dps[0]?.filePath}
          alt={foodDetails.data.name}
        />
        <div className="w-full">
          <div className="w-100 shadow-lg bg-primary-40 rounded-lg p-8 sm:px-12 relative">
            <h4 className="text-2xl font-bold bg-primary-100 w-full rounded-t-lg absolute top-0 left-0 py-3 mb-8">Dish Information</h4>
            <ul className="xs:grid grid-cols-2 text-left col-span-1 mt-10 sm:mt-5">
              <li className="mt-5 text-center">
                <h5 className="recipeInfo">Cuisine:</h5>
                <p>{foodDetails.data.cuisine}</p>
              </li>
              <li className="mt-5 text-center">
                <h5 className="recipeInfo">Prep Time:</h5>
                <p>{foodDetails.data.prep_time_minutes} Mins</p>
              </li>
              <li className="mt-5 text-center">
                <h5 className="recipeInfo">Cooking Time:</h5>
                <p>{foodDetails.data.cook_time_minutes} Mins</p>
              </li>
              <li className="mt-5 text-center">
                <h5 className="recipeInfo">Total Time:</h5>
                <p>{foodDetails.data.total_time_minutes} Mins</p>
              </li>
              <li className="mt-5 text-center">
                <h5 className="recipeInfo">Calories:</h5>
                <p>{foodDetails.data.calories_per_serving} (KCal) Per Serving</p>
              </li>
              <li className="mt-5 text-center">
                <h5 className="recipeInfo">Serving Size:</h5>
                <p>{foodDetails.data.serving_size}</p>
              </li>
              <li className="mt-5 col-span-2 text-center">
                <h5 className="recipeInfo">Nutritional Values:</h5>
                <p>Coming soon...</p>
              </li>
            </ul>
          </div>

          <div className="p-6">
            <ul>
              <li className="mt-5 text-left">
                <span className=" text-[1.1rem] font-bold ">Ingredients: </span>
                <ul className=" list-disc pl-4 text-left">
                  {foodDetails.data.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <h2 className="mb-4 mt-16 text-center text-xl font-semibold  md:text-2xl lg:text-3xl">
        Step by Step Instructions
      </h2>
      <ul className="list-item text-left text-sm md:text-base lg:text-lg">
        {foodDetails.data.instructions.map((instruction, index) => (
          <li key={index} className="list-disc pl-4">
            {instruction}
          </li>
        ))}
      </ul>

      <button
        className="mt-6 text-blue-700 underline"
        onClick={() => navigate(-1)}
      >
        &larr; Go back
      </button>
    </div>

    // <div className="mx-auto mt-10 rounded-2xl bg-slate-200 px-6 py-8 font-sans">
    //   <div className="flex gap-10 md:flex-wrap">
    //     <img
    //       className="rounded-2xl  sm:w-1/2 "
    //       src="https://images.pexels.com/photos/11638817/pexels-photo-11638817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    //     />
    //     <div className="leading-6 md:leading-8">
    //       <h1 className="py-4 text-3xl  font-bold md:tracking-widest">
    //         {foodDetails.data.name}
    //       </h1>
    //       <ul>
    //         <li>
    //           <span className="text-[1.1rem] font-bold ">Cusine</span>:{" "}
    //           {foodDetails.data.cuisine}
    //         </li>
    //         <li>
    //           <span className="text-[1.1rem] font-bold">
    //             Preparation Time(Minutes):{" "}
    //           </span>
    //           {foodDetails.data.prep_time_minutes}
    //         </li>
    //         <li>
    //           <span className="text-[1.1rem] font-bold">
    //             Cooking Time(minutes):{" "}
    //           </span>
    //           {foodDetails.data.cook_time_minutes}
    //         </li>
    //         <li>
    //           <span className="text-[1.1rem] font-bold">
    //             Total Time (minutes):{" "}
    //           </span>
    //           {foodDetails.data.total_time_minutes}
    //         </li>
    //         <li>
    //           <span className="text-[1.1rem] font-bold">
    //             Calories Per Serving:
    //           </span>
    //           {foodDetails.data.calories_per_serving}
    //         </li>
    //         <li>
    //           <span className="text-[1.1rem] font-bold">Serving Size:</span>
    //           {foodDetails.data.serving_size}
    //         </li>
    //         <li>
    //           <span className="text-[1.1rem] font-bold">Ingredients: </span>
    //           {foodDetails.data.ingredients}
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    //   <h2 className="mb-4 mt-6 text-center text-2xl font-semibold underline">
    //     Instructions
    //   </h2>
    //   <p>{foodDetails.data.instructions}</p>
    //   <button
    //     className="mt-10 text-blue-700 underline"
    //     onClick={() => navigate(-1)}
    //   >
    //     &larr; Go back
    //   </button>
    // </div>
  );
}
