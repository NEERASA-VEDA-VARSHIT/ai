export default function ProjectsPage(): React.JSX.Element {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="mt-2 text-neutral-400">Your saved architecture analyses.</p>
      </div>
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-8 text-center text-neutral-500">
        No analyses yet. Run your first analysis to see results here.
      </div>
    </div>
  );
}
