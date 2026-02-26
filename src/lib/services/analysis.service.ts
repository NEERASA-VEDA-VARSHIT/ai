import type { AnalysisInput, AnalysisResult, Tension } from "@/types/analysis";
import type { AnalysisRepository } from "@/lib/repositories/analysis.repository";

import {
  classifyRisk,
  computeStabilityScore,
  detectTensions,
} from "@/lib/domain/analysis/rules";
import { logger } from "@/lib/utils/logger";

export class AnalysisService {
  constructor(private readonly repository: AnalysisRepository) {}

  async runAnalysis(
    userId: string,
    input: AnalysisInput,
  ): Promise<AnalysisResult> {
    logger.info({ userId, scale: input.expectedScale }, "Starting analysis");

    const tensions = detectTensions(input);
    const stabilityScore = computeStabilityScore(tensions);
    const riskLevel = classifyRisk(stabilityScore);

    const infraArchetype = this.selectArchetype(stabilityScore, input);
    const stack = this.selectStack(infraArchetype, input);

    const result: AnalysisResult = {
      tensions,
      stabilityScore,
      riskLevel,
      infraArchetype,
      archetypeReasoning: this.buildArchetypeReasoning(stabilityScore, input),
      stack,
      folderStructure: this.buildFolderStructure(infraArchetype),
      governanceRules: this.buildGovernanceRules(input),
      databasePhilosophy: this.buildDatabasePhilosophy(input),
      performanceStrategy: this.buildPerformanceStrategy(input),
      observabilityStrategy: this.buildObservabilityStrategy(input),
      riskRegister: this.buildRiskRegister(tensions, input),
      evolutionRoadmap: this.buildEvolutionRoadmap(infraArchetype),
    };

    await this.repository.save(userId, input, result);

    logger.info(
      { userId, stabilityScore, riskLevel },
      "Analysis complete",
    );

    return result;
  }

  private selectArchetype(
    score: number,
    input: AnalysisInput,
  ): AnalysisResult["infraArchetype"] {
    if (score < 50) return "monolith";
    if (input.budget === "bootstrap" || input.budget === "seed") return "monolith";
    if (input.expectedScale === "enterprise") return "modular_monolith";
    if (input.architectureMode === "microservices" && score >= 70)
      return "microservices";
    return "modular_monolith";
  }

  private buildArchetypeReasoning(
    score: number,
    input: AnalysisInput,
  ): string {
    if (score < 50)
      return `Stability score ${score}/100 forces monolith. Resolve critical tensions before considering service decomposition.`;
    if (input.budget === "bootstrap")
      return "Bootstrap budget prohibits the operational overhead of distributed systems. Deploy as monolith, extract services post-revenue.";
    return `Score ${score}/100 with ${input.expectedScale} scale and ${input.budget} budget supports the selected architecture class.`;
  }

  private selectStack(
    archetype: AnalysisResult["infraArchetype"],
    input: AnalysisInput,
  ): AnalysisResult["stack"] {
    const isLowBudget =
      input.budget === "bootstrap" || input.budget === "seed";

    return {
      frontend: "Next.js 14 (App Router) — SSR/SSG flexibility, strong ecosystem, TypeScript-first",
      backend:
        archetype === "microservices"
          ? "Node.js + Fastify — low-overhead HTTP, strong TypeScript support, plugin architecture"
          : "Next.js API Routes — collocated with frontend, reduces operational surface for monolith/modular",
      database:
        input.expectedScale === "enterprise"
          ? "PostgreSQL (RDS Aurora Serverless v2) — ACID, mature, horizontal read scaling"
          : "PostgreSQL (Neon / Supabase) — serverless-friendly, managed, cost-effective",
      cache: isLowBudget
        ? undefined
        : "Redis (Upstash) — serverless Redis, pay-per-use, no idle cost",
      hosting: isLowBudget
        ? "Vercel (frontend) + Railway (backend) — zero-infra managed, autoscale to zero"
        : "AWS (ECS Fargate + RDS) — production-grade, VPC isolation, fine-grained IAM",
      auth: "NextAuth.js v4 — battle-tested, adapter ecosystem, JWT/session flexibility",
      observability: isLowBudget
        ? "Pino logger + Sentry (free tier) — structured logs, error tracking, no infra"
        : "Pino + OpenTelemetry + Grafana Cloud — production-grade distributed tracing",
    };
  }

