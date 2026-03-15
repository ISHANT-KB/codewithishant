"use client"

import { useState } from "react"
import Fuse from "fuse.js"
import Link from "next/link"

type Post = {
  title: string
  description: string
  slug: string
  category: string
  tags: string[]
}

export default function Search({ posts }: { posts: Post[] }) {

  const [query, setQuery] = useState("")

  const fuse = new Fuse(posts, {
    keys: ["title", "description", "tags"],
    threshold: 0.3,
  })

  const results = query
    ? fuse.search(query).map((r) => r.item)
    : []

  return (

    <div className="max-w-xl mx-auto">

      <input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border p-2 rounded"
      />

      {query && (
        <ul className="mt-4 space-y-2">

          {results.map((post) => (

            <li key={post.slug}>

              <Link
                href={`/blog/${post.category}/${post.slug}`}
                className="text-blue-600"
              >
                {post.title}
              </Link>

            </li>

          ))}

        </ul>
      )}

    </div>

  )
}