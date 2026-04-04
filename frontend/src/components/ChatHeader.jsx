import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { XIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        setSelectedUser(null);
      }
    };
    window.addEventListener("keydown", handleEscapeKey);
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [setSelectedUser]);

  return (
    <>
      <div className="flex rounded-tr-lg justify-between bg-slate-900/90 items-cente border-b border-slate-700/50 max-h-15 px-6 flex-1">
        <div className="flex items-center space-x-3">
          <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
            <div className="w-10 rounded-full">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.userName}
              />
            </div>
          </div>

          <div>
            <h2 className="text-slate-200 text-sm font-medium">
              {selectedUser.userName}
            </h2>
            <p className="text-xs text-slate-400">
              {isOnline ? "Active now" : "Offline"}
            </p>
          </div>
        </div>

        <button onClick={() => setSelectedUser(null)}>
          <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
        </button>
      </div>
    </>
  );
};

export default ChatHeader;
