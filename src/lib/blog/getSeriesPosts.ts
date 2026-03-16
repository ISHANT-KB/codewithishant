import { Post } from "@/types/content";
import { getAllPosts } from "./getAllPosts";

export function getSeriesPosts(series: string): Post[] {
  const posts = getAllPosts();
  return posts
    .filter((post) => post.series === series)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}
