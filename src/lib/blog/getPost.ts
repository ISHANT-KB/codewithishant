import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { getTableOfContents } from "../content/getTableOfContents";

export function getPost(category: string, slug: string) {
  const filePath = path.join(
    process.cwd(),
    "src/content/blog",
    category,
    slug + ".mdx",
  );

  const file = fs.readFileSync(filePath, "utf8");

  const { content, data } = matter(file);

  const toc = getTableOfContents(content);

  const stats = readingTime(content);

  return {
    content,
    metadata: data,
    toc,
    readingTime: stats.text,
  };
}
