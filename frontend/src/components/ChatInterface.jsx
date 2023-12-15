import React, { useEffect, useState } from "react";
import { useUserStore } from "../stateProvider/authStore";
import ChatSidebar from "../ui/chat/ChatSidebar";
import MobileChatSidebar from "../ui/chat/MobileChatSidebar";
import { useChatStore, usePChatStore } from "../stateProvider/chatStore";
import { createChatSession, getUserSessions } from "../utils/ChatConnector";
import ChatScreen from "../ui/chat/ChatScreen";

const BASE_URL = process.env.REACT_APP_API_URL;

function ChatUI() {
  const { currentUser, authToken } = useUserStore();
  const { setChatSessions } = useChatStore();
  const { currentChat, setChatHistory } = usePChatStore();

  async function fetchSessions() {
    const sessions = await getUserSessions(authToken);
    if (sessions) {
      if (currentChat && sessions.some(session => session.id === currentChat.id)) {
      const updatedSessions = [currentChat, ...sessions.filter(session => session.id !== currentChat.id)];
      setChatSessions(updatedSessions);
    } else {
      setChatSessions(sessions);
    }
  }
  }

  // console.log(currentChat);

  useEffect(() => {
    fetchSessions();
  }, [currentChat]);

  return (
    <div
      className='bg relative flex text-gray-800 antialiased'
      // style={{ minHeight: "100dvh", }}
    >
      <div className="relative flex h-full w-full flex-row">
        <ChatSidebar />
        <MobileChatSidebar />
        <div className="flex h-full flex-auto flex-col py-6 sm:p-6 bg-gray-100">
          {currentChat ? (
            <ChatScreen />
          ) : (
            <div className="my-auto text-2xl text-gray-400 sm:w-3/5 mx-auto">
              <p>👈🏻👈🏼👈🏽👈🏾👈🏿</p>
              Select a chat session from the sidebar or create one
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatUI;
