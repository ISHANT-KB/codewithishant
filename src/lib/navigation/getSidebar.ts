import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { normalizeContentMetadata } from "@/lib/content/metadata";

export function getSidebar(pagename: string) {
  const blogDir = path.join(process.cwd(), `src/content/${pagename}`);

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const categories = fs
    .readdirSync(blogDir)
    .filter((entry) => fs.statSync(path.join(blogDir, entry)).isDirectory());

  const sidebar = categories.map((category) => {
    const categoryPath = path.join(blogDir, category);
    const files = fs
      .readdirSync(categoryPath)
      .filter((file) => file.endsWith(".mdx"));

    const posts = files
      .map((file) => {
        const filePath = path.join(categoryPath, file);
        const source = fs.readFileSync(filePath, "utf8");
        const { data } = matter(source);
        const metadata = normalizeContentMetadata(data);

        if (metadata.draft) {
          return null;
        }

        return {
          slug: file.replace(".mdx", ""),
          title: metadata.title,
          category,
        };
      })
      .filter(
        (
          post,
        ): post is {
          slug: string;
          title: string;
          category: string;
        } => post !== null,
      );

    if (posts.length === 0) {
      return null;
    }

    return {
      category,
      posts,
    };
  });

  return sidebar.filter(
    (
      section,
    ): section is {
      category: string;
      posts: { slug: string; title: string; category: string }[];
    } => section !== null,
  );
}
