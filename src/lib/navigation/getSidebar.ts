import fs from "fs";
import path from "path";

export function getSidebar() {
  const blogDir = path.join(process.cwd(), "src/content/blog");

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const categories = fs
    .readdirSync(blogDir)
    .filter((entry) => fs.statSync(path.join(blogDir, entry)).isDirectory());

  const sidebar = categories.map((category) => {
    const categoryPath = path.join(blogDir, category);
    const files = fs.readdirSync(categoryPath);

    const posts = files.map((file) => ({
      slug: file.replace(".mdx", ""),
      category,
    }));

    return {
      category,
      posts,
    };
  });

  return sidebar;
}
