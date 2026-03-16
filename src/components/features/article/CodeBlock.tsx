"use client";

import { useState } from "react";

export default function CodeBlock({
  code,
  lang,
}: {
  code: string;
  lang?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative bg-gray-900 text-white p-4 rounded-md my-4">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 text-xs bg-gray-700 text-white px-2 py-1 rounded"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="overflow-x-auto">
        <code className={`language-${lang || "text"}`}>{code}</code>
      </pre>
    </div>
  );
}
