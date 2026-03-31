import React, { useState } from "react";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

import signupImage from "../../public/signup.png";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    userName: "Bob",
    email: "bob@example.com",
    password: "1234",
  });

  const { signUp, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-3 z-10">
      {/* <div className="relative w-full max-w-60xl md:h-[800px] h-[650px]"> */}
      <BorderAnimatedContainer>
        <div className=" w-full flex flex-col md:flex-row max-w-60xl min-h-[500px]">
          {/* Form cloumn - Left side*/}
          <div className="md:w-1/2 flex items-center justify-center p-8 md:border-r border-slate-600/30">
            <div className="w-full max-w-md">
              {/* Header */}
              <div className="text-center mb-8">
                <MessageCircleIcon className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                <h2 className="text-2xl font-bold mb-2 text-center text-slate-200">
                  Create an Account
                </h2>
                <p className="text-slate-400 text-center">
                  Join our community and start chatting today!
                </p>
              </div>
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Name */}
                <div>
                  <label className="auth-input-lable" htmlFor="userName">
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />
                      <input
                        className="input"
                        type="text"
                        value={formData.userName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            userName: e.target.value,
                          })
                        }
                        placeholder="John Doe"
                      />
                    </div>
                  </label>
                </div>
                {/* Email */}
                <div>
                  <label className="auth-input-lable" htmlFor="email">
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        className="input"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        placeholder="jon@example.com"
                      />
                    </div>
                  </label>
                </div>
                {/* Password */}
                <div>
                  <label className="auth-input-lable" htmlFor="password">
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        className="input"
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          })
                        }
                        placeholder="Enter your password"
                      />
                    </div>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  className="auth-btn"
                  type="submit"
                  disabled={isSigningUp}
                >
                  {isSigningUp ? (
                    <LoaderIcon className="w-full animate-spin h-5 text-center" />
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              {/* Footer */}
              <p className="text-slate-400 text-sm mt-4 text-center">
                Already have an account?{""}
                <Link to="/login" className="auth-link">
                  Log in
                </Link>
              </p>
            </div>
          </div>

          {/* Form column - Right side */}
          <div className="hidden md:flex md:w-1/2 bg-slate-800/30 items-center justify-center">
            <div>
              <img
                src={signupImage}
                alt="Signup"
                className="w-full max-w-sm mx-auto mb-2 h-auto object-cover rounded-lg"
              />
              <div className="text-center my-4">
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                  Welcome to VibeChat!
                </h3>
                <p className="text-slate-500 text-[12px] px-5 pb-2">
                  Connect with friends and the world around you. Sign up now and
                  start chatting!
                </p>
                <div className="flex justify-center gap-4">
                  <span className="auth-badge">Free</span>
                  <span className="auth-badge">Easy to Use</span>
                  <span className="auth-badge">Privacy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BorderAnimatedContainer>
      {/* </div> */}
    </div>
  );
};

export default SignupPage;
