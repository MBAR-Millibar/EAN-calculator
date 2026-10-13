import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { ConsentBanner } from "@/components/consent-banner";
import { ThemeProvider } from "@/components/theme-provider";
import { NativeShell } from "@/components/native-shell";
import { IS_MOBILE_APP } from "@/lib/platform";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ean.millibar.io"),
  alternates: { canonical: "/" },
  title: "EAN Calculator",
  description:
    "Enriched Air Nitrox calculator for nitrox divers and learners. Calculate MOD, Best Mix, EAD, and plan your dives safely with comprehensive gas calculations.",
  keywords: [
    "nitrox",
    "diving",
    "calculator",
    "enriched air",
    "MOD",
    "EAD",
    "best mix",
    "dive planning",
    "scuba diving",
  ],
  authors: [{ name: "Millibar" }],
  creator: "Millibar",
  publisher: "Millibar",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ean.millibar.io",
    siteName: "Millibar - Nitrox Calculator",
    title: "EAN Calculator - Enriched Air Diving Calculator",
    description:
      "Enriched Air Nitrox calculator for nitrox divers and learners. Calculate MOD, Best Mix, EAD, and plan your dives safely with comprehensive gas calculations.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nitrox Calculator - diving calculator for enriched air",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@millibar_io",
    creator: "@millibar_io",
    title: "Nitrox Calculator - Enriched Air Diving Calculator",
    description:
      "Enriched Air Nitrox calculator for nitrox divers and learners. Calculate MOD, Best Mix, EAD, and plan your dives safely.",
    images: ["/og-image.jpg"],
  },
  category: "Sports & Recreation",
  classification: "Diving Calculator",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Nitrox Calculator",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Draw under the notch and home indicator in the app; .native-app pads
  // the body by the safe-area insets instead (globals.css).
  ...(IS_MOBILE_APP && { viewportFit: "cover" as const }),
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e8f5fc" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1a22" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Nitrox Calculator",
    description:
      "Professional Enriched Air Nitrox calculator for nitrox divers and learners. Calculate MOD, Best Mix, EAD, and plan your dives safely.",
    url: "https://ean.millibar.io",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web Browser",
    author: {
      "@type": "Organization",
      name: "Millibar",
      url: "https://millibar.io",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Maximum Operating Depth (MOD) Calculator",
      "Best Mix Calculator",
      "Equivalent Air Depth (EAD) Calculator",
      "Dive Planner",
      "Safety Resources",
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}${IS_MOBILE_APP ? " native-app" : ""}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme={IS_MOBILE_APP ? "system" : "light"}
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {IS_MOBILE_APP ? (
            <NativeShell />
          ) : (
            <>
              <ConsentBanner />
              <Analytics />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
