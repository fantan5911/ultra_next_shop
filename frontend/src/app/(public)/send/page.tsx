"use client";

import { PAGES } from "@/config/pages.config";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SendPage() {
  const router = useRouter();
  const emailStore = useAuthStore((state) => state.emailStore);

  if (emailStore === "") {
    useEffect(() => {
      router.push(PAGES.HOME);
    });
  } else {
    return (
      <div className="flex w-full items-center justify-center min-h-[85vh]">
        <h1 className="text-2xl">
          Мы отправили ссылку для подтверждения аккаунта на {emailStore}
        </h1>
      </div>
    );
  }
}
