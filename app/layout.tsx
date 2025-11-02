import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";
import { WebVitals } from "@/components/WebVitals";
import { ClientLayout } from "@/components/ClientLayout";

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
    "iptpodate License",
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
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Resource Hints for Performance */}
        <link rel="preconnect" href="https://github.com" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="preconnect" href="https://kmuc.online" />
        <link rel="dns-prefetch" href="https://kmuc.online" />

        {/* Theme Color */}
        <meta name="theme-color" content="#000000" />
        <meta name="application-name" content="Vetra UI" />

        {/* Mobile Optimization */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Vetra UI" />
      </head>
      <body className="font-sans relative overflow-x-hidden">
        <WebVitals />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
