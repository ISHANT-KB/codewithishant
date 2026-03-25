import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import { visit } from "unist-util-visit";
import type { Node } from "unist";

interface TextNode extends Node {
  type: "text";
  value: string;
}

function isTextNode(node: Node): node is TextNode {
  return node.type === "text";
}

/**
 * Extracts plain text from raw MDX content by parsing
 * the AST and collecting only text nodes.
 */
export function extractTextFromMdx(mdxContent: string): string {
  const tree = unified().use(remarkParse).use(remarkMdx).parse(mdxContent);

  const textParts: string[] = [];

  visit(tree, (node: Node) => {
    if (isTextNode(node)) {
      textParts.push(node.value);
    }
  });

  return textParts.join(" ");
}
