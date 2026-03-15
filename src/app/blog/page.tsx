import Search from "@/components/Search"
import { getAllPosts } from "@/lib/getAllPosts"
import Link from "next/link"

export default function BlogPage() {

  const posts = getAllPosts()

  return (

    <div className="max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Blog
      </h1>
      <Search posts={posts} />

      <ul className="space-y-6">

        {posts.map((post) => (

          <li key={post.slug}>

            <Link
              href={`/blog/${post.category}/${post.slug}`}
              className="text-xl font-semibold"
            >
              {post.title}
            </Link>

            <p className="text-gray-600">
              {post.description}
            </p>

          </li>

        ))}

      </ul>

    </div>

  )
}