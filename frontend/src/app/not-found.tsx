import { HomeButton } from "@/components/UI/HomeButton";
import { PAGES } from "@/config/pages.config";
import Link from "next/link";


export default function NotFound() {
    return (
        <div className="flex flex-col gap-4 items-center justify-center w-full min-h-screen">
            <h1 className="font-mono text-4xl">ОШИБКА 404 CТРАНИЦА НЕ НАЙДЕНА</h1>
            <HomeButton />
        </div>
    )
}