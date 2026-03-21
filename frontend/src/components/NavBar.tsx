import Link from "next/link"
import {SearchInput} from "./serchInput"

export function NavBar() {
    return (
        <div className="flex items-center justify-center w-full py-5 bg-black  border-b border-b-white/20">
            <div className="w-[79%] gap-3 flex items-center justify-center">
                <Link className="font-extrabold text-2xl"
                href="/"
                >MONO.</Link>
                <div className="w-full flex justify-center">
                    <SearchInput />
                </div>
            </div>
        </div>
    )
}