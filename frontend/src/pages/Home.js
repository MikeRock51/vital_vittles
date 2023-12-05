import Toast from "../providers/ToastProvider";
import toast from "react-hot-toast";
import data from "../dummyData/recipes.json";
import CardItem from "../components/CardItem";

toast.success("Toast setup successfully!");

export default function Home() {
  return (
    <div>
      <Toast />
      <h1 className="text-5xl mb-4">Vital Vittles</h1>
      <ul className="flex gap-20 flex-wrap ">
        {data.data.map((recipe) => (
          <CardItem key={recipe.id} name={recipe.name} />
        ))}
      </ul>
    </div>
  );
}
