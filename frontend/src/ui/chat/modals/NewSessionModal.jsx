import { useState } from "react";
import Modal from "react-modal";
import { useChatStore } from "../../../stateProvider/chatStore";
import { useUserStore } from "../../../stateProvider/authStore";

function NewSessionModal() {
  const { creating, setCreating } = useChatStore();
  const [topic, setTopic] = useState("");
  const { authToken } = useUserStore();

  function handleSubmit(e) {
    e.preventDefault();
    // alert("Handling rename...");
  }

  return (
    <Modal
      isOpen={creating}
      onRequestClose={() => setCreating(false)}
      contentLabel="New Chat Session"
      className="chatModal"
      appElement={document.getElementById("root")}
      overlayClassName="chatModalOverlay"
    >
      <form className="bg-primary-400 rounded-xl flex flex-col py-5">
        <h2 className="text-xl md:text-2xl text-white mx-auto mb-4">Create New Chat Session</h2>
        <hr/>
        <input
          type="text"
          placeholder="Enter Session Topic"
          onChange={(e) => setTopic(e.target.value)}
          value={topic}
          className="mx-auto mt-4 w-4/5 x-2 h-10 rounded-xl ps-2"
        />
        <div className="flex flex-col xs:grid xs:grid-cols-2 mt-4 ">
            <button className="hidden xs:block w-3/5 mx-auto xs:ms-auto xs:me-1 py-1 bg-black hover:bg-gray-800 text-primary-400 rounded-lg" onClick={() => setCreating(false)}>Cancel</button>
            <button className="w-3/5 mx-auto xs:me-auto xs:ms-1 py-1 bg-black hover:bg-gray-800 text-green-400 rounded-lg" onClick={handleSubmit}>Proceed</button>
        </div>
      </form>
    </Modal>
  );
}

export default NewSessionModal;
