import { create } from "zustand";

interface AuthStore {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  emailStore: string;
  setEmailStore: (emailStore: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuth: false,
  setIsAuth: (isAuth: boolean) => set({ isAuth: isAuth }),
  emailStore: "",
  setEmailStore: (emailStore: string) => set({ emailStore: emailStore }),
}));
