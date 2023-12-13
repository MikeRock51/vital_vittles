import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

function ChatSession() {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleRename = () => {
    closeMenu();
  };

  const handleDelete = () => {
    closeMenu();
  };

  return (
    <div className="relative inline-flex items-end">
      <button
        className="flex flex-row items-center w-full rounded-xl p-2 hover:bg-primary-40 active:bg-primary-40 border relative"
        onClick={toggleMenu}
        onBlur={() => {
          setTimeout(() => closeMenu(), 100);
        }}
      >
        <div className="ml-2 text-sm font-semibold truncate">Butter or Mayonnaise?</div>
        <div className="ml-2 absolute right-2 top-1/2 transform -translate-y-1/2">
          <FontAwesomeIcon icon={faEllipsisH} />
        </div>
      </button>
      {menuVisible && (
        <div
          className="absolute right-0 mt-2 bg-white border rounded shadow-md"
          ref={menuRef}
        >
          <div className="py-1">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={handleRename}
            >
              Rename
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatSession;
