import React, { useState } from "react";
import { useUserStore } from "../stateProvider/authStore";
import YishuChat from "../ui/chat/YishuChat";
import UserChat from "../ui/chat/UserChat";
import ChatSidebar from "../ui/chat/ChatSidebar";
import MobileChatSidebar from "../ui/chat/MobileChatSidebar";

const BASE_URL = process.env.REACT_APP_API_URL;

function ChatUI() {
  const { currentUser } = useUserStore();
  const [ showSidebar, setShowSidebar ] = useState(false);

  return (
    <div
      className="flex text-gray-800 antialiased"
      style={{ height: "calc(100vh - 60px)", minHeight: "calc(100vh - 20px)" }}
    >
      <div className="flex h-full w-full flex-row">
        <ChatSidebar />
        {/* <MobileChatSidebar />
        <button
          className="text-primary-600 focus:outline-none lg:hidden"
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
        </button> */}
        <div className="flex h-full flex-auto flex-col py-6 sm:p-6">
          <div className="flex h-full flex-auto flex-shrink-0 flex-col rounded-2xl bg-gray-100 p-4">
            <div className="mb-4 flex h-full flex-col overflow-x-auto">
              <div className="flex h-full flex-col">
                <div className="grid grid-cols-6 gap-y-2 sm:grid-cols-12">
                  <YishuChat />
                  <UserChat />
                  <YishuChat />
                  <UserChat />
                  <YishuChat />
                  <UserChat />

                  <YishuChat />
                  <UserChat />
                </div>
              </div>
            </div>
            <div className="flex h-16 w-full flex-row items-center rounded-xl bg-white px-4">
              <div>
                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="ml-4 flex-grow">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="flex h-10 w-full rounded-xl border pl-4 focus:border-indigo-300 focus:outline-none"
                  />
                  <button className="absolute right-0 top-0 flex h-full w-12 items-center justify-center text-gray-400 hover:text-gray-600">
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
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="ml-4">
                <button className="flex flex-shrink-0 items-center justify-center rounded-xl bg-primary-500 px-4 py-1 text-white hover:bg-primary-600">
                  <span>Send</span>
                  <span className="ml-2">
                    <svg
                      className="-mt-px h-4 w-4 rotate-45 transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatUI;