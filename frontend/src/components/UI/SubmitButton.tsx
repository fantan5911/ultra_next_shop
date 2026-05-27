import { PropsWithChildren } from "react";


export function SubmitButton({children}: PropsWithChildren) {
    return (
        <button type="submit" className="w-full bg-white text-black font-black
         py-4 rounded-full uppercase hover:bg-gray-200 cursor-pointer transition-all duration-100">
            {children}
        </button>
    )
}