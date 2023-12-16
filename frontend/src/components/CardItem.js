import { Link } from "react-router-dom";

export default function CardItem({ src, name, id }) {
  return (
    <li className="">
      <div className="max-w-sm rounded-md overflow-hidden  outline outline-1 outline-gray-200 font-sans p-8 bg-gray-50 h-96 w-96">
        <Link to={`/food/${id}`}>
          <img
            className="rounded-md object-cover h-60 w-80"
            src={src}
            alt={name}
          />
          <div className="font-bold text-lg mt-2 text-gray-600" >{name}</div>
        </Link>
      </div>

    </li>
  );
}
