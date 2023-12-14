import { useState } from "react";
import AttachmentButton from "./AttachmentButton";
import { processChat } from "../../utils/ChatConnector";
import { useChatStore } from "../../stateProvider/chatStore";
import { useUserStore } from "../../stateProvider/authStore";

function ChatInputSection() {
  const [message, setMessage] = useState("");
  const { currentChat, setCurrentChat } = useChatStore();
  const { authToken } = useUserStore();

  async function handleProcessChat(e) {
    e.preventDefault();
    const chat = await processChat(message, currentChat.id, authToken);
    if (chat) {
      setCurrentChat((prev) => ({
        ...prev,
        content: [prev.content, chat],
      }));
    }
  }

  return (
    <div className="mt-8 flex h-16 w-full flex-row items-center rounded-xl bg-white px-4">
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
            placeholder="Message Yishu"
          />
          <button
            className="absolute right-0 top-0 mr-1 mt-2 -translate-y-1/2 transform text-primary-600 hover:text-primary-200"
            type="submit"
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
