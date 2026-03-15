type Heading = {
  level: number
  text: string
  slug: string
}

export default function TableOfContents({
  headings,
}: {
  headings: Heading[]
}) {

  return (

    <aside className="p-2 w-60 pl-6 border-l">

      <h3 className="font-bold mb-3">
        On this page
      </h3>

      <ul className="space-y-2 text-sm">

        {headings.map((heading) => (

          <li
            key={heading.slug}
            style={{ marginLeft: (heading.level - 1) * 8 }}
          >

            <a
              href={`#${heading.slug}`}
              className="text-gray-600"
            >
              {heading.text}
            </a>

          </li>

        ))}

      </ul>

    </aside>
  )
}