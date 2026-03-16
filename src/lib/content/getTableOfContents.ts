export function getTableOfContents(content: string) {

  const lines = content.split("\n")

  const headings = lines
    .filter((line) => line.startsWith("#"))
    .map((line) => {

      const level = line.match(/^#+/)?.[0].length || 0

      const text = line.replace(/^#+\s*/, "")

      const slug = text
        .toLowerCase()
        .replace(/[^\w]+/g, "-")

      return {
        level,
        text,
        slug,
      }

    })

  return headings
}