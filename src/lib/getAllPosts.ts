import fs from "fs"
import path from "path"
import matter from "gray-matter"

interface Post {
  title: string
  description: string
  tags: string[]
  category: string
  slug: string
}

export function getAllPosts() {

  const blogDir = path.join(process.cwd(), "src/content/blog")

  const categories = fs.readdirSync(blogDir)

  const posts: Post[] = []

  categories.forEach((category) => {

    const categoryPath = path.join(blogDir, category)

    const files = fs.readdirSync(categoryPath)

    files.forEach((file) => {

      const slug = file.replace(".mdx", "")

      const filePath = path.join(categoryPath, file)

      const source = fs.readFileSync(filePath, "utf8")

      const { data } = matter(source)

      posts.push({
        title: data.title,
        description: data.description,
        tags: data.tags ?? [],
        category,
        slug
      })

    })

  })

  return posts

}