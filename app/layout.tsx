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
  openGraph: {
    title: {
      template: '%s | NusCCAs',
      default: "NusCCAs",
    },
    description: "Powering a More Holistic Student Life",
    siteName: 'NusCCAs',
    images: [
      {
        url: 'https://oxttowgsypcnbeobqril.supabase.co/storage/v1/object/public/public-static-content//siteImage.png',
        width: 903,
        height: 453
      }
    ],
    type: 'website'
  },
  generator: 'Next.js',
  keywords: ['NUS', 'NuSync', 'CCA', 'Recommender', 'Hackathons', 'Student Life', 'Event', 'Events'],
 
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
