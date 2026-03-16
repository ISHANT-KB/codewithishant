import { getAllNotes } from "./getAllNotes";

export function getRelatedNotes(tags: string[], currentSlug: string) {
  const notes = getAllNotes();

  const scoredNotes = notes
    .filter((note) => note.slug !== currentSlug)
    .map((note) => {
      const matchCount = note.tags.filter((tag: string) =>
        tags.includes(tag),
      ).length;

      return {
        ...note,
        score: matchCount,
      };
    })
    .filter((note) => note.score > 0)
    .sort((a, b) => b.score - a.score);

  return scoredNotes.slice(0, 3);
}
