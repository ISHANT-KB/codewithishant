import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog/getAllPosts";
import { getAllNotes } from "@/lib/notes/getAllNotes";
import { getAllTags } from "@/lib/content/getAllTags";
import type { Note, Post } from "@/types/content";
import Link from "next/link";

// ─── Page-level Metadata ─────────────────────────────────────────────────────
// Overrides the layout's `template` → renders as "Home | Code with Ishant"
// This also sets a unique canonical URL for the homepage.
export const metadata: Metadata = {
  title: "Home",
  description:
    "Explore programming tutorials, quick notes, and tech insights on JavaScript, Python, React, Next.js and more. Written by Ishant.",
  alternates: {
    canonical: "https://codewithishant.vercel.app",
  },
  openGraph: {
    title: "Code with Ishant – Learn Programming & Tech",
    description:
      "Explore programming tutorials, quick notes, and tech insights.",
    url: "https://codewithishant.vercel.app",
    images: ["/og-image.svg"],
  },
};

// ─── Structured Data (JSON-LD) ────────────────────────────────────────────────
// JSON-LD tells Google rich facts about the page — eligible for rich results.

// Renders the homepage's JSON-LD blocks server-side (zero JS cost).
function HomePageJsonLd({
  posts,
  notes,
}: {
  posts: Post[];
  notes: Note[];
}) {
  const BASE = "https://codewithishant.vercel.app";

  // 1️⃣ Person schema — helps Google associate content with a real author.
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ishant",
    url: BASE,
    sameAs: [
      // Add your social profile URLs here so Google can verify authorship:
      // "https://twitter.com/yourtwitterhandle",
      // "https://github.com/yourgithub",
      // "https://linkedin.com/in/yourlinkedin",
    ],
  };

  // 2️⃣ ItemList schema for blog posts — eligible for a rich carousel in results.
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Latest Blog Posts",
    url: `${BASE}/blog`,
    itemListElement: posts.slice(0, 5).map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE}/blog/${post.category}/${post.slug}`,
      name: post.title,
    })),
  };

  // 3️⃣ ItemList schema for notes — same idea, separate list.
  const notesListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Latest Notes",
    url: `${BASE}/notes`,
    itemListElement: notes.slice(0, 5).map((note, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE}/notes/${note.category}/${note.slug}`,
      name: note.title,
    })),
  };

  // 4️⃣ BreadcrumbList — Homepage breadcrumb (tells Google this is the root).
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(notesListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function Home() {
  const posts = getAllPosts();
  const notes = getAllNotes();
  const tags = getAllTags();

  const featured = posts.filter((post) => post.featured);
  const latestPosts = posts.slice(0, 5);
  const latestNotes = notes.slice(0, 5);
  const popularTags = tags.slice(0, 10);

  return (
    <>
      {/* Inject all JSON-LD blocks for this page */}
      <HomePageJsonLd posts={latestPosts} notes={latestNotes} />

      {/*
        Use <article> or semantic containers.
        The "itemScope / itemType" attributes add Microdata as a belt-and-suspenders
        fallback alongside JSON-LD — Google understands both.
      */}
      <div
        className="max-w-5xl mx-auto space-y-12 md:space-y-20 px-4 sm:px-6"
        itemScope
        itemType="https://schema.org/WebPage"
      >

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        {/*
          <h1> should appear once per page and contain the primary keyword.
          It does NOT have to match <title> exactly — it just needs to be
          descriptive and keyword-rich.
        */}
        <header className="text-center py-10">
          <h1
            className="text-4xl font-bold mb-4"
            itemProp="headline"
          >
            Learn Programming & Web Development with Ishant
          </h1>
          <p
            className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto"
            itemProp="description"
          >
            Tutorials, quick notes, and deep-dives on JavaScript, Python,
            React, Next.js, and more — all in one place.
          </p>
          <Link
            href="/explore"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Explore all programming tutorials and notes"
          >
            Explore All Content
          </Link>
        </header>

        {/* ── Featured Articles ─────────────────────────────────────────── */}
        {featured.length > 0 && (
          <section aria-labelledby="featured-heading">
            <h2 id="featured-heading" className="text-2xl font-bold mb-6">
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map((post) => (
                <article
                  key={post.slug}
                  itemScope
                  itemType="https://schema.org/BlogPosting"
                >
                  <Link
                    href={`/blog/${post.category}/${post.slug}`}
                    className="block p-6 border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={`Read featured article: ${post.title}`}
                  >
                    <h3
                      className="text-xl font-semibold mb-2"
                      itemProp="headline"
                    >
                      {post.title}
                    </h3>
                    <p className="text-gray-600" itemProp="description">
                      {post.description}
                    </p>
                    {/* Hidden meta for crawlers */}
                    <meta
                      itemProp="url"
                      content={`https://codewithishant.vercel.app/blog/${post.category}/${post.slug}`}
                    />
                    {post.date && (
                      <meta itemProp="datePublished" content={post.date} />
                    )}
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ── Latest Blog Posts ─────────────────────────────────────────── */}
        <section aria-labelledby="latest-posts-heading">
          <h2 id="latest-posts-heading" className="text-2xl font-bold mb-4">
            Latest Blog Posts
          </h2>
          {/*
            Use <ol> (ordered list) for sequential content — signals to Google
            that order is meaningful, which improves list-snippet eligibility.
          */}
          <ol className="space-y-2 list-none">
            {latestPosts.map((post) => (
              <li key={post.slug}>
                <article
                  itemScope
                  itemType="https://schema.org/BlogPosting"
                >
                  <Link
                    href={`/blog/${post.category}/${post.slug}`}
                    className="block p-4 border rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <h3
                      className="font-semibold"
                      itemProp="headline"
                    >
                      {post.title}
                    </h3>
                    <p
                      className="text-sm text-gray-600"
                      itemProp="description"
                    >
                      {post.description}
                    </p>
                    <meta
                      itemProp="url"
                      content={`https://codewithishant.vercel.app/blog/${post.category}/${post.slug}`}
                    />
                    {post.date && (
                      <meta itemProp="datePublished" content={post.date} />
                    )}
                  </Link>
                </article>
              </li>
            ))}
          </ol>
          <p className="mt-3">
            <Link
              href="/blog"
              className="text-blue-600 hover:underline text-sm font-medium"
              aria-label="View all blog posts"
            >
              View all posts →
            </Link>
          </p>
        </section>

        {/* ── Latest Notes ──────────────────────────────────────────────── */}
        <section aria-labelledby="latest-notes-heading">
          <h2 id="latest-notes-heading" className="text-2xl font-bold mb-4">
            Latest Notes
          </h2>
          <ol className="space-y-2 list-none">
            {latestNotes.map((note) => (
              <li key={note.slug}>
                <article
                  itemScope
                  itemType="https://schema.org/TechArticle"
                >
                  <Link
                    href={`/notes/${note.category}/${note.slug}`}
                    className="block p-4 border rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <h3
                      className="font-semibold"
                      itemProp="headline"
                    >
                      {note.title}
                    </h3>
                    <p
                      className="text-sm text-gray-600"
                      itemProp="description"
                    >
                      {note.description}
                    </p>
                    <meta
                      itemProp="url"
                      content={`https://codewithishant.vercel.app/notes/${note.category}/${note.slug}`}
                    />
                  </Link>
                </article>
              </li>
            ))}
          </ol>
          <p className="mt-3">
            <Link
              href="/notes"
              className="text-blue-600 hover:underline text-sm font-medium"
              aria-label="View all notes"
            >
              View all notes →
            </Link>
          </p>
        </section>

        {/* ── Popular Tags ──────────────────────────────────────────────── */}
        <section aria-labelledby="tags-heading">
          <h2 id="tags-heading" className="text-2xl font-bold mb-4">
            Popular Tags
          </h2>
          {/*
            nav + aria-label makes this a landmark region that screen readers
            and Google both recognise as site navigation.
          */}
          <nav aria-label="Content tags">
            <ul className="flex flex-wrap gap-2 list-none p-0">
              {popularTags.map((tag) => (
                <li key={tag.name}>
                  <Link
                    href={`/tags/${encodeURIComponent(tag.name)}`}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rel="tag"
                    aria-label={`Browse ${tag.count} ${tag.name} posts`}
                  >
                    {tag.name}{" "}
                    <span className="opacity-70">({tag.count})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>

      </div>
    </>
  );
}
