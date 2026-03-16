import Link from "next/link";

type Props = {
  category: string;
  title: string;
  basePath?: string;
};

export default function Breadcrumbs({
  category,
  title,
  basePath = "/blog",
}: Props) {
  return (
    <nav className="text-sm text-gray-500 mb-6">
      <Link href="/">Home</Link>

      <span> › </span>

      <Link href={basePath}>{basePath === "/blog" ? "Blog" : "Notes"}</Link>

      <span> › </span>

      <Link href={`${basePath}/${category}`}>{category}</Link>

      <span> › </span>

      <span className="text-gray-800">{title}</span>
    </nav>
  );
}
