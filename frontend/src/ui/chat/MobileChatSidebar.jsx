import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatSessions from "./ChatSessions";

function MobileChatSidebar({showSidebar, setShowSidebar}) {
  return (
    <div className={`w-5/6 sm:hidden flex flex-shrink-0 flex-col bg-white py-8 pl-6 pr-2 relative`}>
        <ChatHeader />
        <ChatSessions />
        <button
        className={`text-primary-600 focus:outline-none h-fit absolute -right-6`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <svg
          className="h-6 w-6 scale-x-[-1] transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      </div>
  );
}

export default MobileChatSidebar;
