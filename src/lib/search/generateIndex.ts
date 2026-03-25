import fs from "fs";
import path from "path";
import { getAllPosts } from "../blog/getAllPosts";
import { getAllNotes } from "../notes/getAllNotes";
import { buildSearchIndex } from "./buildSearchIndex";

/**
 * Generates the search index and writes it to public/search-index.json.
 * Should be called at build time (from next.config.ts).
 */
export function generateSearchIndex(): void {
  const posts = getAllPosts();
  const notes = getAllNotes();
  const index = buildSearchIndex(posts, notes);

  const outputPath = path.join(process.cwd(), "public", "search-index.json");

  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2), "utf-8");

  console.log(
    `[search] Generated search index with ${index.length} documents → ${outputPath}`
  );
}
