import { Analytics } from "@vercel/analytics/next"

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from '@/contexts/auth-context';
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "nusCCAs",
  description: "Powering a More Holistic Student Life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${geistSans.className}`}
      >
        <ThemeProvider>
          <AuthProvider>
            <div className="m-auto w-4/5 my-8">
              <Navbar />
              {children}
            </div>
          </AuthProvider>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>

  );
}
