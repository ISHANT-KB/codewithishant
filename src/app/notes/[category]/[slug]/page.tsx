import { getNote } from "@/lib/notes/getNote";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/features/article/mdx-components";
import TableOfContents from "@/components/features/article/TableOfContents";
import { getRelatedNotes } from "@/lib/notes/getRelatedNotes";
import Link from "next/link";
import Breadcrumbs from "@/components/features/navigation/Breadcrumbs";
import { getAdjacentNotes } from "@/lib/notes/getAdjacentNotes";

type PageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export default async function NotePost({ params }: PageProps) {
  const { category, slug } = await params;

  const { metadata, content, toc, readingTime } = await getNote(category, slug);

  const related = getRelatedNotes(metadata.tags ?? [], slug);

  const { prev, next } = getAdjacentNotes(category, slug);
  return (
    <div className="flex justify-between max-w-6xl mx-auto gap-10">
      {/* Article */}

      <article className="max-w-3xl">
        <Breadcrumbs
          category={category}
          title={metadata.title}
          basePath="/notes"
        />
        <h1 className="text-4xl font-bold">{metadata.title}</h1>
        {metadata.author} •{" "}
        {new Date(metadata.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}{" "}
        • {readingTime} • {metadata.difficulty}
        <p className="text-gray-500 mt-2 mb-5">{metadata.description}</p>
        <MDXRemote source={content} components={mdxComponents} />
        {/* tags */}
        <div className="flex gap-2 mb-6 mt-12">
          {metadata.tags?.map((tag: string) => (
            <a
              key={tag}
              href={`/tags/${tag}`}
              className="text-sm bg-gray-200 px-2 py-1 rounded"
            >
              {tag}
            </a>
          ))}
        </div>
        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {prev && (
            <Link
              href={`/notes/${category}/${prev.slug}`}
              className="text-blue-600 hover:underline"
            >
              ← {prev.title}
            </Link>
          )}
          {next && (
            <Link
              href={`/notes/${category}/${next.slug}`}
              className="text-blue-600 hover:underline ml-auto"
            >
              {next.title} →
            </Link>
          )}
        </div>
      </article>

      {/* Table of Contents */}
      <aside className="w-64 shrink-0">
        <TableOfContents headings={toc} />
        {/* Related Posts */}
        {related.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Related Notes</h3>
            <ul className="space-y-2">
              {related.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/notes/${post.category}/${post.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}
