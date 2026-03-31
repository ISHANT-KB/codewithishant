import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { getTableOfContents } from "../content/getTableOfContents";
import { normalizeContentMetadata } from "@/lib/content/metadata";

export function getPost(category: string, slug: string) {
  const filePath = path.join(
    process.cwd(),
    "src/content/blog",
    category,
    slug + ".mdx",
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const file = fs.readFileSync(filePath, "utf8");

  const { content, data } = matter(file);
  const metadata = normalizeContentMetadata(data);

  if (metadata.draft) {
    return null;
  }

  const toc = getTableOfContents(content);

  const stats = readingTime(content);

  return {
    content,
    metadata,
    toc,
    readingTime: stats.text,
  };
}
