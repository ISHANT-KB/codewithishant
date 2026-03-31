import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/types/content";
import { normalizeContentMetadata } from "../content/metadata";

export function getAllPosts(): Post[] {
  const blogDir = path.join(process.cwd(), "src/content/blog");

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const categories = fs
    .readdirSync(blogDir)
    .filter((entry) => fs.statSync(path.join(blogDir, entry)).isDirectory());

  const posts: Post[] = [];

  categories.forEach((category) => {
    const categoryPath = path.join(blogDir, category);

    const files = fs.readdirSync(categoryPath).filter((file) => file.endsWith(".mdx"));

    files.forEach((file) => {
      const slug = file.replace(".mdx", "");

      const filePath = path.join(categoryPath, file);

      const source = fs.readFileSync(filePath, "utf8");

      const { data, content } = matter(source);
      const metadata = normalizeContentMetadata(data);

      if (metadata.draft) {
        return;
      }

      posts.push({
        title: metadata.title,
        description: metadata.description,
        tags: metadata.tags,
        category,
        slug,
        date: metadata.date,
        difficulty: metadata.difficulty,
        author: metadata.author,
        featured: metadata.featured,
        draft: metadata.draft,
        series: metadata.series,
        order: metadata.order,
        content,
      });
    });
  });

  // sort newest first
  posts.sort((a, b) => {
    const aTime = a.date ? new Date(a.date).getTime() : 0;
    const bTime = b.date ? new Date(b.date).getTime() : 0;

    return bTime - aTime;
  });

  return posts;
}
