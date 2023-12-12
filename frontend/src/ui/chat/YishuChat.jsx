import React from "react";
import { useUserStore } from "../../stateProvider/authStore";

function YishuChat() {
  const { currentUser } = useUserStore();
  return (
    <div className="col-start-1 col-end-8 rounded-lg p-3">
      <div className="flex flex-row items-center">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
          <img
            className="relative h-auto"
            src="/assets/chef.svg"
            alt="Chef illustration icon"
          />
        </div>
        <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-left text-sm shadow">
          <div>
            Welcome, {currentUser.firstname}! My name is Yishu. Your AI
            assistant for all things nutrition. How may I be of help today?
          </div>
          <div className="absolute bottom-0 right-0 -mb-5 mr-2 text-xs text-gray-500">
            2 mins ago
          </div>
        </div>
      </div>
    </div>
  );
}

export default YishuChat;
