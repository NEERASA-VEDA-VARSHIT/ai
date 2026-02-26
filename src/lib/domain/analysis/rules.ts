import type { AnalysisInput, RiskLevel, Tension } from "@/types/analysis";

const BASE_SCORE = 100;
const CRITICAL_PENALTY = 25;
const WARNING_PENALTY = 10;

export function detectTensions(input: AnalysisInput): Tension[] {
  const tensions: Tension[] = [];

  // Scale vs Budget contradiction
  if (input.expectedScale === "enterprise" && input.budget === "bootstrap") {
    tensions.push({
      category: "Scale vs Budget",
      severity: "critical",
      scoreImpact: CRITICAL_PENALTY,
      reasoning:
        "Enterprise-scale ambitions with bootstrap budget is operationally unsustainable. " +
        "Managed services will be cost-prohibitive at scale without dedicated infrastructure budget.",
    });
  } else if (input.expectedScale === "enterprise" && input.budget === "seed") {
    tensions.push({
      category: "Scale vs Budget",
      severity: "warning",
      scoreImpact: WARNING_PENALTY,
      reasoning:
        "Seed-level budget constrains enterprise-grade observability, HA setup, and DR strategy. " +
        "Plan for budget expansion before scaling.",
    });
  }

  // Timeline vs Architecture Mode
  if (
    input.timeline === "mvp_4w" &&
    input.architectureMode === "microservices"
  ) {
    tensions.push({
      category: "Timeline vs Architecture",
      severity: "critical",
      scoreImpact: CRITICAL_PENALTY,
      reasoning:
        "Microservices in 4 weeks requires mature DevOps pipeline, service mesh, distributed tracing, " +
        "and inter-service contract testing. This is irreconcilable with a 4-week timeline.",
    });
  } else if (
    input.timeline === "mvp_3m" &&
    input.architectureMode === "microservices"
  ) {
    tensions.push({
      category: "Timeline vs Architecture",
      severity: "warning",
      scoreImpact: WARNING_PENALTY,
      reasoning:
        "3-month timeline for microservices is aggressive. Consider modular monolith first, " +
        "decompose services after product-market fit validation.",
    });
  }

  // Compliance vs Budget
  const hasComplianceRequirements =
    input.complianceFlags && input.complianceFlags.length > 0;
  if (hasComplianceRequirements && input.budget === "bootstrap") {
    tensions.push({
      category: "Compliance vs Budget",
      severity: "critical",
      scoreImpact: CRITICAL_PENALTY,
      reasoning:
        "Compliance (GDPR, HIPAA, SOC2) mandates encrypted storage, audit logging, access controls, " +
        "and penetration testing. These cannot be implemented properly at bootstrap budget.",
    });
  }

  return tensions;
}

export function computeStabilityScore(tensions: Tension[]): number {
  const penalty = tensions.reduce((sum, t) => sum + t.scoreImpact, 0);
  return Math.max(0, BASE_SCORE - penalty);
}

export function classifyRisk(score: number): RiskLevel {
  if (score >= 75) return "Low";
  if (score >= 50) return "Medium";
  if (score >= 25) return "High";
  return "Critical";
}
