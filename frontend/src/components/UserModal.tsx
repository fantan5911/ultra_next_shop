"use client";

import { LogOut, UserIcon, Settings } from "lucide-react";
import Link from "next/link";
import { PAGES } from "@/config/pages.config";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => Promise<void>;
}

export function UserModal({ isOpen, onClose, onLogout }: UserModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed right-60 top-20 z-50 w-full max-w-[14rem] rounded-2xl border border-white/20 bg-zinc-950 px-2 py-4 shadow-2xl shadow-black/50"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col gap-2">
        <Link
          href={PAGES.PROFILE}
          className="w-full flex items-center rounded-xl px-4
         py-3 text-sm gap-2 font-semibold text-white transition hover:bg-white/10"
          onClick={onClose}
        >
          <UserIcon size={20} strokeWidth={2} />
          <span>Профиль</span>
        </Link>
        <Link
          href={PAGES.SETTINGS}
          className="w-full flex items-center rounded-xl px-4
         py-3 text-sm gap-2 font-semibold text-white transition hover:bg-white/10"
          onClick={onClose}
        >
          <Settings size={20} strokeWidth={2} />
          <span>Настройки</span>
        </Link>
      </div>

      <div className="my-4 h-px bg-white/20" />

      <button
        className="w-full flex items-center rounded-xl px-4
         py-3 text-sm gap-2 font-semibold text-white transition hover:bg-white/10 cursor-pointer"
        onClick={() => {
          onClose();
          onLogout();
        }}
      >
        <LogOut size={20} strokeWidth={2} />
        <span>Выйти</span>
      </button>
    </div>
  );
}
