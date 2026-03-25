import Fuse from "fuse.js";
import type { SearchDocument } from "./buildSearchIndex";

const fuseOptions = {
  keys: [
    { name: "title" as const, weight: 0.4 },
    { name: "tags" as const, weight: 0.2 },
    { name: "category" as const, weight: 0.1 },
    { name: "description" as const, weight: 0.1 },
    { name: "content" as const, weight: 0.2 },
  ],
  threshold: 0.3,
  includeScore: true,
};

/**
 * Creates a Fuse.js search instance from the prebuilt search index.
 */
export function createSearchInstance(
  documents: SearchDocument[]
): Fuse<SearchDocument> {
  return new Fuse(documents, fuseOptions);
}

/**
 * Searches the index and returns matching documents.
 */
export function searchIndex(
  documents: SearchDocument[],
  query: string
): SearchDocument[] {
  const fuse = createSearchInstance(documents);
  return fuse.search(query).map((result) => result.item);
}

