import { codeToHtml } from "shiki"

export default async function CodeBlock({
  code,
  lang,
}: {
  code: string
  lang: string
}) {

  const html = await codeToHtml(code, {
    lang,
    theme: "github-dark",
  })

  return (
  <div
    className="my-6 rounded-lg overflow-hidden"
    dangerouslySetInnerHTML={{ __html: html }}
  />
)
}