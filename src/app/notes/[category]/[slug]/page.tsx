import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import TableOfContents from "@/components/features/article/TableOfContents";
import { mdxComponents } from "@/components/features/article/mdx-components";
import { articleMdxOptions } from "@/components/features/article/mdx-options";
import Breadcrumbs from "@/components/features/navigation/Breadcrumbs";
import { formatPublishedDate } from "@/lib/content/metadata";
import { getAdjacentNotes } from "@/lib/notes/getAdjacentNotes";
import { getNote } from "@/lib/notes/getNote";
import { getRelatedNotes } from "@/lib/notes/getRelatedNotes";

type PageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const note = getNote(category, slug);

  if (!note) {
    return {};
  }

  const { metadata } = note;

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.tags,
    alternates: {
      canonical: `/notes/${category}/${slug}`,
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `https://codewithishant.vercel.app/notes/${category}/${slug}`,
      type: "article",
      publishedTime: metadata.date || undefined,
      authors: [metadata.author],
      tags: metadata.tags,
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: ["/og-image.svg"],
    },
  };
}

export default async function NotePost({ params }: PageProps) {
  const { category, slug } = await params;
  const note = getNote(category, slug);

  if (!note) {
    notFound();
  }

  const { metadata, content, toc, readingTime } = note;
  const related = getRelatedNotes(metadata.tags ?? [], slug);
  const { prev, next } = getAdjacentNotes(category, slug);
  const metaItems = [
    metadata.author,
    formatPublishedDate(metadata.date),
    readingTime,
    metadata.difficulty,
  ].filter(Boolean);

  return (
    <div className="flex flex-col lg:flex-row justify-between max-w-6xl mx-auto gap-10 px-4 sm:px-6">
      <article className="max-w-3xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: metadata.title,
              description: metadata.description,
              author: {
                "@type": "Person",
                name: metadata.author,
              },
              datePublished: metadata.date || undefined,
              dateModified: metadata.date || undefined,
              publisher: {
                "@type": "Organization",
                name: "Code with Ishant",
                logo: {
                  "@type": "ImageObject",
                  url: "/logo.svg",
                },
              },
              url: `https://codewithishant.vercel.app/notes/${category}/${slug}`,
              keywords: metadata.tags?.join(", "),
              articleSection: category,
            }),
          }}
        />

        <Breadcrumbs
          category={category}
          title={metadata.title}
          basePath="/notes"
        />
        <h1 className="text-4xl font-bold">{metadata.title}</h1>
        <p className="mt-3 text-sm text-gray-600">{metaItems.join(" • ")}</p>
        <p className="mt-2 mb-5 text-gray-500">{metadata.description}</p>

        <MDXRemote
          source={content}
          components={mdxComponents}
          options={articleMdxOptions}
        />

        <div className="mt-12 mb-6 flex flex-wrap gap-2">
          {metadata.tags?.map((tag: string) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="rounded bg-gray-200 px-2 py-1 text-sm"
            >
              {tag}
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          {prev && (
            <Link
              href={`/notes/${category}/${prev.slug}`}
              className="text-blue-600 hover:underline"
            >
              {"<-"} {prev.title}
            </Link>
          )}
          {next && (
            <Link
              href={`/notes/${category}/${next.slug}`}
              className="ml-auto text-blue-600 hover:underline"
            >
              {next.title} {"->"}
            </Link>
          )}
        </div>
      </article>

      <aside className="hidden w-64 shrink-0 lg:block">
        <TableOfContents headings={toc} />

        {related.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 text-lg font-semibold">Related Notes</h3>
            <ul className="space-y-2">
              {related.map((relatedNote) => (
                <li key={relatedNote.slug}>
                  <Link
                    href={`/notes/${relatedNote.category}/${relatedNote.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {relatedNote.title}
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
