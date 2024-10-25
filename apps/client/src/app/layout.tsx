import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import SessionProviderWrapper from "@/components/auth/session-provider-wrapper";

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
    <html lang="en">
      <body
        className='antialiased min-w-[350px]'
      >
        <SessionProviderWrapper>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </SessionProviderWrapper>
        </body>
    </html>
  );
}
