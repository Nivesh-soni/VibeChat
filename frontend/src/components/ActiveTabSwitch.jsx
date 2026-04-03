import React from "react";
import { useChatStore } from "../store/useChatStore";

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();
  return (
    <div className="tabs tabs-boxed bg-transparent p-2 m-2 flex">
      <button
        className={`tab flex-1 ${activeTab === "chats" ? "bg-cyan-500/20 rounded-md text-cyan-400" : "text-slate-400"}`}
        onClick={() => setActiveTab("chats")}
      >
        Chats
      </button>
      <button
        className={`tab flex-1 ${activeTab === "contacts" ? "bg-cyan-500/20 rounded-md text-cyan-400" : "text-slate-400"}`}
        onClick={() => setActiveTab("contacts")}
      >
        Contacts
      </button>
    </div>
  );
};

export default ActiveTabSwitch;
