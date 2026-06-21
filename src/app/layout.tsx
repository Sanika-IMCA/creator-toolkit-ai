import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CREATOR OS | The Operating System for Modern Creators",
  description: "Transform your social identity. Generate premium bios, viral hooks, and high-converting captions using the next-generation AI operating system.",
  openGraph: {
    title: "CREATOR OS | The Operating System for Modern Creators",
    description: "Transform your social identity. Generate premium bios, viral hooks, and high-converting captions using the next-generation AI operating system.",
    type: "website",
    url: "https://digitalheroesco.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Creator OS Dashboard Preview",
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
      className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} ${spaceGrotesk.variable} scroll-smooth antialiased`}
    >
      <body className="bg-[#030303] text-zinc-100 min-h-screen flex flex-col font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
