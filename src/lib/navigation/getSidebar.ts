import fs from "fs"
import path from "path"

export function getSidebar() {  
    const blogDir = path.join(process.cwd(), "src/content/blog")

    const categories = fs.readdirSync(blogDir)

    const sidebar = categories.map((category) => {

        const categoryPath = path.join(blogDir, category)
        const files = fs.readdirSync(categoryPath)

        const posts = files.map((file) => ({
            slug: file.replace(".mdx", ""),
            category
        }))

        return {
            category,
            posts
        }
    })

    return sidebar
}