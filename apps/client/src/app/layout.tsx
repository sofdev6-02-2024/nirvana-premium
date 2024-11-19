import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import type { Metadata } from 'next';
import './globals.css';

import NextAuthProvider from '@/providers/next-auth-proivder';

export const metadata: Metadata = {
  title: {
    default: 'Tu Primera Chamba',
    template: '%s | Tu Primera Chamba',
  },
  description: 'Work harder and win',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [dark],
      }}
    >
      <html lang="en" className="h-full">
        <body className="flex min-h-screen min-w-[350px] flex-col antialiased">
          <NextAuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />

              <div className="flex-1">{children}</div>
              <Footer />
              <Toaster />
            </ThemeProvider>
          </NextAuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