  private buildFolderStructure(archetype: AnalysisResult["infraArchetype"]): string {
    if (archetype === "microservices") {
      return `
/services
  /analysis-service
    /src
      /api          [Route handlers only — no business logic]
      /domain       [Entities, value objects, domain rules]
      /services     [Use-case orchestration — no DB imports]
      /repositories [Data access — DB imports allowed here only]
      /contracts    [Request/response envelopes, error codes]
      /validators   [Zod schemas at transport boundary only]
      /types        [TypeScript interfaces — no runtime code]
    /prisma
      schema.prisma
  /auth-service     [Same structure pattern]
  /shared
    /types          [Cross-service contracts]
    /utils          [Pure functions only]
`.trim();
    }

    return `
/src
  /app              [Next.js App Router pages and API routes]
    /api            [Route handlers — validate input, call service, return envelope]
    /(dashboard)    [Protected pages]
    /(auth)         [Public auth pages]
  /components
    /ui             [shadcn primitives — no business logic, no API calls]
    /features       [Feature-specific compositions — no direct DB access]
  /lib
    /domain         [Pure business rules, entities — no I/O, no HTTP, no DB]
    /services       [Use-case orchestration — imports repositories, NOT db/client]
    /repositories   [Data access layer — ONLY layer allowed to import from db/]
    /contracts      [API envelope factories, error code constants]
    /validators     [Zod schemas — transport boundary validation only]
    /auth           [NextAuth config, RBAC enforcement helpers]
    /utils          [Pure utility functions — no side effects]
  /types            [TypeScript types/interfaces — no runtime logic]
  /db
    /client.ts      [Prisma client singleton — imported ONLY by repositories]
/prisma
  schema.prisma
/docs
  ARCHITECTURE.md
  GOVERNANCE.md
`.trim();
  }

  private buildGovernanceRules(input: AnalysisInput): string {
    return `
API CONTRACT POLICY
- All responses must use ApiSuccess<T> | ApiError envelope
- Version prefix all routes: /api/v1/
- No database model types may cross the repository boundary
- Error responses must include code, message, optional details
- Input validated with Zod at route handler entry point

RBAC ENFORCEMENT
- Role check must occur in middleware or at service layer entry
- Never trust client-provided role claims
- Permission matrix defined in src/types/rbac.ts
- Roles: ADMIN (full), ARCHITECT (create/read analysis), VIEWER (read only)

IMPORT BOUNDARIES
- api/ → validators/, services/, contracts/ ONLY
- services/ → domain/, repositories/ ONLY
- repositories/ → db/ ONLY
- domain/ → types/ ONLY (no I/O allowed)
- components/ui/ → NO business logic, NO API calls

CODE REVIEW CHECKLIST
- [ ] No direct Prisma/DB import outside src/db/ or src/lib/repositories/
- [ ] Zod validation present at every API route entry
- [ ] Response wrapped in ok() or fail() envelope
- [ ] No circular imports (checked by eslint import/no-cycle)
- [ ] TypeScript strict mode — no 'any' types
- [ ] New logic checked against existing utils (no duplication)
- [ ] Soft delete used (deletedAt timestamp), no hard deletes on user data
${input.complianceFlags && input.complianceFlags.length > 0 ? "- [ ] Compliance flags reviewed: " + input.complianceFlags.join(", ") : ""}
`.trim();
  }

  private buildDatabasePhilosophy(input: AnalysisInput): string {
    return `
DATABASE PHILOSOPHY
Engine: PostgreSQL — relational integrity, JSONB for flexible metadata, mature ecosystem
ORM: Prisma — type-safe queries, migration discipline, schema as source of truth

MIGRATION DISCIPLINE
- All schema changes via prisma migrate (never direct DB edits)
- Migrations are committed to version control
- Destructive migrations require two-step: add nullable column → backfill → make required

INDEX STRATEGY
- Index all foreign keys by default
- Index high-cardinality filter columns (email, status, createdAt)
- Composite indexes for common query patterns
- Monitor slow queries in production (pg_stat_statements)

SOFT DELETE POLICY
- User data: soft delete only (deletedAt timestamp)
- Audit logs: immutable, never deleted
- System config: hard delete allowed

MULTI-TENANCY
${input.expectedScale === "enterprise" ? "- Row-level tenancy via userId/tenantId on all tables\n- RLS (Row Level Security) enforced at DB level for sensitive tables" : "- Single-tenant architecture. Plan for tenant isolation before Series A."}

AUDIT STRATEGY
- createdAt, updatedAt on all tables
- userId tracked on all mutations
- Sensitive operations logged to append-only audit table
`.trim();
  }

  private buildPerformanceStrategy(input: AnalysisInput): string {
    const isLowBudget = input.budget === "bootstrap" || input.budget === "seed";
    return `
PERFORMANCE & COST OPTIMIZATION
Estimated monthly infra: ${isLowBudget ? "$0–$50 (Vercel free + Neon free tier)" : "$200–$800 (AWS ECS + RDS, auto-scaled)"}

CACHING STRATEGY
${isLowBudget ? "- Next.js fetch cache (built-in) for read-heavy pages\n- No Redis until cache miss rate justifies cost" : "- Redis (Upstash) for session data and high-frequency reads\n- Cache invalidation on write in repository layer"}

SERVERLESS VS CONTAINER
${isLowBudget ? "- Serverless-first: Vercel Functions + Neon serverless postgres\n- Scale to zero when idle — zero idle cost" : "- Containerized: ECS Fargate — predictable latency, VPC security\n- Auto-scaling based on CPU/request metrics"}

BACKGROUND JOBS
${isLowBudget ? "- Vercel Cron for scheduled tasks (free tier)\n- No queue needed at MVP scale" : "- BullMQ + Redis for async job processing\n- Dead letter queue for failed job recovery"}

RATE LIMITING
- API routes: 60 req/min per authenticated user
- Auth routes: 10 req/min per IP
- Enforced in Next.js middleware
`.trim();
  }

