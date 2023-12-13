import Modal from "react-modal";

function DeleteModal({ deleting, setDeleting }) {
  function handleDelete(e) {
    e.preventDefault();
    alert("Handling Delete...");
  }

  return (
    <Modal
      isOpen={deleting}
      onRequestClose={() => setDeleting(false)}
      contentLabel="Delete Chat Topic"
      className="chatModal"
      overlayClassName="chatModalOverlay"
      appElement={document.getElementById("root")}
    >
      <div className="flex flex-col rounded-xl bg-primary-400 py-5">
        <h2 className="mx-auto mb-4 text-xl text-white md:text-2xl">
          Delete Chat Topic?
        </h2>
        <hr className="border-[red]" />
        <p className="max-w-4/5 mx-auto mt-4 px-5 text-yellow-200">
          Are you sure you want to delete this chat?
        </p>
        <div className="mt-6 flex flex-col xs:grid xs:grid-cols-2 ">
          <button
            className="mx-auto mb-2 w-3/5 rounded-lg bg-black py-1 text-primary-400 hover:bg-gray-800 xs:mb-0 xs:me-1 xs:ms-auto xs:block"
            onClick={() => setDeleting(false)}
          >
            Close
          </button>
          <button
            className="mx-auto w-3/5 rounded-lg bg-[red] py-1 text-white hover:bg-red-500 xs:me-auto xs:ms-1"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;
