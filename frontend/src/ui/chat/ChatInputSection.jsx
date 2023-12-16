import { useState } from "react";
import AttachmentButton from "./AttachmentButton";
import { processChat } from "../../utils/ChatConnector";
import { useChatStore, usePChatStore } from "../../stateProvider/chatStore";
import { useUserStore } from "../../stateProvider/authStore";

function ChatInputSection() {
  const [message, setMessage] = useState("");
  const { currentChat, chatHistory, setChatHistory } = usePChatStore();
  const { authToken } = useUserStore();
  const { chatLoading, setChatLoading } = useChatStore();

  async function handleProcessChat(e) {
    e.preventDefault();
    setChatLoading(true);
    if (!message) return;

    setChatHistory([
      ...chatHistory,
      {content: message, role: "user", updatedAt: new Date().toISOString()},
    ]);

    setMessage("");
    const chat = await processChat(message, currentChat.id, authToken);
    if (chat) {
      setChatHistory([
        ...chatHistory,
        ...chat,
      ]);
    }
    setChatLoading(false);
    // setRender(!render);
  }

  return (
    <div className="flex h-16 w-full md:w-auto flex-row items-center rounded-xl bg-gray-200 px-4 fixed bottom-0 left-0 md:left-[260px]"
    style={{ minWidth: "calc(100vw - 265px)" }}
    >
      <div>
        <AttachmentButton />
      </div>
      <div className="relative ml-4 flex-grow">
        <form className="w-full" onSubmit={handleProcessChat}>
          <textarea
            type="text"
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-10 flex h-12 w-full resize-none overflow-hidden rounded-xl border pl-4 pt-3 focus:border-indigo-300 focus:outline-none"
            placeholder="Message Yishu..."
          />
          <button
            className="absolute right-0 top-0 mr-1 mt-2 -translate-y-1/2 transform disabled:text-gray-400 hover:text-primary-600 text-primary-200 md:mr-2"
            type="submit"
            disabled={chatLoading}
            // onClick={handleProcessChat}
          >
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
        </form>
      </div>
    </div>
  );
}

export default ChatInputSection;
