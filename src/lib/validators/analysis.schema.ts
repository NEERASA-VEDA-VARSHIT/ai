import { z } from "zod";

import {
  ARCHITECTURE_MODE,
  BUDGET,
  EXPECTED_SCALE,
  TIMELINE,
} from "@/types/analysis";

export const analysisInputSchema = z.object({
  description: z
    .string()
    .min(20, "Describe your project in at least 20 characters")
    .max(2000, "Description must be under 2000 characters"),
  expectedScale: z.enum(EXPECTED_SCALE),
  architectureMode: z.enum(ARCHITECTURE_MODE),
  budget: z.enum(BUDGET),
  timeline: z.enum(TIMELINE),
  coreFeatures: z
    .string()
    .min(10, "List at least the core features")
    .max(1000),
  complianceFlags: z
    .array(z.string().min(1).max(50))
    .max(10)
    .optional(),
});

export type ValidatedAnalysisInput = z.infer<typeof analysisInputSchema>;
