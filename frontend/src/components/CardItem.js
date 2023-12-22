import { Link } from "react-router-dom";

export default function CardItem({ src, name, id }) {
  return (
    <li className="h-[310px] border-b shadow rounded-xl">
      <div className="">
        <Link to={`/food/${id}`}>
          <img
            className="m-auto w-[250px] h-[250px] rounded-md object-cover mb-auto"
            src={src}
            alt={name}
          />
        </Link>
      </div>
      <div className="w-60 mx-auto text-lg px-2 pb-2  text-primary-900 my-auto" >{name}</div>
    </li>
  );
}
