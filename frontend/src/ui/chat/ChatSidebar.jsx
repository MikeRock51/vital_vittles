import React from "react";
import ChatHeader from "./ChatHeader";
import ChatSessions from "./ChatSessions";

function ChatSidebar() {
  return (
    <div className="hidden md:flex w-64 flex-shrink-0 flex-col bg-white py-8 pl-6 pr-2">
      <ChatHeader />
      <ChatSessions />
    </div>
  );
}

export default ChatSidebar;