  private buildObservabilityStrategy(input: AnalysisInput): string {
    const isProd = input.budget !== "bootstrap";
    return `
OBSERVABILITY STRATEGY

LOGGING
- Structured JSON logs via Pino
- Log levels: error, warn, info, debug
- Always include: userId, requestId, action, duration
- Never log: passwords, tokens, PII

METRICS
${isProd ? "- OpenTelemetry SDK → Grafana Cloud\n- Request rate, error rate, p50/p95/p99 latency\n- DB connection pool utilization" : "- Vercel Analytics (built-in)\n- Sentry performance monitoring"}

ERROR MONITORING
- Sentry for uncaught exceptions and API errors
- Alert threshold: error rate > 1% in 5-min window

HEALTH CHECKS
- GET /api/health → { status: ok, db: connected, timestamp }
- Checked every 30s by hosting platform

SLO TARGETS
- API availability: 99.9% (43 min/month downtime budget)
- p95 API latency: < 500ms
- Error rate: < 0.1%
`.trim();
  }

  private buildRiskRegister(
    tensions: Tension[],
    input: AnalysisInput,
  ): AnalysisResult["riskRegister"] {
    const risks: AnalysisResult["riskRegister"] = tensions.map((t) => ({
      risk: t.category + ": " + t.reasoning.slice(0, 100),
      severity: t.severity === "critical" ? "High" : "Medium",
      mitigation: "Resolve detected tension before proceeding with implementation.",
    }));

    // Always add standard risks
    risks.push({
      risk: "Single point of failure in database",
      severity: input.budget === "bootstrap" ? "Medium" : "High",
      mitigation:
        input.budget === "bootstrap"
          ? "Enable daily Neon automatic backups. Restore tested monthly."
          : "RDS Multi-AZ deployment. Automated failover. PITR enabled.",
    });

    risks.push({
      risk: "Authentication token compromise",
      severity: "High",
      mitigation:
        "Short-lived JWTs (15min), refresh token rotation, revocation list in Redis/DB.",
    });

    if (input.complianceFlags && input.complianceFlags.length > 0) {
      risks.push({
        risk: `Compliance violation: ${input.complianceFlags.join(", ")}`,
        severity: "High",
        mitigation:
          "Engage compliance counsel. Implement data residency, encryption at rest, audit logging, DPA agreements with vendors.",
      });
    }

    return risks;
  }

  private buildEvolutionRoadmap(
    archetype: AnalysisResult["infraArchetype"],
  ): AnalysisResult["evolutionRoadmap"] {
    return [
      {
        name: "Lean MVP",
        infraChanges: "Vercel (Next.js) + Neon (Postgres serverless). Zero ops overhead.",
        dbChanges: "Single Postgres database. No read replicas. Prisma migrations only.",
        serviceChanges: "Monolith. All logic in /lib/services. No external queues.",
        observabilityUpgrades: "Sentry error tracking. Pino logs to stdout. Vercel Analytics.",
      },
      {
        name: "Scalable Startup",
        infraChanges:
          archetype === "microservices"
            ? "AWS ECS Fargate per service. ALB + Route53. CloudFront CDN."
            : "AWS ECS Fargate (single service). RDS PostgreSQL. ElastiCache Redis.",
        dbChanges:
          "RDS PostgreSQL Multi-AZ. Read replica for analytics queries. Connection pooling via PgBouncer.",
        serviceChanges:
          "Extract background job processing to BullMQ workers. Add Redis caching layer.",
        observabilityUpgrades:
          "OpenTelemetry instrumentation. Grafana Cloud dashboards. PagerDuty alerts.",
      },
      {
        name: "Enterprise Grade",
        infraChanges:
          "Multi-region deployment. RDS Aurora Global. CloudFront + WAF. VPC with private subnets.",
        dbChanges:
          "Aurora Global Database. Automated backups with PITR. Cross-region read replicas. Encryption at rest.",
        serviceChanges:
          "Service mesh (AWS App Mesh). API Gateway with rate limiting. Event-driven with SQS/EventBridge.",
        observabilityUpgrades:
          "Full distributed tracing. Custom SLO dashboards. Automated runbooks. Chaos engineering.",
      },
    ];
  }
}
