import { api } from "@/api/axios";
import authService from "@/service/auth.service";
import { AxiosResponse } from "axios";
import { create } from "zustand";


interface AuthStore {
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
}

export const useAuthStore = create<AuthStore>(set => ({
    isAuth: false,
    setIsAuth: (isAuth: boolean) => set({isAuth: isAuth})
}))