import { getAllPosts } from "./getAllPosts"

export function getAdjacentPosts(category: string, slug: string) {

  const posts = getAllPosts()
    .filter((post) => post.category === category)

  const index = posts.findIndex((post) => post.slug === slug)

  const prev = index > 0 ? posts[index - 1] : null
  const next = index < posts.length - 1 ? posts[index + 1] : null

  return { prev, next }
}