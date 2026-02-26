import Link from "next/link";

export default function HomePage(): React.JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 text-white">
      <div className="max-w-2xl space-y-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight">ArchAI</h1>
        <p className="text-lg text-neutral-400">
          Principal-architect-level system design analysis. Deterministic. Opinionated.
          Production-grade.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/analyze"
            className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-100"
          >
            Start Analysis
          </Link>
          <Link
            href="/login"
            className="rounded-md border border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-300 hover:border-neutral-500"
          >
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}
