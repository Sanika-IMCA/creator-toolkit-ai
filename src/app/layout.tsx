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
  metadataBase: new URL("https://creator-toolkit-ai.vercel.app"),
  title: "Creator Toolkit AI | Generate Bios, Hooks & Captions",
  description: "Generate high-converting bios, hooks, and captions in seconds using Creator OS—the ultimate social media operating system for modern creators.",
  openGraph: {
    title: "Creator Toolkit AI | Generate Bios, Hooks & Captions",
    description: "Generate high-converting bios, hooks, and captions in seconds using Creator OS—the ultimate social media operating system for modern creators.",
    type: "website",
    url: "/",
    siteName: "Creator OS",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Creator OS Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creator Toolkit AI | Generate Bios, Hooks & Captions",
    description: "Generate high-converting bios, hooks, and captions in seconds using Creator OS—the ultimate social media operating system for modern creators.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Creator OS",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
  },
  "description": "Generate high-converting bios, hooks, and captions in seconds using Creator OS—the ultimate social media operating system for modern creators.",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#030303] text-zinc-100 min-h-screen flex flex-col font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
