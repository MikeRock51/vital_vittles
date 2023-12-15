function MenuItem({ action, name }) {
    return (
    <button
      className="w-full px-4 py-2 text-sm text-left hover:bg-yellow-100"
      onClick={action}
    >
      {name}
    </button>
  );
}

export default MenuItem;
