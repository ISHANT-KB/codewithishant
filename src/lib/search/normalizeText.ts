/**
 * Normalizes text for search indexing:
 * - Converts to lowercase
 * - Removes special characters (keeps letters, numbers, spaces)
 * - Collapses multiple whitespace into single space
 * - Trims leading/trailing whitespace
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
