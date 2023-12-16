import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import MenuItem from "./MenuItem";
import RenameModal from "./modals/RenameModal";
import DeleteModal from "./modals/DeleteModal";
import { useChatStore, usePChatStore } from "../../stateProvider/chatStore";

function ChatSession({ session }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);
  const [renaming, setRenaming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { setShowSidebar } = useChatStore();
  const { currentChat, setCurrentChat } = usePChatStore();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  function handleRename() {
    setShowSidebar(false);
    setRenaming(true);
    setMenuVisible(false);
  }

  function handleDelete() {
    setShowSidebar(false);
    setDeleting(true);
    setMenuVisible(false);
  }

  return (
    <div className={`border-0 relative inline-flex items-end hover:bg-primary-40 rounded-lg w-11/12 ${currentChat?.id === session?.id ? "bg-yellow-100 hover:bg-yellow-100" : ""}`}>
      {renaming && (
        <RenameModal renaming={renaming} setRenaming={setRenaming} session={session} />
      )}
      {deleting && <DeleteModal deleting={deleting} setDeleting={setDeleting} session={session} />}
      <button
        className='relative w-5/6 mr-auto flex flex-row items-center p-2'
        onClick={() => {
          setCurrentChat(session);
          setShowSidebar(false);
        }}
      >
        <div className="ml-2 truncate text-sm font-semibold">
          {session.topic}
        </div>
      </button>
      {currentChat?.id === session?.id && <button
        className="absolute right-2 top-1/2 mx-2 -translate-y-1/2 transform"
        onClick={toggleMenu}
        onBlur={(e) => {
          if (!e.relatedTarget) {
            setMenuVisible(false);
          }
        }}
      >
        <FontAwesomeIcon icon={faEllipsisH} size="lg" />
      </button>}
      {menuVisible && (
        <div
          className="absolute right-0 top-0 z-10 mt-2 rounded-lg border bg-white shadow-md"
          ref={menuRef}
        >
          <div className="">
            <MenuItem action={handleRename} name="Rename" />
            <MenuItem action={handleDelete} name="Delete" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatSession;
