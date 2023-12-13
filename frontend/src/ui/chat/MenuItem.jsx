
function MenuItem({ action, name }) {
    return (
    <button
      className="w-full px-4 py-2 text-left hover:bg-primary-50"
      onClick={action}
    >
      {name}
    </button>
  );
}

export default MenuItem;
