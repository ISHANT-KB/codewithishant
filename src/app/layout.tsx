import type { Metadata, Viewport } from "next";
import Navbar from "@/components/features/navigation/Navbar";
import "./globals.css";
import CommandPalette from "@/components/features/search/CommandPalette";
import { getAllPosts } from "@/lib/blog/getAllPosts";

// ─── Structured Data (JSON-LD) ───────────────────────────────────────────────
// Tells Google this is a website with a search feature — boosts rich results.
function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Code with Ishant",
    url: "https://codewithishant.vercel.app",
    description:
      "A comprehensive platform for learning programming, web development, and technology.",
    author: {
      "@type": "Person",
      name: "Ishant",
      url: "https://codewithishant.vercel.app",
    },
    // Enables Google Sitelinks Search Box in search results
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://codewithishant.vercel.app/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─── Layout ──────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = getAllPosts();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts if you use them — helps page speed score */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {/* Inject JSON-LD on every page */}
        <WebsiteJsonLd />

        <Navbar />

        <main
          id="main-content"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          {children}
        </main>

        <CommandPalette posts={posts} />
      </body>
    </html>
  );
}

// ─── Viewport (separate export required in Next.js 14+) ──────────────────────
// Controls mobile rendering and theme color shown in browser chrome / PWA.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

// ─── Global / Default Metadata ───────────────────────────────────────────────
// Child pages can override individual fields via their own `metadata` exports.
export const metadata: Metadata = {
  // metadataBase is REQUIRED for Next.js to resolve relative image/canonical URLs.
  metadataBase: new URL("https://codewithishant.vercel.app"),

  title: {
    // Pages that don't export their own title will get: "<Page> | Code with Ishant"
    template: "%s | Code with Ishant",
    default: "Code with Ishant – Learn Programming & Tech",
  },

  description:
    "A comprehensive platform for learning programming, web development, and technology. Explore tutorials, notes, and blog posts on JavaScript, Python, React, Next.js, and more.",

  keywords: [
    "programming tutorials",
    "web development",
    "JavaScript",
    "Python",
    "React",
    "Next.js",
    "coding notes",
    "tech blog",
    "Ishant",
  ],

  authors: [{ name: "Ishant", url: "https://codewithishant.vercel.app" }],
  creator: "Ishant",
  publisher: "Code with Ishant",

  // ── Canonical & Alternate URLs ──────────────────────────────────────────
  // Prevents duplicate-content penalties when the same page is accessible
  // via multiple URLs (e.g. with/without trailing slash, http vs https).
  alternates: {
    canonical: "/",
  },

  // ── Robots ──────────────────────────────────────────────────────────────
  // Explicitly allow Google (and all crawlers) to index and follow links.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1, // no limit
      "max-image-preview": "large",
      "max-snippet": -1, // let Google show full snippets
    },
  },

  // ── Icons ────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },

  // ── Open Graph (Facebook, LinkedIn, WhatsApp previews) ──────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codewithishant.vercel.app",
    siteName: "Code with Ishant",
    title: "Code with Ishant – Learn Programming & Tech",
    description:
      "A comprehensive platform for learning programming, web development, and technology.",
    images: [
      {
        url: "/og-image.jpg", // resolved against metadataBase automatically
        width: 1200,
        height: 630,
        alt: "Code with Ishant – Learn Programming & Tech",
        type: "image/jpeg",
      },
    ],
  },

  // ── Twitter / X Card ────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    creator: "@yourtwitterhandle",
    title: "Code with Ishant – Learn Programming & Tech",
    description:
      "A comprehensive platform for learning programming, web development, and technology.",
    images: ["/og-image.jpg"],
  },

  // ── Google Search Console Verification ──────────────────────────────────
  verification: {
    google: "NaE98muSCdUiKo_tzcULiC6sUowCSGgy4kSSMNB31mI",
  },

  // ── App / PWA manifest ───────────────────────────────────────────────────
  manifest: "/site.webmanifest",

  // ── Category ────────────────────────────────────────────────────────────
  category: "technology",
};