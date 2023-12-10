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
    <div className="mx-auto mt-10 rounded-2xl bg-slate-200 px-6 py-8 font-sans">
      <div className="flex gap-10">
        <img
          className="w-1/2 rounded-2xl"
          src="https://images.pexels.com/photos/11638817/pexels-photo-11638817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
        <div className=" leading-6 md:leading-8">
          <h1 className="py-4 text-3xl  font-bold md:tracking-widest">
            {foodDetails.data.name}
          </h1>
          <ul>
            <li>
              <span className="text-[1.1rem] font-bold ">Cusine</span>:{" "}
              {foodDetails.data.cuisine}
            </li>
            <li>
              <span className="text-[1.1rem] font-bold">
                Preparation Time(Minutes):{" "}
              </span>
              {foodDetails.data.prep_time_minutes}
            </li>
            <li>
              <span className="text-[1.1rem] font-bold">
                Cooking Time(minutes):{" "}
              </span>
              {foodDetails.data.cook_time_minutes}
            </li>
            <li>
              <span className="text-[1.1rem] font-bold">
                Total Time (minutes):{" "}
              </span>
              {foodDetails.data.total_time_minutes}
            </li>
            <li>
              <span className="text-[1.1rem] font-bold">
                Calories Per Serving:
              </span>
              {foodDetails.data.calories_per_serving}
            </li>
            <li>
              <span className="text-[1.1rem] font-bold">Serving Size:</span>
              {foodDetails.data.serving_size}
            </li>
            <li>
              <span className="text-[1.1rem] font-bold">Ingredients: </span>
              {foodDetails.data.ingredients}
            </li>
          </ul>
        </div>
      </div>
      <h2 className="mb-4 mt-6 text-center text-2xl font-semibold underline">
        Instructions
      </h2>
      <p>{foodDetails.data.instructions}</p>
      <button
        className="mt-10 text-blue-700 underline"
        onClick={() => navigate(-1)}
      >
        &larr; Go back
      </button>
    </div>
  );
}
