import React from "react";
import ChatSession from "./ChatSession";
import { useChatStore } from "../../stateProvider/chatStore";
import NewSessionModal from "./modals/NewSessionModal";

function ChatSessions() {
  const { creating, setCreating, setShowSidebar, chatSessions } =
    useChatStore();

  return (
    <div className="relative mt-8 flex flex-col">
      {creating && <NewSessionModal />}
      <button
        className="rounded bg-primary-300 hover:opacity-80 py-2 font-semibold text-white mb-5"
        onClick={() => {
          setShowSidebar(false);
          setCreating(true);
        }}
      >
        New Chat
      </button>
      <div className="flex flex-row items-center justify-between text-xs">
        <span className="font-bold">Chat Sessions</span>
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary-40">
          {chatSessions && chatSessions.length}
        </span>
      </div>
      {chatSessions?.length === 0 && <div className="-mx-2 mt-5 ">No chat sessions</div>}
      <div
        className="-mx-2 mt-4 flex flex-col space-y-1 overflow-y-auto border-b-2  py-2 border-primary-400 "
        style={{ height: "calc(100vh - 320px)", minHeight: "80px" }}
      >
        {chatSessions?.map((session) => (
          <ChatSession key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
}

export default ChatSessions;
