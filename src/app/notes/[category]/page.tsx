import { getNotesByCategory } from "@/lib/getNotesByCategory";
import Link from "next/link";

type PageProps = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  const notes = getNotesByCategory(category);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 capitalize">{category}</h1>

      <ul className="space-y-6">
        {notes.map((note) => (
          <li key={note.slug}>
            <Link
              href={`/notes/${note.category}/${note.slug}`}
              className="text-xl font-semibold text-blue-600"
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
