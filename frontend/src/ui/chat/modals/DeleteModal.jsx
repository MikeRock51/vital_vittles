import { useState } from "react";
import Modal from "react-modal";

function DeleteModal({ deleting, setDeleting }) {
  const [newTopic, setNewTopic] = useState("Butter or Mayonnaise");

  function handleDelete(e) {
    e.preventDefault();
    alert("Handling Delete...");
  }

  return (
    <Modal
      isOpen={deleting}
      onRequestClose={() => setDeleting(false)}
      contentLabel="Delete Chat Topic"
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6 xs:w-4/6 sm:w-3/5 lg:w-2/5"
      appElement={document.getElementById("root")}
    >
      <div className="bg-primary-400 rounded-xl flex flex-col py-5">
        <h2 className="text-xl md:text-2xl text-white mx-auto mb-4">Delete Chat Topic?</h2>
        <hr className="border-[red]"/>
        <p className="max-w-4/5 mx-auto px-5 mt-4 text-yellow-200">Are you sure you want to delete this chat?</p>
        <div className="flex flex-col xs:grid xs:grid-cols-2 mt-6 ">
            <button className="xs:block w-3/5 mx-auto xs:ms-auto xs:me-1 py-1 bg-black hover:bg-gray-800 text-primary-400 rounded-lg mb-2 xs:mb-0" onClick={() => setDeleting(false)}>Close</button>
            <button className="w-3/5 mx-auto xs:me-auto xs:ms-1 py-1 bg-[red] hover:bg-red-500 text-white rounded-lg" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;
