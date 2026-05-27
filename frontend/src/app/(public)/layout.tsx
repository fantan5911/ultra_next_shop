import { NavBar } from "@/components/NavBar";
import { PropsWithChildren } from "react";


export default function Layout({children}: PropsWithChildren) {
    return (
        <>
            <header>
                <NavBar />
            </header>
            <main className="pb-16 sm:pb-0">
                {children}
            </main>
        </>
    )
}