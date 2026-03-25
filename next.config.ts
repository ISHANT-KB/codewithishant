import createMDX from '@next/mdx'
import { generateSearchIndex } from './src/lib/search/generateIndex'

// Generate / refresh the search index whenever Next.js loads the config
// (i.e. on `next build` and `next dev`).
generateSearchIndex()

const withMDX = createMDX({
  extension: /\.mdx?$/
})

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}

export default withMDX(nextConfig)