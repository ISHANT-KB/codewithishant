import React from "react";
import CodeBlock from "./CodeBlock";

interface PreProps {
  children: React.ReactElement<{ children: string; className?: string }>;
}

export const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="scroll-mt-24 text-4xl font-bold mt-10 mb-4 text-gray-900" {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="scroll-mt-24 text-3xl font-semibold mt-10 mb-4 text-gray-900" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="scroll-mt-24 text-2xl font-semibold mt-8 mb-4 text-gray-900" {...props} />,
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h4 className="scroll-mt-24 text-xl font-semibold mt-8 mb-4 text-gray-900" {...props} />,
  h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h5 className="scroll-mt-24 text-lg font-semibold mt-6 mb-4 text-gray-900" {...props} />,
  h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h6 className="scroll-mt-24 text-base font-semibold mt-6 mb-4 text-gray-900" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="mb-4 leading-relaxed text-gray-800" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc list-inside mb-4 space-y-2 text-gray-800" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-800" {...props} />,
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="" {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="text-blue-600 hover:text-blue-800 hover:underline" {...props} />,
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 py-1 italic text-gray-700 my-6 bg-gray-50 rounded-r" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => <strong className="font-semibold text-gray-900" {...props} />,
  pre: (props: PreProps) => {
    const code = props.children.props.children;
    const lang =
      props.children.props.className?.replace("language-", "") || "text";

    return <CodeBlock code={code} lang={lang} />;
  },
};
