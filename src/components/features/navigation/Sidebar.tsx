import Link from "next/link";
import { getSidebar } from "@/lib/navigation/getSidebar";

export default function Sidebar() {
  const sidebar = getSidebar();

  return (
    <aside className="w-50 border-r pr-4">
      {sidebar.map((section) => (
        <div key={section.category} className="mb-6">
          <h3 className="font-bold capitalize mb-2">{section.category}</h3>

          <ul className="space-y-1">
            {section.posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.category}/${post.slug}`}
                  className="text-blue-600"
                >
                  {post.slug}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
