import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <nav className="border-b border-neutral-800 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight">
            ArchAI
          </Link>
          <div className="flex gap-6 text-sm text-neutral-400">
            <Link href="/analyze" className="hover:text-white">
              Analyze
            </Link>
            <Link href="/projects" className="hover:text-white">
              Projects
            </Link>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
