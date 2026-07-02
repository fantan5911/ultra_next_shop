import { PropsWithChildren } from "react";

export function SubmitButton({ children }: PropsWithChildren) {
  return (
    <button
      type="submit"
      className="w-full bg-white text-black font-black border border-black/0
         py-4 rounded-full uppercase hover:bg-black hover:text-white hover:border-white
         shadow-xl shadow-white/20
         hover:shadow-xl hover:shadow-white/20
         cursor-pointer transition-all duration-100"
    >
      {children}
    </button>
  );
}
