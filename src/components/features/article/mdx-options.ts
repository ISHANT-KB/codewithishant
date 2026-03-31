import { remarkHeadingIds } from "@/lib/content/headings";

export const articleMdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkHeadingIds],
  },
};
