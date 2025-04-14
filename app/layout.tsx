// app/layout.tsx (atau app/layout.ts jika kamu pakai TypeScript)
import "../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
  title: {
    default: "Raffael’s Portfolio",
    template: "%s | Raffael’s Portfolio",
  },
  description: "Computer Engineering student and software developer passionate about building useful, data-driven tools for the web.",
  openGraph: {
    title: "Raffael’s Portfolio",
    description: "Computer Engineering student and software developer passionate about building useful, data-driven tools for the web.",
    url: "https://raffael.dev", // Ganti dengan domain kamu
    siteName: "Raffael’s Portfolio",
    images: [
      {
        url: "https://raffael.dev/og.png", // Ganti dengan og image kamu
        width: 1920,
        height: 1080,
      },
    ],
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
    title: "Raffael’s Portfolio",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};

// Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${calSans.variable}`}>
      <head>
        <Analytics />
      </head>
      <body
        className={`bg-black ${
          process.env.NODE_ENV === "development" ? "debug-screens" : ""
        }`}
      >
        {children}
      </body>
    </html>
  );
}
