import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono, Oswald } from "next/font/google";

import { site } from "@/config/site";

import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const description = `Personal site of ${site.name}, a ${site.role.toLowerCase()}. ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    locale: "en_US",
    title: `${site.name} — ${site.role}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#07080a",
};

const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC;
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${oswald.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only rounded-3 bg-plate-4 font-mono text-[12px] font-medium tracking-[0.12em] text-fg uppercase no-underline shadow-btn focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:inline-flex focus:h-9 focus:items-center focus:px-3.5"
        >
          Skip to content
        </a>
        {children}
        {umamiSrc && umamiWebsiteId && (
          <script async src={umamiSrc} data-website-id={umamiWebsiteId} />
        )}
      </body>
    </html>
  );
}
