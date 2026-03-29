import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const ChatPage = () => {
  const { authUser, isLoggedIn, login } = useAuthStore();
  console.log(authUser)
  console.log(isLoggedIn)

  return (
    <>
      <div>ChatPage</div>
      <button className="z-1000" onClick={login}>Click me</button>
    </>
  );
};

export default ChatPage;
