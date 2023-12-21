import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import Loader from "../ui/Loader";
import axios from "axios";
import Slideshow from "../components/Slideshow";

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
    <div className="mx-auto mt-10 px-4 py-16 sm:px-8 md:px-8 lg:px-12 bg-slate-100">
      <h1 className="mb-5 text-xl font-bold text-black sm:mb-10 sm:text-3xl md:tracking-widest lg:text-4xl">
        {foodDetails.data.name}
      </h1>
      {/* <div className="flex flex-col-reverse gap-12 lg:flex-row"> */}
      <div className="grid-cols-2 md:grid items-center">
        {/* <div className="w-full md:px-8 mb-8 md:mb-0"> */}
          {/* <img
            className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-primary-40 object-cover"
            src={foodDetails.data.dps[0]?.filePath}
            alt={foodDetails.data.name}
          /> */}
          <Slideshow images={foodDetails.data.dps} />
        {/* </div> */}

        <div className="relative mx-auto rounded-lg bg-primary-40 p-8 shadow-lg sm:px-12 w-full h-fit">
          <h4 className="absolute left-0 top-0 mb-8 w-full rounded-t-lg bg-primary-100 py-3 text-2xl font-bold">
            Dish Information
          </h4>
          <ul className="col-span-1 mt-10 grid-cols-2 text-left xs:grid sm:mt-5">
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
            <li className="col-span-2 mt-5 text-center">
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
