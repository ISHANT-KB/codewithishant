import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/types/content";

export function getAllPosts(): Post[] {
  const blogDir = path.join(process.cwd(), "src/content/blog");

  const categories = fs.readdirSync(blogDir);

  const posts: Post[] = [];

  categories.forEach((category) => {
    const categoryPath = path.join(blogDir, category);

    const files = fs.readdirSync(categoryPath);

    files.forEach((file) => {
      const slug = file.replace(".mdx", "");

      const filePath = path.join(categoryPath, file);

      const source = fs.readFileSync(filePath, "utf8");

      const { data } = matter(source);

      posts.push({
        title: data.title,
        description: data.description,
        tags: data.tags ?? [],
        category,
        slug,
        date: data.date ?? "",
        difficulty: data.difficulty ?? "",
        featured: data.featured ?? false,
      });
    });
  });

  // sort newest first
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}
