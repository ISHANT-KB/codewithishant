import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getNotesByCategory(category: string) {
  const categoryPath = path.join(process.cwd(), "src/content/notes", category);

  const files = fs.readdirSync(categoryPath);

  const notes = files.map((file) => {
    const slug = file.replace(".mdx", "");

    const filePath = path.join(categoryPath, file);

    const fileContent = fs.readFileSync(filePath, "utf-8");

    const { data } = matter(fileContent);

    return {
      slug,
      category,
      title: data.title,
      description: data.description,
      tags: data.tags ?? [],
    };
  });

  return notes;
}
