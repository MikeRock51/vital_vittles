import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import MenuItem from "./MenuItem";
import RenameModal from "./modals/RenameModal";
import DeleteModal from "./modals/DeleteModal";

function ChatSession() {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);
  const [renaming, setRenaming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  function handleRename() {
    setRenaming(true);
    closeMenu();
  }

  function handleDelete() {
    setDeleting(true);
    closeMenu();
  }

  return (
    <div className="border-0` relative inline-flex w-full items-end rounded-xl hover:bg-primary-40 active:bg-primary-40">
      {renaming && (
        <RenameModal renaming={renaming} setRenaming={setRenaming} />
      )}
      {deleting && <DeleteModal deleting={deleting} setDeleting={setDeleting} />}
      <button
        className="relative mr-auto flex flex-row items-center p-2"
        onClick={() => console.log("Selecting Session")}
      >
        <div className="ml-2 truncate text-sm font-semibold">
          Butter or Mayonnaise?
        </div>
      </button>
      <button
        className="absolute right-2 top-1/2 ml-2 -translate-y-1/2 transform"
        onClick={toggleMenu}
        onBlur={(e) => {
          if (!e.relatedTarget) {
            closeMenu();
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
