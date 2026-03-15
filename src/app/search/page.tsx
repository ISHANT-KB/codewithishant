import { getAllPosts } from "@/lib/getAllPosts"
import Search from "@/components/Search"

export default function SearchPage() {

  const posts = getAllPosts()

  return (

    <div className="max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Search
      </h1>

      <Search posts={posts} />

    </div>

  )
}