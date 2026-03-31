type RawMetadata = {
  title?: string;
  description?: string;
  tags?: string[];
  date?: string;
  difficulty?: string;
  author?: string;
  featured?: boolean;
  draft?: boolean;
  series?: string;
  order?: number;
};

export const DEFAULT_AUTHOR = "Ishant";
export const DEFAULT_DIFFICULTY = "beginner";

export function normalizeContentMetadata(data: RawMetadata) {
  return {
    title: data.title?.trim() || "Untitled",
    description: data.description?.trim() || "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    date: typeof data.date === "string" ? data.date : "",
    difficulty:
      typeof data.difficulty === "string" && data.difficulty.trim()
        ? data.difficulty
        : DEFAULT_DIFFICULTY,
    author:
      typeof data.author === "string" && data.author.trim()
        ? data.author
        : DEFAULT_AUTHOR,
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    series: data.series,
    order: data.order,
  };
}

export function formatPublishedDate(date?: string) {
  if (!date) {
    return null;
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
