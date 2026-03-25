import { getAllPosts } from "@/lib/blog/getAllPosts";
import { getAllNotes } from "@/lib/notes/getAllNotes";
import { getAllTags } from "@/lib/content/getAllTags";
import Link from "next/link";

export default function ExplorePage() {
  const posts = getAllPosts();
  const notes = getAllNotes();
  const tags = getAllTags();

  const latestPosts = posts.slice(0, 5);
  const latestNotes = notes.slice(0, 5);
  const popularTags = tags.slice(0, 10);

  return (
    <div className="max-w-5xl mx-auto space-y-12 md:space-y-16 px-4 sm:px-6">
      <h1 className="text-3xl font-bold">Explore Content</h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">Latest Blog Posts</h2>
        <div className="space-y-2">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.category}/${post.slug}`}
              className="block p-4 border rounded hover:bg-gray-50"
            >
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Latest Notes</h2>
        <div className="space-y-2">
          {latestNotes.map((note) => (
            <Link
              key={note.slug}
              href={`/notes/${note.category}/${note.slug}`}
              className="block p-4 border rounded hover:bg-gray-50"
            >
              <h3 className="font-semibold">{note.title}</h3>
              <p className="text-sm text-gray-600">{note.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Popular Tags</h2>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Link
              key={tag.name}
              href={`/tags/${tag.name}`}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200"
            >
              {tag.name} ({tag.count})
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
