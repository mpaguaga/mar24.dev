import { Bricolage_Grotesque, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* Distinctive type pairing — no Inter/Roboto/system fonts */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
const body = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://mar24-dev.vercel.app"),
  title: "MAR24.DEV — Design. Build. Ship.",
  description: "Software, automation and systems.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-32.png", sizes: "32x32" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "MAR24.DEV",
    title: "MAR24.DEV — Design. Build. Ship.",
    description: "Software, automation and systems.",
    url: "https://mar24-dev.vercel.app/",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MAR24.DEV — Design. Build. Ship.",
    description: "Software, automation and systems.",
    images: ["/og-image.png"],
  },
};

export const viewport = {
  themeColor: "#0c0b0a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
