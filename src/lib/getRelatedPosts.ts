import { getAllPosts } from "./getAllPosts"

export function getRelatedPosts(tags: string[], currentSlug: string) {

  const posts = getAllPosts()

  const scoredPosts = posts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {

      const matchCount = post.tags.filter((tag: string) =>
        tags.includes(tag)
      ).length

      return {
        ...post,
        score: matchCount
      }

    })
    .filter((post) => post.score > 0)
    .sort((a, b) => b.score - a.score)

  return scoredPosts.slice(0, 3)
}