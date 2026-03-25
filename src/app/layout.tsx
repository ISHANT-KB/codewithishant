import Navbar from "@/components/features/navigation/Navbar";
import "./globals.css";
import CommandPalette from "@/components/features/search/CommandPalette";
import { getAllPosts } from "@/lib/blog/getAllPosts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = getAllPosts();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>

        <CommandPalette posts={posts} />
      </body>
    </html>
  );
}

export const metadata = {
  title: "Code with Ishant - Learn Programming & Tech",
  description:
    "A comprehensive platform for learning programming, web development, and technology. Explore tutorials, notes, and blog posts on various tech topics.",
  keywords: [
    "programming",
    "web development",
    "tutorials",
    "JavaScript",
    "Python",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Ishant" }],
  creator: "Ishant",
  publisher: "Code with Ishant",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Code with Ishant - Learn Programming & Tech",
    description:
      "A comprehensive platform for learning programming, web development, and technology.",
    url: "https://codewithishant.vercel.app",
    siteName: "Code with Ishant",
    images: [
      {
        url: "https://codewithishant.vercel.app/og-image.jpg", // Add your OG image
        width: 1200,
        height: 630,
        alt: "Code with Ishant",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code with Ishant - Learn Programming & Tech",
    description:
      "A comprehensive platform for learning programming, web development, and technology.",
    images: ["https://codewithishant.vercel.app/og-image.jpg"], // Add your Twitter image
    creator: "@yourtwitterhandle", // Add your Twitter handle
  },
  verification: {
    google: "NaE98muSCdUiKo_tzcULiC6sUowCSGgy4kSSMNB31mI",
  },
};
