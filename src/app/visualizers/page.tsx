import Link from "next/link"
import { visualizers } from "@/lib/visual/visualizer";

export default function VisualizersList() {
    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visualizers.map((visualizer) => (
                <Link
                    key={visualizer.slug}
                    href={`/visualizers/${visualizer.slug}`}
                    className="border p-4 rounded hover:bg-gray-100 transition"
                >
                    <h2 className="text-xl font-bold">{visualizer.title}</h2>
                </Link>
            ))}
        </div>
    )
}