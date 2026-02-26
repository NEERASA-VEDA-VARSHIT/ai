import type { ApiResponse } from "./api";

export const EXPECTED_SCALE = ["startup", "smb", "enterprise"] as const;
export const ARCHITECTURE_MODE = ["monolith", "modular_monolith", "microservices"] as const;
export const BUDGET = ["bootstrap", "seed", "series_a", "enterprise"] as const;
export const TIMELINE = ["mvp_4w", "mvp_3m", "standard_6m", "long_12m"] as const;
export const RISK_LEVEL = ["Low", "Medium", "High", "Critical"] as const;

export type ExpectedScale = (typeof EXPECTED_SCALE)[number];
export type ArchitectureMode = (typeof ARCHITECTURE_MODE)[number];
export type Budget = (typeof BUDGET)[number];
export type Timeline = (typeof TIMELINE)[number];
export type RiskLevel = (typeof RISK_LEVEL)[number];

export type AnalysisInput = {
  description: string;
  expectedScale: ExpectedScale;
  architectureMode: ArchitectureMode;
  budget: Budget;
  timeline: Timeline;
  coreFeatures: string;
  complianceFlags?: string[];
};

export type Tension = {
  category: string;
  severity: "warning" | "critical";
  scoreImpact: number;
  reasoning: string;
};

export type StackDecision = {
  frontend: string;
  backend: string;
  database: string;
  cache?: string;
  hosting: string;
  auth: string;
  observability: string;
};

export type RiskItem = {
  risk: string;
  severity: "Low" | "Medium" | "High";
  mitigation: string;
};

export type EvolutionStage = {
  name: "Lean MVP" | "Scalable Startup" | "Enterprise Grade";
  infraChanges: string;
  dbChanges: string;
  serviceChanges: string;
  observabilityUpgrades: string;
};

export type AnalysisResult = {
  tensions: Tension[];
  stabilityScore: number;
  riskLevel: RiskLevel;
  infraArchetype: ArchitectureMode;
  archetypeReasoning: string;
  stack: StackDecision;
  folderStructure: string;
  governanceRules: string;
  databasePhilosophy: string;
  performanceStrategy: string;
  observabilityStrategy: string;
  riskRegister: RiskItem[];
  evolutionRoadmap: EvolutionStage[];
};

export type AnalysisSummary = {
  id: string;
  description: string;
  stabilityScore: number;
  riskLevel: RiskLevel;
  infraArchetype: ArchitectureMode;
  createdAt: string;
};

export type AnalyzeApiResponse = ApiResponse<AnalysisResult>;
export type AnalysisListApiResponse = ApiResponse<AnalysisSummary[]>;
