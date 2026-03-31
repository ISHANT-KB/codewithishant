"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type PaletteItem = {
  title: string;
  slug: string;
  category: string;
  type: "blog" | "notes";
};

export default function CommandPalette({
  items,
}: {
  items: PaletteItem[];
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const filteredItems = items
    .filter((item) =>
      `${item.title} ${item.category}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
    )
    .slice(0, 10);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 px-4 pt-24"
      onClick={() => setOpen(false)}
    >
      <div
        className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-4 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <input
          type="text"
          placeholder="Search blog posts and notes..."
          className="mb-4 w-full rounded-xl border border-slate-200 p-3 outline-none ring-0 focus:border-blue-500"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <ul className="space-y-2">
          {filteredItems.length === 0 && (
            <li className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
              No matching blog posts or notes yet.
            </li>
          )}

          {filteredItems.map((item) => {
            const basePath = item.type === "blog" ? "/blog" : "/notes";

            return (
              <li key={`${item.type}-${item.category}-${item.slug}`}>
                <Link
                  href={`${basePath}/${item.category}/${item.slug}`}
                  className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-slate-50"
                  onClick={() => setOpen(false)}
                >
                  <div>
                    <p className="font-medium text-slate-900">{item.title}</p>
                    <p className="text-sm capitalize text-slate-500">
                      {item.category}
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs uppercase text-slate-600">
                    {item.type}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
