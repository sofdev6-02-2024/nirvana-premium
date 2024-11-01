import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import SessionProviderWrapper from "@/features/auth/components/session-provider-wrapper";

export const metadata: Metadata = {
  title: {
    default: "Tu Primera Chamba",
    template: "%s | Tu Primera Chamba",
  },
  description: "Work harder and win",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-screen min-w-[350px] flex-col antialiased">
        <SessionProviderWrapper>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <Toaster />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
