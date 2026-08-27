import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://mar24-dev.vercel.app"),
  title: "MAR24.DEV — Design. Build. Ship.",
  description: "Software, automation and systems — engineered to be fast, clean and genuinely useful.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-32.png", sizes: "32x32" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "MAR24.DEV",
    title: "MAR24.DEV — Design. Build. Ship.",
    description: "Software, automation and systems — engineered to be fast, clean and genuinely useful.",
    url: "https://mar24-dev.vercel.app/",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MAR24.DEV — Design. Build. Ship.",
    description: "Software, automation and systems — engineered to be fast, clean and genuinely useful.",
    images: ["/og-image.png"],
  },
};

export const viewport = {
  themeColor: "#08090b",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
