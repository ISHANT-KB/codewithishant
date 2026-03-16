import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b p-4 flex justify-between sticky top-0 bg-white z-10">
      <h1 className="text-xl font-bold">CodeWithIshant</h1>

      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/notes">Notes</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/search">Search</Link>
        <Link href="/explore">Explore</Link>
        <Link href="/about">About</Link>
      </div>
    </nav>
  );
}
