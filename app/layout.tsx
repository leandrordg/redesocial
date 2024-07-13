import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rede Social",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <body
          className={`flex flex-col min-h-dvh touch-none ${font.className}`}
        >
          <Toaster />
          <Header />
          <main className="grow">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
