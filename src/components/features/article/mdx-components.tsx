import React from "react";
import CodeBlock from "./CodeBlock";

interface PreProps {
  children: React.ReactElement<{ children: string; className?: string }>;
}

export const mdxComponents = {
  pre: (props: PreProps) => {
    const code = props.children.props.children;
    const lang =
      props.children.props.className?.replace("language-", "") || "text";

    return <CodeBlock code={code} lang={lang} />;
  },
};
