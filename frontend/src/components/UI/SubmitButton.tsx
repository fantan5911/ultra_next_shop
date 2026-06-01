import { PropsWithChildren } from "react";


export function SubmitButton({children}: PropsWithChildren) {
    return (
        <button type="submit" className="w-full bg-white text-black font-black border border-black
         py-4 rounded-full uppercase hover:bg-black hover:text-white hover:border-white
         cursor-pointer transition-all duration-100">
            {children}
        </button>
    )
}