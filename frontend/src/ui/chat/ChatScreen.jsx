import React, { useEffect, useState } from "react";
import YishuChat from "./YishuChat";
import UserChat from "./UserChat";
import { useChatStore, usePChatStore } from "../../stateProvider/chatStore";
import { fetchSessionChats } from "../../utils/ChatConnector";
import { useUserStore } from "../../stateProvider/authStore";
import ChatInputSection from "./ChatInputSection";
import { useUIStore } from "../../stateProvider/uiStore";

function ChatScreen() {
  const { currentChat, chatHistory, setChatHistory } = usePChatStore();
  const { currentUser, authToken } = useUserStore();
  const [loading, setLoading] = useState(false);
  const { render } = useUIStore();
  const yishuMessage = {
    content: `Welcome, ${currentUser?.firstname}! My name is Yishu, the food and nutrition specialist bot for Vital Vittles. My expertise lies in providing assistance on African cuisines and various global dishes. Feel free to ask me anything related to food, nutrition, and health, and I'll provide expert guidance.`,
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
  }, [currentChat, setChatHistory]);

  return (
    <div className="flex h-full w-screen flex-auto flex-shrink-0 flex-col rounded-2xl py-4 sm:w-auto">
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
      <ChatInputSection />
    </div>
  );
}

export default ChatScreen;
