import { Analytics } from "@vercel/analytics/next"

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from '@/contexts/auth-context';
import { Navbar } from "@/components/navbar";
import Container from "@/components/container";
import Head from "next/head";

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
      <Head>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="3f58a922-49d7-4329-9f22-8ed548d5dcb8"></script>
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${geistSans.className}`}
      >
        <ThemeProvider>
          <AuthProvider>
              <Navbar />
              <Container>
                {children}
              </Container>
          </AuthProvider>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>

  );
}
