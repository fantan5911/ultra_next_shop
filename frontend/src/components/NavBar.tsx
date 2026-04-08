'use client'

import Cookies from "js-cookie";
import Link from "next/link";
import {SearchInput} from "./serchInput";
import { PAGES } from "@/config/pages.config";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import authService from "@/service/auth.service";

export function NavBar() {
    const isAuth = useAuthStore(state => state.isAuth);
    const setIsAuth = useAuthStore(state => state.setIsAuth);
    useEffect(() => {
        const checkAuth = async () => {
            const auth = Cookies.get('auth');
            setIsAuth(auth === 'true');
        }
        checkAuth();
    }, [])
    return (
        <div className="flex items-center justify-center w-full py-5 bg-black  border-b border-b-white/20">
            <div className="w-[79%] gap-3 flex items-center justify-center">
                <Link className="font-extrabold text-2xl"
                href={PAGES.HOME}
                >MONO.</Link>
                <div className="w-full flex justify-center">
                    <SearchInput />
                </div>
                <div>
                    {isAuth ? (
                        <Link
                        href={PAGES.SMARTPHONE_CREATE}
                        className="px-5 py-2 text-black text-sm bg-white hover:bg-gray-200
                        transition-colors duration-100 w-[120%]
                        rounded-3xl cursor-pointer"
                        >Создать продукт</Link>
                    ) : (
                        
                        <Link
                        href={PAGES.LOGIN}
                        className="px-5 py-2 text-black text-sm bg-white hover:bg-gray-200
                        transition-colors duration-100
                        rounded-3xl cursor-pointer"
                        >Войти</Link>
                    )}
                </div>
            </div>
        </div>
    )
}