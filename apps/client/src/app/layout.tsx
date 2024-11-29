import Navbar from '@/components/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { UserProvider } from '@/features/users/components/user-provider';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Toaster as Sonner } from 'sonner';
import './globals.css';

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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider
            dynamic
            appearance={{
              variables: {
                colorPrimary: 'hsl(263.4, 70%, 50.4%)',
              },
            }}
            afterSignOutUrl="/"
          >
            <UserProvider>
              <Navbar />
              {children}
              <Sonner />
              <Toaster />
            </UserProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
