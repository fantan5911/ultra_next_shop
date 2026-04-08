'use client';
import { PAGES } from "@/config/pages.config";
import Link from "next/link";

interface Props {
    text: string;
    link: string;
}

export function Auth({text, link}: Props) {
    return (
        <div className="flex gap-2 mt-3">
            <h1 className="text-lg font-medium text-white/50">{text}</h1>
            <Link href={link} className="text-lg text-white/70 underline
             hover:text-white transition-colors duration-150">
                {link === PAGES.REGISTER ? "Зарегистрироваться" : "Войти"}
            </Link>
        </div>
    )
}