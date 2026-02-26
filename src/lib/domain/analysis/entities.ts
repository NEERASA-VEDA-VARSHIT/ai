import type { AnalysisInput, AnalysisResult } from "@/types/analysis";

export type AnalysisEntity = {
  id: string;
  userId: string;
  input: AnalysisInput;
  result: AnalysisResult;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
