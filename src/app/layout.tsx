/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata, Viewport } from "next";
import Navbar from "@/components/features/navigation/Navbar";
import "./globals.css";
import CommandPalette from "@/components/features/search/CommandPalette";
import { getAllPosts } from "@/lib/blog/getAllPosts";
import { getAllNotes } from "@/lib/notes/getAllNotes";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = getAllPosts();
  const notes = getAllNotes();
  const paletteItems = [
    ...posts.map((post) => ({
      title: post.title,
      slug: post.slug,
      category: post.category,
      type: "blog" as const,
    })),
    ...notes.map((note) => ({
      title: note.title,
      slug: note.slug,
      category: note.category,
      type: "notes" as const,
    })),
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;600&family=Playfair+Display:wght@600;700&display=swap"
        />
      </head>
      <body className="bg-white text-slate-950">
        <WebsiteJsonLd />
        <Navbar />

        <main
          id="main-content"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          {children}
        </main>

        <CommandPalette items={paletteItems} />
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://codewithishant.vercel.app"),
  title: {
    template: "%s | Code with Ishant",
    default: "Code with Ishant - Learn Programming & Tech",
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
  alternates: {
    canonical: "/",
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
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codewithishant.vercel.app",
    siteName: "Code with Ishant",
    title: "Code with Ishant - Learn Programming & Tech",
    description:
      "A comprehensive platform for learning programming, web development, and technology.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Code with Ishant - Learn Programming & Tech",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Code with Ishant - Learn Programming & Tech",
    description:
      "A comprehensive platform for learning programming, web development, and technology.",
    images: ["/og-image.svg"],
  },
  verification: {
    google: "NaE98muSCdUiKo_tzcULiC6sUowCSGgy4kSSMNB31mI",
  },
  manifest: "/site.webmanifest",
  category: "technology",
};
