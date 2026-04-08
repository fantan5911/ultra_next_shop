import Link from "next/link";


export function HomeButton() {
    return (
        <Link href="/" 
        className="text-xl text-white px-6 py-2 rounded-4xl bg-white/10 hover:bg-white/15 
        transition-colors duration-250">
            Главная
        </Link>
    )
}