import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Tag } from "@/types/content";

export function getAllTags(): Tag[] {
  const blogDir = path.join(process.cwd(), "src/content/blog");
  const notesDir = path.join(process.cwd(), "src/content/notes");

  const tags: Record<string, string[]> = {};

  // Process blog posts
  const blogCategories = fs.readdirSync(blogDir);
  blogCategories.forEach((category) => {
    const categoryPath = path.join(blogDir, category);
    const files = fs.readdirSync(categoryPath);
    files.forEach((file) => {
      const filePath = path.join(categoryPath, file);
      const source = fs.readFileSync(filePath, "utf8");
      const { data } = matter(source);
      const slug = file.replace(".mdx", "");
      if (data.tags) {
        data.tags.forEach((tag: string) => {
          if (!tags[tag]) tags[tag] = [];
          tags[tag].push(`${category}/${slug}`);
        });
      }
    });
  });

  // Process notes
  const notesCategories = fs.readdirSync(notesDir);
  notesCategories.forEach((category) => {
    const categoryPath = path.join(notesDir, category);
    const files = fs.readdirSync(categoryPath);
    files.forEach((file) => {
      const filePath = path.join(categoryPath, file);
      const source = fs.readFileSync(filePath, "utf8");
      const { data } = matter(source);
      const slug = file.replace(".mdx", "");
      if (data.tags) {
        data.tags.forEach((tag: string) => {
          if (!tags[tag]) tags[tag] = [];
          tags[tag].push(`${category}/${slug}`);
        });
      }
    });
  });

  return Object.entries(tags)
    .map(([name, posts]) => ({
      name,
      count: posts.length,
    }))
    .sort((a, b) => b.count - a.count);
}
