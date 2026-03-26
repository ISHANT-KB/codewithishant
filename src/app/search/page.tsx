import fs from "fs";
import path from "path";
import Search from "@/components/features/search/Search";
import InProgress from "@/components/workInProgress/inProgress";

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

export default function SearchPage() {
  const indexPath = path.join(process.cwd(), "public", "search-index.json");
  const raw = fs.readFileSync(indexPath, "utf-8");
  const documents: SearchDocument[] = JSON.parse(raw);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-6">Search</h1>

      <Search documents={documents} />
      <InProgress/>
    </div>
  );
}
