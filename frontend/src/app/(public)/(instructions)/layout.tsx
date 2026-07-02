import { LeftSidebar } from "@/components/LeftSidebar";
import type { PropsWithChildren } from "react";

export default function InstructionsLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen w-full flex-col lg:flex-row">
        <LeftSidebar />
        <main className="flex-1 bg-zinc-950/90 p-6 sm:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
