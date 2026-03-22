import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog/getAllPosts'
import { getAllNotes } from '@/lib/notes/getAllNotes'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://codewithishant.vercel.app'

  const posts = await getAllPosts()
  const notes = await getAllNotes()

  const blogUrls = posts.map(post => ({
    url: `${baseUrl}/blog/${post.category}/${post.slug}`,
    lastModified: new Date(),
  }))

  const notesUrls = notes.map(note => ({
    url: `${baseUrl}/notes/${note.category}/${note.slug}`,
    lastModified: new Date(),
  }))

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
    ...blogUrls,
    ...notesUrls,
  ]
}