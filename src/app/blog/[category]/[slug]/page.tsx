import { getPost } from "@/lib/blog/getPost";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/features/article/mdx-components";
import TableOfContents from "@/components/features/article/TableOfContents";
import { getRelatedPosts } from "@/lib/blog/getRelatedPosts";
import Link from "next/link";
import Breadcrumbs from "@/components/features/navigation/Breadcrumbs";
import { getAdjacentPosts } from "@/lib/blog/getAdjacentPosts";

type PageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export default async function BlogPost({ params }: PageProps) {
  const { category, slug } = await params;

  const { metadata, content, toc, readingTime } = await getPost(category, slug);

  const related = getRelatedPosts(metadata.tags ?? [], slug);

  const { prev, next } = getAdjacentPosts(category, slug);
  return (
    <div className="flex justify-between max-w-6xl mx-auto gap-10">
      {/* Article */}

      <article className="max-w-3xl">
        <Breadcrumbs category={category} title={metadata.title} />
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
        {/* related articles */}
        {related.length > 0 && (
          <div className="mt-5 border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Related Articles</h2>

            <ul className="space-y-2">
              {related.map(
                (post: { slug: string; category: string; title: string }) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.category}/${post.slug}`}
                      className="text-blue-600"
                    >
                      {post.title}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        )}
        <div className="mt-12 border-t pt-6 flex justify-between">
          {prev ? (
            <Link
              href={`/blog/${prev.category}/${prev.slug}`}
              className="text-blue-600"
            >
              ← {prev.title}
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/blog/${next.category}/${next.slug}`}
              className="text-blue-600"
            >
              {next.title} →
            </Link>
          ) : null}
        </div>
      </article>

      {/* Table of contents */}
      <div className="w-64 hidden lg:block">
        <TableOfContents headings={toc} />
      </div>
    </div>
  );
}
