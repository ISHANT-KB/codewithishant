import { getAllPosts } from "@/lib/blog/getAllPosts";

export default function sitemap() {
  const posts = getAllPosts();

  const urls = posts.map((post) => ({
    url: `https://codewithishant.com/blog/${post.category}/${post.slug}`,
  }));

  return urls;
}
