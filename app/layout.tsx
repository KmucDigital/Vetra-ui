import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";

const inter = localFont({
  variable: "--font-sans",
  display: "swap",
  preload: true,
  src: [
    {
      path: "./fonts/Inter-latin-wght-normal.woff2",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "./fonts/Inter-latin-wght-italic.woff2",
      style: "italic",
      weight: "100 900",
    },
  ],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - Open Source Landing Page Template`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `Open Source Landing Page Template - ${siteConfig.longDescription}`,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Framer Motion",
    "UI Template",
    "Landing Page Template",
    "Open Source",
    "Free Template",
    "Component Library",
    "shadcn/ui",
    "MIT License",
  ],
  authors: [
    {
      name: "Sebastian Lui",
      url: "https://kmuc.online",
    },
  ],
  creator: "Sebastian Lui",
  metadataBase: new URL("https://vetra.kmuc.online"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    title: `${siteConfig.name} - Open Source Landing Page Template`,
    description: `Open Source Landing Page Template - ${siteConfig.longDescription}`,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Open Source Template`,
    description: `Free Open Source Landing Page Template - ${siteConfig.longDescription}`,
    images: ["/og-image.png"],
    creator: "@marius4lui",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
