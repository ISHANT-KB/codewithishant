import Search from "@/components/features/search/Search";
import { getAllPosts } from "@/lib/blog/getAllPosts";
import Link from "next/link";
import fs from "fs";
import path from "path";

type SearchDocument = {
  id: string;
  title: string;
  description?: string;
  category: string;
  tags: string[];
  slug: string;
  type: "blog" | "notes";
  content: string;
};

export default function BlogPage() {
  const posts = getAllPosts();

  // Load prebuilt search index and filter to blog-only documents
  const indexPath = path.join(process.cwd(), "public", "search-index.json");
  const raw = fs.readFileSync(indexPath, "utf-8");
  const allDocuments: SearchDocument[] = JSON.parse(raw);
  const blogDocuments = allDocuments.filter((doc) => doc.type === "blog");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <Search documents={blogDocuments} />

      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.category}/${post.slug}`}
              className="text-xl font-semibold"
            >
              {post.title}
            </Link>

            <p className="text-gray-600">{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
