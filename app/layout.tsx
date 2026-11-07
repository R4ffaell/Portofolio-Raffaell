import "../global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "./components/analytics";
import { SiteFooter } from "./components/site-footer";
import { SiteNav } from "./components/site-nav";
import { site } from "./lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.title}`,
  },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.title,
    images: [{ url: "/og.png", width: 1920, height: 1080 }],
    locale: "en-US",
    type: "website",
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
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Runs before first paint so there is no light/dark flash. Saved choice wins,
// otherwise the OS preference (dark if it can't be read). The "js" class lets
// CSS hide scroll-reveal content only when JavaScript is available.
const themeScript = `(function(){var h=document.documentElement;h.classList.add("js");try{var s=localStorage.getItem("theme");var d=s?s==="dark":!window.matchMedia("(prefers-color-scheme: light)").matches;h.classList.toggle("dark",d)}catch(e){h.classList.add("dark")}})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* rome-ignore lint/security/noDangerouslySetInnerHtml: constant theme-init script, no user input */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Analytics />
      </head>
      <body
        className={`flex min-h-screen flex-col bg-canvas font-sans text-fg antialiased ${
          process.env.NODE_ENV === "development" ? "debug-screens" : ""
        }`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main" className="flex-1 pt-12">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
