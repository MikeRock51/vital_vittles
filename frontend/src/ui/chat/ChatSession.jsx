import React, { useState, useRef } from 'react';

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
    // Implement the rename logic here
    closeMenu();
  };

  const handleDelete = () => {
    // Implement the delete logic here
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
          {/* Horizontal three dots icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 12h2m2 0h2m2 0h2m-6 0h2m2 0h2m-6 0h2m2 0h2m2 0h2m2 0h2m-6 0h2m2 0h2m2 0h2m2 0h2m-6 0h2m2 0h2m2 0h2m-6 0h2m2 0h2m2 0h2m2 0h2m-6 0h2m2 0h2m2 0h2m2 0h2m-6 0h2m2 0h2m2 0h2"
            />
          </svg>
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
