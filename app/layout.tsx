import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Starter Demo",
  description: "Build simple but nice looking websites with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <main className="px-8 py-20 max-w-6xl mx-auto flex-col sm:flex-row">
          {children}
        </main>
        
      </body>
    </html>
  );
}
