"use client";

import { useState } from "react";
import Fuse from "fuse.js";
import Link from "next/link";

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

type SearchProps = {
  documents: SearchDocument[];
};

const fuseOptions = {
  keys: [
    { name: "title" as const, weight: 0.4 },
    { name: "tags" as const, weight: 0.2 },
    { name: "category" as const, weight: 0.1 },
    { name: "description" as const, weight: 0.1 },
    { name: "content" as const, weight: 0.2 },
  ],
  threshold: 0.3,
};

export default function Search({ documents }: SearchProps) {
  const [query, setQuery] = useState("");

  const fuse = new Fuse(documents, fuseOptions);
  const results = query ? fuse.search(query).map((r) => r.item) : [];

  return (
    <div className="max-w-xl mx-auto px-4">
      <input
        type="text"
        placeholder="Search articles & notes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border p-2 rounded-4xl"
      />

      {query && (
        <ul className="mt-4 space-y-2">
          {results.length === 0 && (
            <li className="text-gray-500">No results found.</li>
          )}
          {results.map((doc) => {
            const basePath = doc.type === "blog" ? "/blog" : "/notes";
            return (
              <li key={doc.id} className="flex items-center gap-2">
                <span className="text-xs uppercase px-2 py-0.5 rounded bg-gray-200 text-gray-600">
                  {doc.type}
                </span>
                <Link
                  href={`${basePath}/${doc.category}/${doc.slug}`}
                  className="text-blue-600"
                >
                  {doc.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
