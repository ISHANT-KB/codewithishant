import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import TableOfContents from "@/components/features/article/TableOfContents";
import { mdxComponents } from "@/components/features/article/mdx-components";
import { articleMdxOptions } from "@/components/features/article/mdx-options";
import Breadcrumbs from "@/components/features/navigation/Breadcrumbs";
import { formatPublishedDate } from "@/lib/content/metadata";
import { getAdjacentPosts } from "@/lib/blog/getAdjacentPosts";
import { getPost } from "@/lib/blog/getPost";
import { getRelatedPosts } from "@/lib/blog/getRelatedPosts";

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
  const post = getPost(category, slug);

  if (!post) {
    return {};
  }

  const { metadata } = post;

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.tags,
    alternates: {
      canonical: `/blog/${category}/${slug}`,
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `https://codewithishant.vercel.app/blog/${category}/${slug}`,
      type: "article",
      publishedTime: metadata.date || undefined,
      authors: [metadata.author],
      tags: metadata.tags,
      images: [
        {
          url: "https://codewithishant.vercel.app/og-image.svg",
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
      images: ["https://codewithishant.vercel.app/og-image.svg"],
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { category, slug } = await params;
  const post = getPost(category, slug);

  if (!post) {
    notFound();
  }

  const { metadata, content, toc, readingTime } = post;
  const related = getRelatedPosts(metadata.tags ?? [], slug);
  const { prev, next } = getAdjacentPosts(category, slug);
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
                  url: "https://codewithishant.vercel.app/logo.svg",
                },
              },
              url: `https://codewithishant.vercel.app/blog/${category}/${slug}`,
              keywords: metadata.tags?.join(", "),
              articleSection: category,
            }),
          }}
        />

        <Breadcrumbs category={category} title={metadata.title} />
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

        {related.length > 0 && (
          <div className="mt-5 border-t pt-6">
            <h2 className="mb-4 text-xl font-semibold">Related Articles</h2>

            <ul className="space-y-2">
              {related.map((relatedPost) => (
                <li key={relatedPost.slug}>
                  <Link
                    href={`/blog/${relatedPost.category}/${relatedPost.slug}`}
                    className="text-blue-600"
                  >
                    {relatedPost.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 flex justify-between border-t pt-6">
          {prev ? (
            <Link
              href={`/blog/${prev.category}/${prev.slug}`}
              className="text-blue-600"
            >
              {"<-"} {prev.title}
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/blog/${next.category}/${next.slug}`}
              className="text-blue-600"
            >
              {next.title} {"->"}
            </Link>
          ) : null}
        </div>
      </article>

      <div className="hidden w-64 lg:block">
        <TableOfContents headings={toc} />
      </div>
    </div>
  );
}
