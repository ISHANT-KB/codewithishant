import type { Post } from "../../types/content";
import type { Note } from "../../types/content";
import { extractTextFromMdx } from "./extractTextFromMdx";
import { normalizeText } from "./normalizeText";

export type SearchDocument = {
  id: string;
  title: string;
  description?: string;
  category: string;
  tags: string[];
  slug: string;
  type: "blog" | "notes";
  content: string;
};

/**
 * Builds a unified search index from blog posts and notes.
 * Extracts plain text from MDX content and normalizes it.
 */
export function buildSearchIndex(
  posts: Post[],
  notes: Note[]
): SearchDocument[] {
  const blogDocuments: SearchDocument[] = posts.map((post) => ({
    id: `blog-${post.category}-${post.slug}`,
    title: post.title,
    description: post.description,
    category: post.category,
    tags: post.tags,
    slug: post.slug,
    type: "blog",
    content: normalizeText(extractTextFromMdx(post.content ?? "")),
  }));

  const noteDocuments: SearchDocument[] = notes.map((note) => ({
    id: `notes-${note.category}-${note.slug}`,
    title: note.title,
    description: note.description,
    category: note.category,
    tags: note.tags,
    slug: note.slug,
    type: "notes",
    content: normalizeText(extractTextFromMdx(note.content ?? "")),
  }));

  return [...blogDocuments, ...noteDocuments];
}
