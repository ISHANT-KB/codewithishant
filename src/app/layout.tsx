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

        <main className="max-w-7xl p-5">{children}</main>

        <CommandPalette posts={posts} />
      </body>
    </html>
  );
}
