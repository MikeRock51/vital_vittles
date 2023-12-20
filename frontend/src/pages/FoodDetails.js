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
    <div className="mx-auto mt-14 rounded-2xl bg-slate-200 px-8 py-16 font-sans sm:px-6 md:px-8 lg:px-12">
      <div className="flex flex-col-reverse gap-12 md:flex-row">
        <img
          className="w-full rounded-2xl md:w-1/2 object-cover h-[600px]"
          src={foodDetails.data.dps[0]?.filePath}
          alt={foodDetails.data.name}
        />
        <div className="w-full">
          <div className="bg-gray-50 p-12 rounded-lg w-100">
            <p className="py-4 text-xl font-bold md:text-2xl md:tracking-widest lg:text-2xl text-orange-700">
              {foodDetails.data.name}
            </p>
            <ul className="text-left">
              <li className="mt-2">
                <span className="text-[1.1rem] font-bold">Cuisine:</span>{" "}
                {foodDetails.data.cuisine}
              </li>
              <li className="mt-2">
                <span className="text-[1.1rem] font-bold">
                  Preparation Time(Minutes):{" "}
                </span>
                {foodDetails.data.prep_time_minutes}
              </li>
              <li className="mt-2">
                <span className="text-[1.1rem] font-bold">
                  Cooking Time(minutes):{" "}
                </span>
                {foodDetails.data.cook_time_minutes}
              </li>
              <li className="mt-2">
                <span className="text-[1.1rem] font-bold">
                  Total Time (minutes):{" "}
                </span>
                {foodDetails.data.total_time_minutes}
              </li>
              <li className="mt-2">
                <span className="text-[1.1rem] font-bold">
                  Calories Per Serving:
                </span>
                {foodDetails.data.calories_per_serving}
              </li>
              <li className="mt-2">
                <span className="text-[1.1rem] font-bold">Serving Size:</span>
                {foodDetails.data.serving_size}
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
          <li key={index} className="list-disc pl-4">{instruction}</li>
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
