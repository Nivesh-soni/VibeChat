import React from "react";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { useAuthStore } from "../store/useAuthStore";
import { LoaderIcon } from "lucide-react";

const ChatPage = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <>
      <BorderAnimatedContainer>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-slate-200">
            Welcome {authUser.userName}
          </h1>

          <button
            onClick={logout}
            style={{ width: 70 }}
            className="auth-btn"
            type="submit"
          >
            Logout
          </button>
        </div>
      </BorderAnimatedContainer>
    </>
  );
};

export default ChatPage;
