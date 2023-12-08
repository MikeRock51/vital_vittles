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
          `https://acr-api.mikerock.tech/api/v1/recipes/${id}`
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
    <div className="bg-slate-200 mt-10 py-8 font-sans px-6 mx-auto rounded-2xl">
      <div className="flex gap-10">
        <img
          className="w-1/2 rounded-2xl"
          src="https://images.pexels.com/photos/11638817/pexels-photo-11638817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
        <div className=" leading-6 md:leading-8">
          <h1 className="font-bold md:tracking-widest  text-3xl py-4">
            {foodDetails.data.name}
          </h1>
          <ul>
            <li>
              <span className="font-bold text-[1.1rem] ">Cusine</span>:{" "}
              {foodDetails.data.cuisine}
            </li>
            <li>
              <span className="font-bold text-[1.1rem]">
                Preparation Time(Minutes):{" "}
              </span>
              {foodDetails.data.prep_time_minutes}
            </li>
            <li>
              <span className="font-bold text-[1.1rem]">
                Cooking Time(minutes):{" "}
              </span>
              {foodDetails.data.cook_time_minutes}
            </li>
            <li>
              <span className="font-bold text-[1.1rem]">
                Total Time (minutes):{" "}
              </span>
              {foodDetails.data.total_time_minutes}
            </li>
            <li>
              <span className="font-bold text-[1.1rem]">
                Calories Per Serving:
              </span>
              {foodDetails.data.calories_per_serving}
            </li>
            <li>
              <span className="font-bold text-[1.1rem]">Serving Size:</span>
              {foodDetails.data.serving_size}
            </li>
            <li>
              <span className="font-bold text-[1.1rem]">Ingredients: </span>
              {foodDetails.data.ingredients}
            </li>
          </ul>
        </div>
      </div>
      <h2 className="text-center mt-6 font-semibold text-2xl underline mb-4">
        Instructions
      </h2>
      <p>{foodDetails.data.instructions}</p>
      <button
        className="mt-10 underline text-blue-700"
        onClick={() => navigate(-1)}
      >
        &larr; Go back
      </button>
    </div>
  );
}
