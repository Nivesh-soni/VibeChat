import React from "react";
import { LoaderIcon } from "lucide-react";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { useChatStore } from "../store/useChatStore";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatList from "../components/ChatList";
import ContactsList from "../components/ContactsList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="w-full flex items-center justify-center z-10">
      <BorderAnimatedContainer>
        <div className="relative w-full flex max-w-6xl h-[545px]">
          {/* Left Side */}
          <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col rounded-bl-lg rounded-tl-lg">
            <ProfileHeader />
            <ActiveTabSwitch />
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
              {activeTab === "chats" ? <ChatList /> : <ContactsList />}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm rounded-br-lg rounded-tr-lg">
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>
        </div>
      </BorderAnimatedContainer>
    </div>
  );
};

export default ChatPage;
