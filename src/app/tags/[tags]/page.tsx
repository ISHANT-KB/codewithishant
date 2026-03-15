import { getAllTags } from "@/lib/getAllTags"
import Link from "next/link"

type PageProps = {
  params: Promise<{ tags: string }>
}

export default async function TagPage({ params }: PageProps) {

  const { tags: tag } = await params

  const allTags = getAllTags()

  const posts = allTags[tag] || []

  return (

    <div className="max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Tag: {tag}
      </h1>

      <ul className="space-y-3">

        {posts.map((post) => {

          const [category, slug] = post.split("/")

          return (

            <li key={post}>

              <Link
                href={`/blog/${category}/${slug}`}
                className="text-blue-600"
              >
                {slug}
              </Link>

            </li>

          )

        })}

      </ul>

    </div>

  )

}