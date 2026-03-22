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
    <html lang="en">
      <body>
        <Navbar />

        <main className="max-w-7xl mx-auto p-5">{children}</main>

        <CommandPalette posts={posts} />
      </body>
    </html>
  );
}

export const metadata = {
  verification: {
    google: "NaE98muSCdUiKo_tzcULiC6sUowCSGgy4kSSMNB31mI",
  },
};
