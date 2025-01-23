import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { Poppins } from 'next/font/google';
import { DotPattern } from '@/components/ui/dot-pattern';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'QuizzyAI',
  description: 'A platform for generating AI-powered quiz questions based on various topics and types.',
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased relative w-full min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <DotPattern />
          <main className="px-16">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
