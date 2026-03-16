"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type Post = {
  title: string
  slug: string
  category: string
}

export default function CommandPalette({ posts }: { posts: Post[] }) {

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  useEffect(() => {

    function handleKey(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKey)

    return () => window.removeEventListener("keydown", handleKey)

  }, [])

 const filtered = posts.filter((post) =>
  (post.title || "").toLowerCase().includes(query.toLowerCase())
)

  if (!open) return null

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-24">

      <div className="bg-white w-150 rounded-lg p-4">

        <input
          type="text"
          placeholder="Search articles..."
          className="w-full border p-2 mb-4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <ul className="space-y-2">

          {filtered.map((post) => (

            <li key={post.slug}>

              <Link
                href={`/blog/${post.category}/${post.slug}`}
                className="block p-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                {post.title}
              </Link>

            </li>

          ))}

        </ul>

      </div>

    </div>

  )

}