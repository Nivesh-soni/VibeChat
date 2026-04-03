import { create } from "zustand";
import { axiosInstance } from "../config/axios.config.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isProfileUpdating: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/getProfile");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in authCheck", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      console.log("Full Error Object:", error.response?.data); // इसे चेक करें
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      console.log("Error Message:", errorMessage); // इसे चेक करें
      toast.error(errorMessage);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged-in successfully");
    } catch (error) {
      console.log("Full Error Object:", error.response?.data); // इसे चेक करें
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      console.log("Error Message:", errorMessage); // इसे चेक करें
      toast.error(errorMessage);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
      console.log("Logout Error:", error);
    }
  },

  updateProfilePic : async(data) => {
    set({isProfileUpdating: true})
    try {
      const res = await axiosInstance.put('/auth/update-profile', data)
      set({authUser: res.data})
      toast.success("Profile picture updated successfully")
    } catch (error) {
      toast.error("Failed to update profile picture");
    }finally{
      set({isProfileUpdating: false})
    }
  },

}));
