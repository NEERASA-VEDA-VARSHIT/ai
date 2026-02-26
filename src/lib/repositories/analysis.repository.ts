// This file is the ONLY place where Prisma/DB is imported outside src/db/
// DO NOT import @prisma/client or @/db/client anywhere else

import type { AnalysisInput, AnalysisResult, AnalysisSummary } from "@/types/analysis";

import { db } from "@/db/client";

export interface AnalysisRepository {
  save(userId: string, input: AnalysisInput, result: AnalysisResult): Promise<void>;
  findByUserId(userId: string): Promise<AnalysisSummary[]>;
  findById(id: string): Promise<(AnalysisInput & AnalysisResult & { id: string }) | null>;
}

export class PrismaAnalysisRepository implements AnalysisRepository {
  async save(
    userId: string,
    input: AnalysisInput,
    result: AnalysisResult,
  ): Promise<void> {
    await db.analysis.create({
      data: {
        userId,
        description: input.description,
        expectedScale: input.expectedScale,
        architectureMode: input.architectureMode,
        budget: input.budget,
        timeline: input.timeline,
        coreFeatures: input.coreFeatures,
        complianceFlags: input.complianceFlags ?? [],
        stabilityScore: result.stabilityScore,
        riskLevel: result.riskLevel,
        result: result as unknown as Record<string, unknown>,
      },
    });
  }

  async findByUserId(userId: string): Promise<AnalysisSummary[]> {
    const rows = await db.analysis.findMany({
      where: { userId, deletedAt: null },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        description: true,
        stabilityScore: true,
        riskLevel: true,
        architectureMode: true,
        createdAt: true,
      },
    });

    return rows.map((r) => ({
      id: r.id,
      description: r.description,
      stabilityScore: r.stabilityScore,
      riskLevel: r.riskLevel as AnalysisSummary["riskLevel"],
      infraArchetype: r.architectureMode as AnalysisSummary["infraArchetype"],
      createdAt: r.createdAt.toISOString(),
    }));
  }

  async findById(
    id: string,
  ): Promise<(AnalysisInput & AnalysisResult & { id: string }) | null> {
    const row = await db.analysis.findFirst({
      where: { id, deletedAt: null },
    });

    if (!row) return null;

    return {
      id: row.id,
      ...(row.result as unknown as AnalysisResult),
      description: row.description,
      expectedScale: row.expectedScale as AnalysisInput["expectedScale"],
      architectureMode: row.architectureMode as AnalysisInput["architectureMode"],
      budget: row.budget as AnalysisInput["budget"],
      timeline: row.timeline as AnalysisInput["timeline"],
      coreFeatures: row.coreFeatures,
      complianceFlags: row.complianceFlags,
    };
  }
}
