"use client"

import { useState } from "react"

export default function CopyButton({ code }: { code: string }) {

  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 text-xs bg-gray-700 text-white px-2 py-1 rounded"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  )
}