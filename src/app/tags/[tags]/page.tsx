import { getAllPosts } from "@/lib/blog/getAllPosts";
import { getAllNotes } from "@/lib/notes/getAllNotes";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ tags: string }>;
};

export default async function TagPage({ params }: PageProps) {
  const { tags: tag } = await params;

  const posts = getAllPosts().filter((post) => post.tags.includes(tag));
  const notes = getAllNotes().filter((note) => note.tags.includes(tag));

  if (posts.length === 0 && notes.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-6">Tag: {tag}</h1>

      <div className="space-y-6">
        {posts.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-3">Blog Posts</h2>
            <ul className="space-y-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.category}/${post.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {notes.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-3">Notes</h2>
            <ul className="space-y-3">
              {notes.map((note) => (
                <li key={note.slug}>
                  <Link
                    href={`/notes/${note.category}/${note.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {note.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
