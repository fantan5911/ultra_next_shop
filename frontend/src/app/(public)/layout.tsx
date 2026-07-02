import { NavBar } from "@/components/NavBar";
import { SiteFooter } from "@/components/SiteFooter";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <NavBar />
      </header>
      <main className="flex-1 pb-16 sm:pb-0">{children}</main>
      <SiteFooter />
    </div>
  );
}
