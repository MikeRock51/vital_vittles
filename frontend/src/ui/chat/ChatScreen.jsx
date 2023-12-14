import React, { useEffect, useState } from "react";
import YishuChat from "./YishuChat";
import UserChat from "./UserChat";
import { useChatStore } from "../../stateProvider/chatStore";
import { fetchSessionChats } from "../../utils/ChatConnector";
import { useUserStore } from "../../stateProvider/authStore";

function ChatScreen() {
  const { currentChat } = useChatStore();
  const { currentUser, authToken } = useUserStore();
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const yishuMessage = {
    content: `Welcome, ${currentUser?.firstname}! My name is Yishu. Your AI
    assistant for all things nutrition. How may I be of help today?`,
  };

  async function getChatHistory() {
    setLoading(true);
    const chats = await fetchSessionChats(currentChat.id, authToken);
    if (chats) {
      setChatHistory(chats);
    }
    setLoading(false);
  }

  useEffect(() => {
    getChatHistory();
    console.log(chatHistory);
  }, [currentChat]);

  return (
    <div className="flex h-full w-screen flex-auto flex-shrink-0 flex-col rounded-2xl p-4 sm:w-auto">
      <div className="mb-4 flex h-full flex-col overflow-x-auto">
        <div className="flex h-full flex-col">
          <div className="grid grid-cols-6 gap-y-2 sm:grid-cols-12">
            <YishuChat chatInfo={yishuMessage} id={1} />
            {chatHistory?.map((chat) => {
              return chat.role === "assistant" ? (
                <YishuChat id={chat.id} chatInfo={chat} />
              ) : (
                chat.role === "user" && (
                  <UserChat id={chat.id} chatInfo={chat} />
                )
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex h-16 w-full flex-row items-center rounded-xl bg-white px-4">
        <div>
          <button className="flex items-center justify-center text-primary-100 hover:text-gray-600">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              ></path>
            </svg>
          </button>
        </div>
        <div className="relative ml-4 flex-grow">
          <div className="w-full">
            <textarea
              type="text"
              rows={2}
              className="min-h-10 flex h-12 w-full resize-none overflow-hidden rounded-xl border pl-4 pt-3 focus:border-indigo-300 focus:outline-none"
              placeholder="Message Yishu"
            />
            <button className="absolute right-0 top-0 mr-1 mt-2 -translate-y-1/2 transform text-primary-600">
              <span className="ml-2">
                <svg
                  className="-mt-px h-6 w-6 rotate-45 transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
