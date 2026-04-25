import { visualizers } from "@/lib/visual/visualizer";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return visualizers.map((visualizer) => ({
    slug: visualizer.slug,
  }));
}

export default async function VisualizerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const visualizer = visualizers.find((v) => v.slug === slug);

  if (!visualizer) return notFound();
  return (
    <div className="w-full- h-screen">
      <h1 className="text-2xl font-bold p-4"> {visualizer.title} </h1>
      <iframe src={visualizer.path} className="w-full h-[90%] border-0" />
    </div>
  );
}
