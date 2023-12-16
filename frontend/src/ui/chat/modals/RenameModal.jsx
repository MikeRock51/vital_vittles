import { useState } from "react";
import Modal from "react-modal";
import { updateChatSession } from "../../../utils/ChatConnector";
import { useUserStore } from "../../../stateProvider/authStore";
import { useChatStore } from "../../../stateProvider/chatStore";

function RenameModal({ renaming, setRenaming, session }) {
  const [newTopic, setNewTopic] = useState(session.topic);
  const { authToken } = useUserStore();
  const { chatSessions, setChatSessions } = useChatStore();
  const [loading, setLoading] = useState(false);

  async function handleRename(e) {
    e.preventDefault();
    setLoading(true)
    if (session.topic === newTopic) {
      setRenaming(false);
      setLoading(false)
      return;
    }
    const updatedSession = await updateChatSession(newTopic, authToken, session.id);
    if (updatedSession) {
      const filteredSessions = chatSessions.filter((chat) => chat.id !== session.id);
      setChatSessions([updatedSession, ...filteredSessions]);
    }
    setRenaming(false);
    setLoading(false);
  }

  return (
    <Modal
      isOpen={renaming}
      onRequestClose={() => setRenaming(false)}
      contentLabel="Change Chat Topic"
      className="chatModal"
      overlayClassName="chatModalOverlay"
      appElement={document.getElementById("root")}
    >
      <form className="flex flex-col rounded-xl bg-primary-400 py-5">
        <h2 className="mx-auto mb-4 text-xl text-white md:text-2xl">
          Change Chat Topic
        </h2>
        <hr />
        <input
          type="text"
          onChange={(e) => setNewTopic(e.target.value)}
          value={newTopic}
          className="x-2 mx-auto mt-4 h-10 w-4/5 rounded-xl ps-2"
        />
        <div className="mt-4 flex flex-col xs:grid xs:grid-cols-2 ">
          <button
            className="modalCloseButton"
            onClick={() => setRenaming(false)}
            disabled={loading}
          >
            Close
          </button>
          <button
            className="modalActionButton"
            onClick={handleRename}
            disabled={loading}
          >
            {loading ? "Renaming..." : "Rename"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default RenameModal;
