"use client";

import { Plus, ShoppingCart, LogOut, Search } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./serchInput";
import { PAGES } from "@/config/pages.config";
import { useAuthStore } from "@/store/auth.store";
import { useEffect, useState } from "react";
import authService from "@/service/auth.service";
import { useRouter } from "next/navigation";

export function NavBar() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const Logout = async () => {
    const response = await authService.Logout();
    if (response === true) {
      setIsAuth(false);
      router.push(PAGES.HOME);
    }
  }

  useEffect(() => {
    setMounted(true);
    async function checkAuth() {
      const response = await authService.checkAuth() as boolean;
      setIsAuth(!!response);
    }
    checkAuth();
  }, [setIsAuth]);

  const handleSearchClick = () => {
    router.push(PAGES.HOME);
  };

  return (
    <>
      <header className="w-full border-b border-white/20 bg-black fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto flex h-16 w-full px-4 sm:px-6 md:px-8 lg:w-[79%] items-center justify-between gap-2 sm:gap-4">
          <div className="sm:w-[25%]">
            <Link
              href={PAGES.HOME}
              className="text-xl sm:text-2xl font-extrabold text-white whitespace-nowrap"
            >
              MONO.
            </Link>
          </div>

          <div className="hidden sm:flex sm:w-[50%] justify-center">
            <div className="w-full max-w-xl">
              <SearchInput />
            </div>
          </div>

          <div className="hidden sm:flex sm:w-[25%] gap-3 md:gap-5 justify-end items-center">
            {!mounted ? (
              <Link
                href={PAGES.LOGIN}
                className="px-4 md:px-5 py-2 text-sm text-black bg-white rounded-3xl
                hover:bg-gray-200 transition-colors duration-150 whitespace-nowrap"
              >
                Войти
              </Link>
            ) : isAuth ? (
              <>
                <Link
                  href={PAGES.SMARTPHONE_CREATE}
                  className="flex items-center gap-1 px-3 md:px-4 py-2 text-sm font-semibold text-black bg-white rounded-2xl
                  border border-transparent hover:bg-black hover:border-white hover:text-white
                  transition-colors duration-150 whitespace-nowrap"
                >
                  <Plus size={18} strokeWidth={2} />
                  <span className="hidden xl:inline">Публикация</span>
                </Link>
                <Link
                  href={PAGES.CART}
                  className="text-white hover:text-white/70"
                >
                  <ShoppingCart size={22} strokeWidth={2} />
                </Link>
                <button className="cursor-pointer" onClick={Logout}>
                  <LogOut className="text-white hover:text-white/70" size={20} />
                </button>
              </>
            ) : (
              <Link
                href={PAGES.LOGIN}
                className="px-4 md:px-5 py-2 text-sm border border-white text-black bg-white rounded-3xl
                hover:bg-black hover:border-white hover:text-white transition-colors duration-150 whitespace-nowrap"
              >
                Войти
              </Link>
            )}
          </div>

          <div className="flex sm:hidden">
          </div>
        </div>
      </header>

      <div className="h-16" />

      {mounted && isAuth && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-white/20 z-40">
          <div className="flex justify-around items-center py-2">
            <Link
              href={PAGES.HOME}
              className="flex flex-col items-center gap-1 text-white py-2 px-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-[10px]">Главная</span>
            </Link>
            
            <button
              onClick={handleSearchClick}
              className="flex flex-col items-center gap-1 text-white py-2 px-3"
            >
              <Search size={20} strokeWidth={2} />
              <span className="text-[10px]">Поиск</span>
            </button>
            
            <Link
              href={PAGES.SMARTPHONE_CREATE}
              className="flex flex-col items-center gap-1 text-white py-2 px-3"
            >
              <Plus size={20} strokeWidth={2} />
              <span className="text-[10px]">Создать</span>
            </Link>
            
            <Link
              href={PAGES.CART}
              className="flex flex-col items-center gap-1 text-white py-2 px-3"
            >
              <ShoppingCart size={20} strokeWidth={2} />
              <span className="text-[10px]">Корзина</span>
            </Link>
            
            <button
              onClick={Logout}
              className="flex flex-col items-center gap-1 text-white py-2 px-3"
            >
              <LogOut size={20} strokeWidth={2} />
              <span className="text-[10px]">Выйти</span>
            </button>
          </div>
        </div>
      )}

      {mounted && !isAuth && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-white/20 z-40 p-4">
          <Link
            href={PAGES.LOGIN}
            className="flex items-center justify-center w-full px-4 py-3 text-sm text-black bg-white rounded-3xl"
          >
            Войти
          </Link>
        </div>
      )}

      {mounted && isAuth && <div className="sm:hidden h-16" />}
    </>
  );
}