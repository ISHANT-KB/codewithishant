import { getAllPosts } from "@/lib/getAllPosts"
import Link from "next/link"

export default function Home() {

  const posts = getAllPosts()

  const featured = posts.filter(
    (post) => post.featured
  )

  const latest = posts.slice(0,5)

  return (

    <div className="max-w-5xl mx-auto space-y-10">

      <section>

        <h2 className="text-2xl font-bold mb-4">
          Featured
        </h2>

        {featured.map((post) => (

          <Link
            key={post.slug}
            href={`/blog/${post.category}/${post.slug}`}
          >
            {post.title}
          </Link>

        ))}

      </section>


      <section>

        <h2 className="text-2xl font-bold mb-4">
          Latest Articles
        </h2>

        {latest.map((post) => (

          <Link
            key={post.slug}
            href={`/blog/${post.category}/${post.slug}`}
          >
            {post.title}
          </Link>

        ))}

      </section>

    </div>
  )
}