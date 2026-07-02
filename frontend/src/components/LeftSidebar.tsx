"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PAGES } from "@/config/pages.config";

const links = [
  { href: PAGES.TERMS, label: "Пользовательское соглашение" },
  { href: PAGES.POLICY, label: "Политика конфиденциальности" },
];

export function LeftSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-r border-white/10 bg-zinc-950/95 p-5 sm:p-6 lg:w-80 lg:min-w-80">
      <p className="mb-6 text-sm leading-6 text-zinc-400">
        Полезная информация о нашей платформе
      </p>

      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-r-md px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "border-l-2 border-l-white/20 bg-white/10 text-white"
                  : "border-l-2 border-l-transparent text-zinc-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
