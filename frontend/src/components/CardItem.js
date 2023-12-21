import { Link } from "react-router-dom";

export default function CardItem({ src, name, id }) {
  return (
    <li className="">
      <div className="w-68 h-68 mx-auto bg-primary-40">
        <Link to={`/food/${id}`}>
          <img
            className="m-auto rounded-md object-cover"
            src={src}
            alt={name}
          />
        </Link>
      </div>
      <div className="w-60 text-lg px-2 text-gray-600" >{name}</div>
    </li>
  );
}
