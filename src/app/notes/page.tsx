import Search from "@/components/features/search/Search";
import { getAllNotes } from "@/lib/notes/getAllNotes";
import Link from "next/link";
import fs from "fs";
import path from "path";

type SearchDocument = {
  id: string;
  title: string;
  description?: string;
  category: string;
  tags: string[];
  slug: string;
  type: "blog" | "notes";
  content: string;
};

export default function NotePage() {
  const notes = getAllNotes();

  // Load prebuilt search index and filter to notes-only documents
  const indexPath = path.join(process.cwd(), "public", "search-index.json");
  const raw = fs.readFileSync(indexPath, "utf-8");
  const allDocuments: SearchDocument[] = JSON.parse(raw);
  const noteDocuments = allDocuments.filter((doc) => doc.type === "notes");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-6">Notes</h1>
      <Search documents={noteDocuments} />

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
