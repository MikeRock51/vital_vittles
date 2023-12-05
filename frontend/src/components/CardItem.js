export default function CardItem({ src, name }) {
  return (
    <li className="max-w-sm rounded overflow-hidden shadow-lg ">
      <img
        className="w-full"
        src="https://images.pexels.com/photos/11638817/pexels-photo-11638817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt={name}
      />
      <div className="font-bold text-xl mt-2">{name}</div>
    </li>
  );
}
