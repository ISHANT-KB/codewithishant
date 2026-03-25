import { getAllPosts } from "@/lib/blog/getAllPosts";
import { getAllNotes } from "@/lib/notes/getAllNotes";
import { getAllTags } from "@/lib/content/getAllTags";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();
  const notes = getAllNotes();
  const tags = getAllTags();

  const featured = posts.filter((post) => post.featured);
  const latestPosts = posts.slice(0, 5);
  const latestNotes = notes.slice(0, 5);
  const popularTags = tags.slice(0, 10);

  return (
    <div className="max-w-5xl mx-auto space-y-12 md:space-y-20 px-4 sm:px-6">
      {/* Hero Section */}
      <section className="text-center py-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to CodeWithIshant</h1>
        <p className="text-lg text-gray-600 mb-6">
          A knowledge base for programming tutorials, notes, and insights.
        </p>
        <Link
          href="/explore"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Explore All Content
        </Link>
      </section>

      {/* Featured Articles */}
      {featured.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.category}/${post.slug}`}
                className="block p-6 border rounded-lg hover:bg-gray-50"
              >
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600">{post.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Latest Blog Posts */}
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

      {/* Latest Notes */}
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

      {/* Popular Tags */}
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
