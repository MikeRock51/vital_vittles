import React from "react";

import ChatSession from "./ChatSession";

function MobileChatSidebar() {
  return (
    <div className="flex w-full flex-shrink-0 flex-col bg-white py-8 pl-6 pr-2">
        <button
              className="text-white focus:outline-none lg:hidden"
            //   onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6"
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
      <div className="flex h-12 w-full flex-row items-center justify-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-50 text-primary-300">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          ></path>
        </svg>
      </div>
      <div className="ml-2 text-2xl font-bold">Yishu</div>
    </div>
    <div className="mt-8 flex flex-col">
      <div className="flex flex-row items-center justify-between text-xs">
        <span className="font-bold">Chat Sessions</span>
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-300">
          4
        </span>
      </div>
      <div className="-mx-2 mt-4 flex flex-col space-y-1 overflow-y-auto" style={{ height: 'calc(100vh - 380px)', minHeight: '80px' }}>
        <ChatSession />
        <ChatSession />
        <ChatSession />
        <ChatSession />
        <ChatSession />
        <ChatSession />
        <ChatSession />
        <ChatSession />
      </div>
      <button className="bg-primary-300 text-white py-2 rounded mt-3 sm:mt-8" onClick={() => alert("Just Do It!")}>New Session</button>
    </div>
    </div>
  );
}

export default MobileChatSidebar;
