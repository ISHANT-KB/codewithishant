import Sidebar from "@/components/features/navigation/Sidebar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex max-w-7xl mx-auto">
      <Sidebar />

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
