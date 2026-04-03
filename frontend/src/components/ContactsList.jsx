import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import NoChatsFound from "./NoChatsFound";
import UsersLoadingSkeleton from "./UserLoadingSkeleton";

const ContactsList = () => {
  const { getAllContacts, allContacts, isUsersLoading, setSelectedUser } =
    useChatStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (allContacts.length === 0) return <NoChatsFound />;
  return (
    <div className="overflow-y-auto">
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors mb-2"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar avatar-online`}>
              <div className="size-12 rounded-full">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.userName}
                />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">
              {contact.userName}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactsList;
