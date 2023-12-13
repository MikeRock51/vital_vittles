import { useState } from "react";
import Modal from "react-modal";
import { useChatStore } from "../../../stateProvider/chatStore";
import { useUserStore } from "../../../stateProvider/authStore";
import { createChatSession } from "../../../utils/ChatConnector";

function NewSessionModal() {
  const { creating, setCreating, chatSessions, setChatSessions } =
    useChatStore();
  const [topic, setTopic] = useState("");
  const { authToken } = useUserStore();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const session = await createChatSession(topic, authToken);
    if (session) {
      setChatSessions([...chatSessions, ...session]);
      setCreating(false);
    }
    setLoading(false);
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
      <form className="flex flex-col rounded-xl bg-primary-400 py-5">
        <h2 className="mx-auto mb-4 text-xl text-white md:text-2xl">
          Create New Chat Session
        </h2>
        <hr />
        <input
          type="text"
          placeholder="Enter Session Topic"
          onChange={(e) => setTopic(e.target.value)}
          value={topic}
          className="x-2 mx-auto mt-4 h-10 w-4/5 rounded-xl ps-2"
        />
        <div className="mt-4 flex flex-col xs:grid xs:grid-cols-2 ">
          <button
            className="mx-auto disabled:bg-gray-800 hidden w-3/5 rounded-lg bg-black py-1 text-primary-400 hover:bg-gray-800 xs:me-1 xs:ms-auto xs:block"
            onClick={() => setCreating(false)}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="mx-auto disabled:bg-gray-800 w-3/5 rounded-lg bg-black py-1 text-green-400 hover:bg-gray-800 xs:me-auto xs:ms-1"
            onClick={handleSubmit}
            disabled={loading}
          >
            Proceed
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default NewSessionModal;
