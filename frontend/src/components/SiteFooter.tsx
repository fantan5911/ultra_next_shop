import Link from "next/link";
import { PAGES } from "@/config/pages.config";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950/95">
      <div className="mx-auto flex w-full flex-col gap-4 px-2 py-1 sm:px-6 md:px-8 lg:w-[79%] lg:px-0 lg:py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href={PAGES.HOME}
              className="text-xl font-extrabold tracking-wide text-white"
            >
              MONO
            </Link>
            <p className="mt-2 max-w-md text-sm text-zinc-400">
              Современный магазин смартфонов с удобной покупкой и быстрым
              оформлением
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-300">
            <Link
              href={PAGES.HOME}
              className="transition-colors hover:text-white"
            >
              Главная
            </Link>
            <Link
              href={PAGES.CART}
              className="transition-colors hover:text-white"
            >
              Корзина
            </Link>
            <Link
              href={PAGES.LOGIN}
              className="transition-colors hover:text-white"
            >
              Войти
            </Link>
            <Link
              href={PAGES.SMARTPHONE_CREATE}
              className="transition-colors hover:text-white"
            >
              Публикация
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 MONO. Все права защищены.</span>
          <div className="flex flex-wrap items-center gap-3 sm:justify-end">
            <Link
              href={PAGES.TERMS}
              className="transition-colors hover:text-white"
            >
              Пользовательское соглашение
            </Link>
            <Link
              href={PAGES.POLICY}
              className="transition-colors hover:text-white"
            >
              Политика конфиденциальности
            </Link>
            <span>Телефон: +7 (999) 123-45-67</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
