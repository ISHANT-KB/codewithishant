import fs from "fs"
import path from "path"
import matter from "gray-matter"

export function getPostsByCategory(category: string) {

  const categoryPath = path.join(
    process.cwd(),
    "src/content/blog",
    category
  )

  const files = fs.readdirSync(categoryPath)

  const posts = files.map((file) => {

    const slug = file.replace(".mdx", "")

    const filePath = path.join(categoryPath, file)

    const fileContent = fs.readFileSync(filePath, "utf-8")

    const { data } = matter(fileContent)

    return {
      slug,
      category,
      title: data.title,
      description: data.description,
      tags: data.tags ?? []
    }
  })

  return posts
}