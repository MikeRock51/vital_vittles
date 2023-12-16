import { Link } from "react-router-dom";

export default function CardItem({ src, name, id }) {
  return (
    <li className="">
      <div className="max-w-sm rounded-md overflow-hidden  outline outline-1 outline-gray-200 font-sans p-8 bg-gray-50 h-96">
        <Link to={`/food/${id}`}>
          <img
            className="w-full rounded-md object-cover h-60"
            src="https://images.pexels.com/photos/11638817/pexels-photo-11638817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt={name}
          />
          <div className="font-bold text-lg mt-2 text-gray-600" >{name}</div>
        </Link>
      </div>

    </li>
  );
}
