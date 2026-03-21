import { NavBar } from "@/components/NavBar";
import { PropsWithChildren } from "react";


export default function Layout({children}: PropsWithChildren) {
    return (
        <div>
            <NavBar />
            {children}
        </div>
    )
}