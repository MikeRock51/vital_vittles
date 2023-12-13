import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import MenuItem from "./MenuItem";
import RenameModal from "./modals/RenameModal";
import DeleteModal from "./modals/DeleteModal";
import { useChatStore } from "../../stateProvider/chatStore";

function ChatSession() {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);
  const [renaming, setRenaming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { showSidebar, setShowSidebar } = useChatStore();

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
    <div className="border-0 relative inline-flex w-full items-end rounded-xl">
      {renaming && (
        <RenameModal renaming={renaming} setRenaming={setRenaming} />
      )}
      {deleting && <DeleteModal deleting={deleting} setDeleting={setDeleting} />}
      <button
        className="relative w-full mr-auto flex flex-row items-center p-2 hover:bg-yellow-100 active:bg-yellow-100"
        onClick={() => console.log("Selecting Session")}
      >
        <div className="ml-2 truncate text-sm font-semibold">
          Butter or Mayonnaise?
        </div>
      </button>
      <button
        className="absolute right-2 top-1/2 mx-4 -translate-y-1/2 transform"
        onClick={toggleMenu}
        onBlur={(e) => {
          if (!e.relatedTarget) {
            setMenuVisible(false);
          }
        }}
      >
        <FontAwesomeIcon icon={faEllipsisH} />
      </button>
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
