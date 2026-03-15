import fs from "fs"
import path from "path"

export function getPostsByCategory(category: string) {

  const categoryPath = path.join(
    process.cwd(),
    "src/content/blog",
    category
  )

  if (!fs.existsSync(categoryPath)) {
    return []
  }

  const files = fs.readdirSync(categoryPath)

  const posts = files.map((file) => {
    return {
      slug: file.replace(".mdx", ""),
      category
    }
  })

  return posts
}