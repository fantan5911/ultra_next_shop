import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smartphone shop",
  description: "A smartphone shop, more smartphones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        name="google-site-verification"
        content="_EdzTlP7YQPaaHtyDj-7PhlmWbeupdXIC_976YXJ_So"
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <IsAuthInit /> */}
        {children}
      </body>
    </html>
  );
}
