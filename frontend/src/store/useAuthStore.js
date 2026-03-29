import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  authUser: { name: "Nivesh", _id: 123, age: 20 },
  isLoggedIn: false,
  login: () => {
    console.log("We just logged in");
    set({ isLoggedIn: true });
  },
}));
