import Search from "@/components/features/search/Search";
import { getAllNotes } from "@/lib/notes/getAllNotes";
import Link from "next/link";

export default function NotePage() {
  const notes = getAllNotes();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Notes</h1>
      <Search posts={notes} basePath="/notes" />

      <ul className="space-y-6">
        {notes.map((note) => (
          <li key={note.slug}>
            <Link
              href={`/notes/${note.category}/${note.slug}`}
              className="text-xl font-semibold"
            >
              {note.title}
            </Link>

            <p className="text-gray-600">{note.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
