import { getPostsByCategory } from "@/lib/getPostsByCategory"
import Link from "next/link"

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {

  const { category } = await params

  const posts = getPostsByCategory(category)

  return (
    <div className="max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        {category}
      </h1>

      <ul className="space-y-3">

        {posts.map((post) => (

          <li key={post.slug}>

            <Link
              href={`/blog/${post.category}/${post.slug}`}
              className="text-blue-600"
            >
              {post.slug}
            </Link>

          </li>

        ))}

      </ul>

    </div>
  )
}