import { getPostsByCategory } from "@/lib/blog/getPostsByCategory";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  const posts = getPostsByCategory(category);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 capitalize">{category}</h1>

      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.category}/${post.slug}`}
              className="text-xl font-semibold text-blue-600"
            >
              {post.title}
            </Link>

            <p className="text-gray-600">{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
