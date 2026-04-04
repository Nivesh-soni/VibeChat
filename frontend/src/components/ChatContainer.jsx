import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import MessageLoadingSkeleton from "../components/MessageLoadingSkeleton";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading } =
    useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const [text, setText] = useState("");

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-4">
        {isMessagesLoading ? (
          <MessageLoadingSkeleton />
        ) : messages.length === 0 ? (
          <NoChatHistoryPlaceholder
            name={selectedUser.userName}
            setText={setText}
          />
        ) : (
          <div className="max-w-3xl mx-auto space-y-3">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble relative rounded-t-xl ${msg.senderId === authUser._id ? "bg-cyan-600 text-white rounded-bl-xl" : "bg-slate-800 text-slate-200 rounded-br-xl"}`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Shared"
                      className="rounded-lg h-48 object-cover"
                    />
                  )}
                  {msg.text && <p className=""> {msg.text}</p>}

                  <p
                    className={`text-xs mt-1 opacity-75 flex items-center gap-1 ${msg.senderId === authUser._id ? "text-gray-200" : "text-gray-400"}`}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                    {msg.isOptimistic && (
                      <span className="text-yellow-400 animate-pulse">
                        {" "}
                        (Sending...)
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        )}
      </div>
      <MessageInput text={text} setText={setText} />
    </>
  );
};

export default ChatContainer;
