import Sidebar from "@/components/features/navigation/Sidebar";
import InProgress from "@/components/workInProgress/inProgress";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex max-w-7xl mx-auto">
      <Sidebar pagename='notes'/>
      <InProgress/>

      <main className="flex-1 p-0 md:p-6">{children}</main>
    </div>
  );
}
