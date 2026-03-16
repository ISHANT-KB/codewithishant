import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { Note } from "@/types/content";

export function getAllNotes(): Note[] {
  const noteDir = path.join(process.cwd(), "src/content/notes");

  const categories = fs.readdirSync(noteDir);

  const notes: Note[] = [];

  categories.forEach((category) => {
    const categoryPath = path.join(noteDir, category);

    const files = fs.readdirSync(categoryPath);

    files.forEach((file) => {
      const slug = file.replace(".mdx", "");

      const filePath = path.join(categoryPath, file);

      const source = fs.readFileSync(filePath, "utf8");

      const { data } = matter(source);

      notes.push({
        title: data.title,
        description: data.description,
        tags: data.tags ?? [],
        category,
        slug,
      });
    });
  });

  return notes;
}
