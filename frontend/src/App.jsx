import React, { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast"

import ChatPage from "./pages/ChatPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore";
import PageLoader from "./components/PageLoader";

const App = () => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  const router = createBrowserRouter([
    {
      path: "/",
      element: authUser ? <ChatPage /> : <Navigate to={"/login"} />,
    },
    {
      path: "/sign-up",
      element: !authUser ? <SignupPage /> : <Navigate to={"/"} />,
    },
    {
      path: "/login",
      element: !authUser ? <LoginPage /> : <Navigate to={"/"} />,
    },
  ]);

  if(isCheckingAuth) {
    return <PageLoader/>
  }

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px]" />

      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
