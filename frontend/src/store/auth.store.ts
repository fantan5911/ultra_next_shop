import { create } from "zustand";

interface AuthStore {
  avatarUrl: string | null;
  setAvatarUrl: (avatarUrl: string | null) => void;
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  emailStore: string;
  setEmailStore: (emailStore: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  avatarUrl: null,
  setAvatarUrl: (avatarUrl: string | null) => set({ avatarUrl: avatarUrl }),
  isAuth: false,
  setIsAuth: (isAuth: boolean) => set({ isAuth: isAuth }),
  emailStore: "",
  setEmailStore: (emailStore: string) => set({ emailStore: emailStore }),
}));
