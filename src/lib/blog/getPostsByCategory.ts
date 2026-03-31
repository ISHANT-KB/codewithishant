import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { normalizeContentMetadata } from "@/lib/content/metadata";

export function getPostsByCategory(category: string) {
  const categoryPath = path.join(process.cwd(), "src/content/blog", category);

  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const files = fs
    .readdirSync(categoryPath)
    .filter(
      (entry) =>
        fs.statSync(path.join(categoryPath, entry)).isFile() &&
        entry.endsWith(".mdx"),
    );

  const posts = files
    .map((file) => {
      const slug = file.replace(".mdx", "");

      const filePath = path.join(categoryPath, file);

      const fileContent = fs.readFileSync(filePath, "utf-8");

      const { data } = matter(fileContent);
      const metadata = normalizeContentMetadata(data);

      if (metadata.draft) {
        return null;
      }

      return {
        slug,
        category,
        title: metadata.title,
        description: metadata.description,
        tags: metadata.tags,
      };
    })
    .filter(
      (
        post,
      ): post is {
        slug: string;
        category: string;
        title: string;
        description: string;
        tags: string[];
      } => post !== null,
    );

  return posts;
}
