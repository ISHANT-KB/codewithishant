import Link from "next/link";

type Action = {
  href: string;
  label: string;
};

type InProgressProps = {
  title?: string;
  description?: string;
  eyebrow?: string;
  primaryAction?: Action;
  secondaryAction?: Action;
};

export default function InProgress({
  title = "This page is still in progress",
  description = "I'm actively building this section. Check back soon for fresh content, or explore the rest of the site in the meantime.",
  eyebrow = "Work in progress",
  primaryAction = {
    href: "/",
    label: "Go to home",
  },
  secondaryAction = {
    href: "/explore",
    label: "Explore content",
  },
}: InProgressProps) {
  return (
    <section className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/25 px-4 py-8 backdrop-blur-sm sm:px-6">
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white/95 shadow-[0_20px_70px_-35px_rgba(15,23,42,0.35)]">
        <div className="relative isolate overflow-hidden px-6 py-10 sm:px-10 sm:py-14">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.16),transparent_30%),linear-gradient(135deg,#f8fafc,#ffffff_55%,#eff6ff)]" />

          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
            {eyebrow}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.5fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {title}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                {description}
              </p>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Link
                  href={primaryAction.href}
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
                >
                  {primaryAction.label}
                </Link>

                <Link
                  href={secondaryAction.href}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
                >
                  {secondaryAction.label}
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 backdrop-blur">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>

              <div className="space-y-3">
                <div className="h-3 w-24 rounded-full bg-slate-200" />
                <div className="h-3 w-full rounded-full bg-slate-100" />
                <div className="h-3 w-5/6 rounded-full bg-slate-100" />
                <div className="h-24 rounded-2xl bg-linear-to-br from-blue-100 via-slate-100 to-emerald-100" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-16 rounded-2xl bg-slate-100" />
                  <div className="h-16 rounded-2xl bg-slate-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
