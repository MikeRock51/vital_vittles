import { useState } from "react";
import Modal from "react-modal";

function RenameModal({ renaming, setRenaming }) {
  const [newTopic, setNewTopic] = useState("Butter or Mayonnaise");

  function handleRename(e) {
    e.preventDefault();
    alert("Handling rename...");
  }

  return (
    <Modal
      isOpen={renaming}
      onRequestClose={() => setRenaming(false)}
      contentLabel="Change Chat Topic"
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6 xs:w-4/6 sm:w-3/5 lg:w-2/5"
      appElement={document.getElementById("root")}
    >
      <form className="bg-primary-400 rounded-xl flex flex-col py-5">
        <h2 className="text-xl md:text-2xl text-white mx-auto mb-4">Change Chat Topic</h2>
        <hr/>
        <input
          type="text"
          onChange={(e) => setNewTopic(e.target.value)}
          value={newTopic}
          className="mx-auto mt-4 w-4/5 x-2 h-10 rounded-xl ps-2"
        />
        <div className="flex flex-col xs:grid xs:grid-cols-2 mt-4 ">
            <button className="hidden xs:block w-3/5 mx-auto xs:ms-auto xs:me-1 py-1 bg-black hover:bg-gray-800 text-primary-400 rounded-lg" onClick={() => setRenaming(false)}>Close</button>
            <button className="w-3/5 mx-auto xs:me-auto xs:ms-1 py-1 bg-black hover:bg-gray-800 text-primary-400 rounded-lg" onClick={handleRename}>Rename</button>
        </div>
      </form>
    </Modal>
  );
}

export default RenameModal;
