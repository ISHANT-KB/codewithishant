import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import { visit } from "unist-util-visit";
import type { Node } from "unist";

export type Heading = {
  level: number;
  text: string;
  slug: string;
};

type ParentNode = Node & {
  children?: Node[];
  depth?: number;
  data?: {
    hProperties?: Record<string, string>;
  };
};

type ValueNode = Node & {
  value?: string;
};

function getNodeText(node: Node): string {
  const valueNode = node as ValueNode;

  if (typeof valueNode.value === "string") {
    return valueNode.value;
  }

  const parentNode = node as ParentNode;

  if (!parentNode.children?.length) {
    return "";
  }

  return parentNode.children.map(getNodeText).join("");
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createHeadingSlugger() {
  const slugCounts = new Map<string, number>();

  return (text: string) => {
    const baseSlug = slugifyHeading(text) || "section";
    const count = slugCounts.get(baseSlug) ?? 0;

    slugCounts.set(baseSlug, count + 1);

    return count === 0 ? baseSlug : `${baseSlug}-${count}`;
  };
}

function createHeadingTree(content: string) {
  return unified().use(remarkParse).use(remarkMdx).parse(content);
}

export function extractHeadings(content: string): Heading[] {
  const tree = createHeadingTree(content);
  const getSlug = createHeadingSlugger();
  const headings: Heading[] = [];

  visit(tree, "heading", (node: Node) => {
    const headingNode = node as ParentNode;
    const text = getNodeText(headingNode).trim();

    if (!text) {
      return;
    }

    headings.push({
      level: headingNode.depth ?? 0,
      text,
      slug: getSlug(text),
    });
  });

  return headings;
}

export function remarkHeadingIds() {
  return (tree: Node) => {
    const getSlug = createHeadingSlugger();

    visit(tree, "heading", (node: Node) => {
      const headingNode = node as ParentNode;
      const text = getNodeText(headingNode).trim();

      if (!text) {
        return;
      }

      const slug = getSlug(text);

      headingNode.data ??= {};
      headingNode.data.hProperties ??= {};
      headingNode.data.hProperties.id = slug;
    });
  };
}
