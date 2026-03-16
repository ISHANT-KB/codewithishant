import { getAllNotes } from "./getAllNotes";

export function getAdjacentNotes(category: string, slug: string) {
  const notes = getAllNotes().filter((note) => note.category === category);

  const index = notes.findIndex((note) => note.slug === slug);

  const prev = index > 0 ? notes[index - 1] : null;
  const next = index < notes.length - 1 ? notes[index + 1] : null;

  return { prev, next };
}
