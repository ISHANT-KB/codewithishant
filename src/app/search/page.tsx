import fs from "fs";
import path from "path";
import Search from "@/components/features/search/Search";

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

type PageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;
  const indexPath = path.join(process.cwd(), "public", "search-index.json");
  const raw = fs.readFileSync(indexPath, "utf-8");
  const documents: SearchDocument[] = JSON.parse(raw);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      <p className="mb-6 text-gray-600">
        Search across blog posts and notes from one place.
      </p>

      <Search documents={documents} initialQuery={q} />
    </div>
  );
}
