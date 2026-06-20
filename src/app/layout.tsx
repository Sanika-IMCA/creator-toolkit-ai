import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creator Toolkit AI | Generate Bios, Hooks & Captions",
  description: "Generate high-converting creator bios, viral social media hooks, and structured captions in seconds using Gemini API.",
  openGraph: {
    title: "Creator Toolkit AI | Generate Bios, Hooks & Captions",
    description: "Generate high-converting creator bios, viral social media hooks, and structured captions in seconds using Gemini API.",
    type: "website",
    url: "https://digitalheroesco.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Creator Toolkit AI Dashboard Preview",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="bg-zinc-950 text-zinc-100 min-h-screen flex flex-col font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
