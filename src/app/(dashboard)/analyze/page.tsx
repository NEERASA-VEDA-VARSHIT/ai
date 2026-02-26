"use client";

import { useState } from "react";

import type {
  AnalysisResult,
  ArchitectureMode,
  Budget,
  ExpectedScale,
  Timeline,
} from "@/types/analysis";
import type { AnalyzeApiResponse } from "@/types/analysis";

const SCALE_OPTIONS: { value: ExpectedScale; label: string }[] = [
  { value: "startup", label: "Startup" },
  { value: "smb", label: "SMB" },
  { value: "enterprise", label: "Enterprise" },
];

const ARCH_OPTIONS: { value: ArchitectureMode; label: string }[] = [
  { value: "monolith", label: "Monolith" },
  { value: "modular_monolith", label: "Modular Monolith" },
  { value: "microservices", label: "Microservices" },
];

const BUDGET_OPTIONS: { value: Budget; label: string }[] = [
  { value: "bootstrap", label: "Bootstrap (<$10k)" },
  { value: "seed", label: "Seed ($10k–$100k)" },
  { value: "series_a", label: "Series A ($100k–$1M)" },
  { value: "enterprise", label: "Enterprise ($1M+)" },
];

const TIMELINE_OPTIONS: { value: Timeline; label: string }[] = [
  { value: "mvp_4w", label: "MVP — 4 weeks" },
  { value: "mvp_3m", label: "MVP — 3 months" },
  { value: "standard_6m", label: "Standard — 6 months" },
  { value: "long_12m", label: "Long-term — 12 months" },
];

export default function AnalyzePage(): React.JSX.Element {
  const [form, setForm] = useState({
    description: "",
    expectedScale: "startup" as ExpectedScale,
    architectureMode: "modular_monolith" as ArchitectureMode,
    budget: "seed" as Budget,
    timeline: "mvp_3m" as Timeline,
    coreFeatures: "",
    complianceFlags: "",
  });
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const payload = {
      ...form,
      complianceFlags: form.complianceFlags
        ? form.complianceFlags.split(",").map((s) => s.trim()).filter(Boolean)
        : undefined,
    };

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await res.json()) as AnalyzeApiResponse;

    if (!data.success) {
      setError(data.error.message);
    } else {
      setResult(data.data);
    }
    setLoading(false);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Architecture Analysis</h1>
        <p className="mt-2 text-neutral-400">
          Describe your project and get a CTO-level architectural assessment.
        </p>
      </div>

      <form onSubmit={(e) => void handleSubmit(e)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-neutral-400">
              Project Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              required
              rows={4}
              className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Describe your project in detail…"
            />
          </div>

          {[
            { field: "expectedScale" as const, label: "Expected Scale", options: SCALE_OPTIONS },
            {
              field: "architectureMode" as const,
              label: "Architecture Mode",
              options: ARCH_OPTIONS,
            },
            { field: "budget" as const, label: "Budget", options: BUDGET_OPTIONS },
            { field: "timeline" as const, label: "Timeline", options: TIMELINE_OPTIONS },
          ].map(({ field, label, options }) => (
            <div key={field}>
              <label className="mb-1 block text-sm text-neutral-400">{label}</label>
              <select
                value={form[field]}
                onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                {options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-neutral-400">Core Features</label>
            <textarea
              value={form.coreFeatures}
              onChange={(e) => setForm((f) => ({ ...f, coreFeatures: e.target.value }))}
              required
              rows={3}
              className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Auth, billing, notifications, real-time chat…"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-neutral-400">
              Compliance Flags{" "}
              <span className="text-neutral-500">(comma-separated, optional)</span>
            </label>
            <input
              type="text"
              value={form.complianceFlags}
              onChange={(e) => setForm((f) => ({ ...f, complianceFlags: e.target.value }))}
              className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="GDPR, HIPAA, SOC2…"
            />
          </div>
        </div>

        {error && (
          <div className="rounded-md border border-red-800 bg-red-900/30 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-white px-6 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-100 disabled:opacity-50"
        >
          {loading ? "Analyzing…" : "Run Analysis"}
        </button>
      </form>

      {result && (
        <div className="space-y-6 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-neutral-400">Stability Score</p>
              <p className="text-3xl font-bold">{result.stabilityScore}/100</p>
            </div>
            <div>
              <p className="text-sm text-neutral-400">Risk Level</p>
              <p className="text-xl font-semibold">{result.riskLevel}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-400">Archetype</p>
              <p className="text-xl font-semibold">{result.infraArchetype}</p>
            </div>
          </div>

          {result.tensions.length > 0 && (
            <div>
              <h2 className="mb-3 text-lg font-semibold">Detected Tensions</h2>
              <div className="space-y-2">
                {result.tensions.map((t, i) => (
                  <div
                    key={i}
                    className={`rounded-md border px-4 py-3 text-sm ${
                      t.severity === "critical"
                        ? "border-red-800 bg-red-900/20 text-red-300"
                        : "border-yellow-800 bg-yellow-900/20 text-yellow-300"
                    }`}
                  >
                    <p className="font-semibold">{t.category}</p>
                    <p className="mt-1 text-xs opacity-80">{t.reasoning}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="mb-3 text-lg font-semibold">Stack Decisions</h2>
            <div className="grid gap-2 text-sm md:grid-cols-2">
              {Object.entries(result.stack)
                .filter(([, v]) => v !== undefined)
                .map(([k, v]) => (
                  <div key={k} className="rounded-md border border-neutral-700 px-3 py-2">
                    <span className="text-neutral-400">{k}: </span>
                    <span>{v as string}</span>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold">Archetype Reasoning</h2>
            <p className="text-sm text-neutral-300">{result.archetypeReasoning}</p>
          </div>
        </div>
      )}
    </div>
  );
}
