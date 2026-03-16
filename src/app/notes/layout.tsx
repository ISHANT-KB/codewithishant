import Sidebar from "@/components/Sidebar"

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (

    <div className="flex max-w-7xl mx-auto">

      <Sidebar />

      <main className="flex-1 p-6">
        {children}
      </main>

    </div>

  )
}