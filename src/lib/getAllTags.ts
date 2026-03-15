import fs from "fs"
import path from "path"
import matter from "gray-matter"

export function getAllTags() {

  const blogDir = path.join(process.cwd(), "src/content/blog")

  const categories = fs.readdirSync(blogDir)

  const tags: Record<string, string[]> = {}

  categories.forEach((category) => {

    const categoryPath = path.join(blogDir, category)

    const files = fs.readdirSync(categoryPath)

    files.forEach((file) => {

      const filePath = path.join(categoryPath, file)

      const source = fs.readFileSync(filePath, "utf8")

      const { data } = matter(source)

      const slug = file.replace(".mdx", "")

      if (data.tags) {

        data.tags.forEach((tag: string) => {

          if (!tags[tag]) tags[tag] = []

          tags[tag].push(`${category}/${slug}`)

        })

      }

    })

  })

  return tags
}