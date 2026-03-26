import { PropsWithChildren } from "react";



export function AuthorizationButton({children}: PropsWithChildren) {
    return (
        <button className="w-full bg-white text-black font-black
         py-4 rounded-full uppercase hover:bg-gray-200 cursor-pointer transition-all duration-100 mt-6">
            {children}
        </button>
    )
}