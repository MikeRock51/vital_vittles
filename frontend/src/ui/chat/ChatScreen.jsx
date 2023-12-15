import React, { useEffect, useRef } from "react";
import YishuChat from "./YishuChat";
import UserChat from "./UserChat";
import { useChatStore, usePChatStore } from "../../stateProvider/chatStore";
import { fetchSessionChats } from "../../utils/ChatConnector";
import { useUserStore } from "../../stateProvider/authStore";
import ChatInputSection from "./ChatInputSection";
import { LoaderIcon } from "react-hot-toast";

function ChatScreen() {
  const { currentChat, chatHistory, setChatHistory } = usePChatStore();
  const { currentUser, authToken } = useUserStore();
  const { chatLoading, setChatLoading } = useChatStore();
  const yishuMessage = {
    content: `Welcome, ${currentUser?.firstname}! My name is Yishu, the food and nutrition specialist bot for Vital Vittles. My expertise lies in providing assistance on African cuisines and various global dishes. Feel free to ask me anything related to food, nutrition, and health, and I'll provide expert guidance.`,
  };
  const chatContainerRef = useRef(null);

  async function getChatHistory() {
    setChatLoading(true);
    const chats = await fetchSessionChats(currentChat.id, authToken);
    if (chats) {
      setChatHistory(chats);
    }
    setChatLoading(false);
  }

  useEffect(() => {
    getChatHistory();
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    console.log(chatHistory);
  }, [currentChat, setChatHistory]);

  return (
    <div className="flex h-full w-screen flex-auto flex-shrink-0 flex-col rounded-2xl py-4 sm:w-auto">
      <div className="mb-4 flex h-full flex-col overflow-x-auto" ref={chatContainerRef}>
        <div className="flex h-full flex-col">
          <div className="grid grid-cols-6 gap-y-2 sm:grid-cols-12">
            <YishuChat chatInfo={yishuMessage} key={12168} />
            {chatHistory?.map((chat) => {
              return chat.role === "assistant" ? (
                <YishuChat key={chat.id} chatInfo={chat} />
              ) : (
                chat.role === "user" && (
                  <UserChat key={chat.id} chatInfo={chat} />
                )
              );
            })}
          </div>
          <div className="my-8 ml-10">
            {chatLoading && <LoaderIcon color="green" />}
          </div>
        </div>
      </div>
      <ChatInputSection />
    </div>
  );
}

export default ChatScreen;
