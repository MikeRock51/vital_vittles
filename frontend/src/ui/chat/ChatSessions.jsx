import React from "react";
import ChatSession from "./ChatSession";

function ChatSessions() {
  return (
    <div className="mt-8 flex flex-col">
      <div className="flex flex-row items-center justify-between text-xs">
        <span className="font-bold">Chat Sessions</span>
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary-40">
          4
        </span>
      </div>
      <div className="-mx-2 mt-4 flex flex-col space-y-1 overflow-y-auto " style={{ height: 'calc(100vh - 380px)', minHeight: '80px' }}>
        <ChatSession />
        <ChatSession />
        <ChatSession />
        <ChatSession />
      </div>
      <button className="bg-primary-300 text-white py-2 rounded mt-3 sm:mt-8" onClick={() => alert("Just Do It!")}>New Session</button>
    </div>
  );
}

export default ChatSessions;
