import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog/getAllPosts";
import { getAllNotes } from "@/lib/notes/getAllNotes";
import { getAllTags } from "@/lib/content/getAllTags";

export const revalidate = 86400; // revalidate every 24 hours

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://codewithishant.vercel.app";

  const posts = getAllPosts();
  const notes = getAllNotes();
  const tags = getAllTags();

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.category}/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
  }));

  const notesUrls = notes.map((note) => ({
    url: `${baseUrl}/notes/${note.category}/${note.slug}`,
    lastModified: note.date ? new Date(note.date) : new Date(),
  }));

  const tagUrls = tags.map((tag) => ({
    url: `${baseUrl}/tags/${encodeURIComponent(tag.name)}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
    },
    ...blogUrls,
    ...notesUrls,
    ...tagUrls,
  ];
}
