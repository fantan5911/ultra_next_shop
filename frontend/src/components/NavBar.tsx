"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect } from "react";
import { SearchInput } from "./serchInput";
import { PAGES } from "@/config/pages.config";
import { useAuthStore } from "@/store/auth.store";

export function NavBar() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const setIsAuth = useAuthStore((state) => state.setIsAuth);

  useEffect(() => {
    const auth = Cookies.get("auth");
    setIsAuth(auth === "true");
  }, [setIsAuth]);

  return (
    <header className="w-full border-b border-white/20 bg-black">
      <div className="mx-auto flex h-16 w-[79%] items-center justify-between gap-4">
        
        <Link
          href={PAGES.HOME}
          className="text-2xl font-extrabold text-white"
        >
          MONO.
        </Link>

        <div className="flex flex-1 justify-center">
          <div className="w-full max-w-xl">
            <SearchInput />
          </div>
        </div>

        <div className="flex items-center">
          {isAuth ? (
            <Link
              href={PAGES.SMARTPHONE_CREATE}
              className="px-5 py-2 text-sm text-black bg-white rounded-3xl
              hover:bg-gray-200 transition-colors duration-150"
            >
              Создать продукт
            </Link>
          ) : (
            <Link
              href={PAGES.LOGIN}
              className="px-5 py-2 text-sm text-black bg-white rounded-3xl
              hover:bg-gray-200 transition-colors duration-150"
            >
              Войти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}