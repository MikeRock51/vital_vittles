import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatSessions from "./ChatSessions";
import SidebarToggler from "./SidebarToggler";

function MobileChatSidebar({ showSidebar, setShowSidebar }) {
  return (
    <div
      className={`sm:hidden fixed left-0 top-0 mt-14 z-10 h-full w-64  transform bg-white py-8 pl-6 pr-2 transition-transform duration-500 ease-in-out ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <ChatHeader />
      <ChatSessions />
      <SidebarToggler showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </div>
  );
}

export default MobileChatSidebar;
