import { extractHeadings } from "./headings";

export function getTableOfContents(content: string) {
  return extractHeadings(content);
}
