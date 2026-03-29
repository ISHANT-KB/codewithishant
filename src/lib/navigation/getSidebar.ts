import fs from "fs";
import path from "path";

export function getSidebar(pagename: string) {
  const blogDir = path.join(process.cwd(), `src/content/${pagename}`);

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
