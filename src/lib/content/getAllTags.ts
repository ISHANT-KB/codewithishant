import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Tag } from "@/types/content";
import { normalizeContentMetadata } from "@/lib/content/metadata";

export function getAllTags(): Tag[] {
  const blogDir = path.join(process.cwd(), "src/content/blog");
  const notesDir = path.join(process.cwd(), "src/content/notes");

  const tags: Record<string, string[]> = {};

  // Process blog posts
  const blogCategories = fs
    .readdirSync(blogDir)
    .filter((entry) => fs.statSync(path.join(blogDir, entry)).isDirectory());
  blogCategories.forEach((category) => {
    const categoryPath = path.join(blogDir, category);
    const files = fs
      .readdirSync(categoryPath)
      .filter((file) => file.endsWith(".mdx"));
    files.forEach((file) => {
      const filePath = path.join(categoryPath, file);
      const source = fs.readFileSync(filePath, "utf8");
      const { data } = matter(source);
      const metadata = normalizeContentMetadata(data);
      const slug = file.replace(".mdx", "");
      if (!metadata.draft) {
        metadata.tags.forEach((tag) => {
          if (!tags[tag]) tags[tag] = [];
          tags[tag].push(`${category}/${slug}`);
        });
      }
    });
  });

  // Process notes
  if (fs.existsSync(notesDir)) {
    const notesCategories = fs
      .readdirSync(notesDir)
      .filter((entry) => fs.statSync(path.join(notesDir, entry)).isDirectory());
    notesCategories.forEach((category) => {
      const categoryPath = path.join(notesDir, category);
      const files = fs
        .readdirSync(categoryPath)
        .filter((file) => file.endsWith(".mdx"));
      files.forEach((file) => {
        const filePath = path.join(categoryPath, file);
        const source = fs.readFileSync(filePath, "utf8");
        const { data } = matter(source);
        const metadata = normalizeContentMetadata(data);
        const slug = file.replace(".mdx", "");
        if (!metadata.draft) {
          metadata.tags.forEach((tag) => {
            if (!tags[tag]) tags[tag] = [];
            tags[tag].push(`${category}/${slug}`);
          });
        }
      });
    });
  }

  return Object.entries(tags)
    .map(([name, posts]) => ({
      name,
      count: posts.length,
    }))
    .sort((a, b) => b.count - a.count);
}
