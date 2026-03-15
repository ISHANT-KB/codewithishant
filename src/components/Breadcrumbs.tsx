import Link from "next/link"

type Props = {
  category: string
  title: string
}

export default function Breadcrumbs({ category, title }: Props) {

  return (

    <nav className="text-sm text-gray-500 mb-6">

      <Link href="/">Home</Link>

      <span> › </span>

      <Link href="/blog">Blog</Link>

      <span> › </span>

      <Link href={`/blog/${category}`}>
        {category}
      </Link>

      <span> › </span>

      <span className="text-gray-800">
        {title}
      </span>

    </nav>

  )

}