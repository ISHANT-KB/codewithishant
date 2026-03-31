import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { Note } from "@/types/content";
import { normalizeContentMetadata } from "../content/metadata";

export function getAllNotes(): Note[] {
  const noteDir = path.join(process.cwd(), "src/content/notes");

  // Check if notes directory exists
  if (!fs.existsSync(noteDir)) {
    return [];
  }

  const categories = fs
    .readdirSync(noteDir)
    .filter((entry) => fs.statSync(path.join(noteDir, entry)).isDirectory());

  const notes: Note[] = [];

  categories.forEach((category) => {
    const categoryPath = path.join(noteDir, category);

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

      notes.push({
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

  return notes;
}
