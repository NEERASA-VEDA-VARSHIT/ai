# PRD GENERATION
### Multi-Stage Architecture Orchestration Pipeline — Document 2 of 4
### Framework: Next.js (Primary) | Version: 1.0.0 | Status: ACTIVE

---

## Table of Contents

- [Purpose & Philosophy](#purpose--philosophy)
- [PRD Generation Pipeline Overview](#prd-generation-pipeline-overview)
- [Prerequisite: Intake Readiness Check](#prerequisite-intake-readiness-check)
- [Phase 1 — Stability Analysis](#phase-1--stability-analysis)
  - [1A — Tension Detection Engine](#1a--tension-detection-engine)
  - [1B — Stability Score Computation](#1b--stability-score-computation)
  - [1C — Risk Level Classification](#1c--risk-level-classification)
  - [1D — Tension Severity Catalogue](#1d--tension-severity-catalogue)
  - [1E — Composite Tension Amplification](#1e--composite-tension-amplification)
- [Phase 2 — Architecture Archetype Selection](#phase-2--architecture-archetype-selection)
  - [2A — Archetype Decision Matrix](#2a--archetype-decision-matrix)
  - [2B — Forced Archetype Override Rules](#2b--forced-archetype-override-rules)
  - [2C — Archetype Reasoning Template](#2c--archetype-reasoning-template)
  - [2D — Evolution Path Planning](#2d--evolution-path-planning)
- [Phase 3 — Stack Prescription Engine](#phase-3--stack-prescription-engine)
  - [3A — Frontend Decision Tree](#3a--frontend-decision-tree)
  - [3B — Backend / API Decision Tree](#3b--backend--api-decision-tree)
  - [3C — Database Selection Engine](#3c--database-selection-engine)
  - [3D — Caching Layer Decision Tree](#3d--caching-layer-decision-tree)
  - [3E — Authentication Provider Decision Tree](#3e--authentication-provider-decision-tree)
  - [3F — Queue / Job Infrastructure Decision Tree](#3f--queue--job-infrastructure-decision-tree)
  - [3G — File Storage Decision Tree](#3g--file-storage-decision-tree)
  - [3H — Observability Stack Decision Tree](#3h--observability-stack-decision-tree)
  - [3I — Hosting / Deployment Decision Tree](#3i--hosting--deployment-decision-tree)
- [Phase 4 — PRD Document Generation](#phase-4--prd-document-generation)
  - [4A — Mandatory PRD Template Structure](#4a--mandatory-prd-template-structure)
  - [4B — Section Generation Rules](#4b--section-generation-rules)
  - [4C — PRD Metadata Block](#4c--prd-metadata-block)
  - [4D — Executive Summary Generation](#4d--executive-summary-generation)
  - [4E — Problem Statement Generation](#4e--problem-statement-generation)
  - [4F — Goals & Success Metrics Generation](#4f--goals--success-metrics-generation)
  - [4G — User Persona Generation](#4g--user-persona-generation)
  - [4H — Feature Requirements Generation](#4h--feature-requirements-generation)
  - [4I — Non-Functional Requirements Generation](#4i--non-functional-requirements-generation)
  - [4J — Architecture Decision Records](#4j--architecture-decision-records)
  - [4K — Risk Register Generation](#4k--risk-register-generation)
  - [4L — Evolution Roadmap Generation](#4l--evolution-roadmap-generation)
- [Phase 5 — PRD Quality Gate](#phase-5--prd-quality-gate)
  - [5A — Completeness Scoring Model](#5a--completeness-scoring-model)
  - [5B — Internal Consistency Checks](#5b--internal-consistency-checks)
  - [5C — Quality Gate Pass / Fail Rules](#5c--quality-gate-pass--fail-rules)
- [Phase 6 — PRD Iteration & Clarification Loop](#phase-6--prd-iteration--clarification-loop)
  - [6A — When Iteration Is Triggered](#6a--when-iteration-is-triggered)
  - [6B — Partial Regeneration Rules](#6b--partial-regeneration-rules)
  - [6C — Iteration Convergence Criteria](#6c--iteration-convergence-criteria)
  - [6D — Maximum Iteration Budget](#6d--maximum-iteration-budget)
- [Phase 7 — PRD Approval & Freeze Workflow](#phase-7--prd-approval--freeze-workflow)
  - [7A — Approval State Machine](#7a--approval-state-machine)
  - [7B — Stakeholder Sign-Off Matrix](#7b--stakeholder-sign-off-matrix)
  - [7C — Immutability Contract](#7c--immutability-contract)
  - [7D — Downstream Unlock Sequence](#7d--downstream-unlock-sequence)
- [TypeScript Interfaces](#typescript-interfaces)
- [Zod Validation Schemas](#zod-validation-schemas)
- [Example Generated PRDs](#example-generated-prds)
  - [Archetype A — Bootstrap SaaS MVP PRD](#archetype-a--bootstrap-saas-mvp-prd)
  - [Archetype B — Series-A B2B Platform PRD](#archetype-b--series-a-b2b-platform-prd)
  - [Archetype C — Enterprise Compliance Platform PRD](#archetype-c--enterprise-compliance-platform-prd)
- [PRD Generation Version History](#prd-generation-version-history)

---

## Purpose & Philosophy

This document is **Document 2 of 4** in the Multi-Stage Architecture Orchestration Pipeline.

It defines the deterministic algorithm that transforms a fully completed `REQUIREMENTS_INTAKE.md`
(Document 1) into a production-grade, stakeholder-ready Product Requirements Document (PRD).

### What This Document Is

This is not a PRD template. It is a **PRD generation engine specification**.

It defines:
- How tensions are detected from intake data
- How a stability score is computed
- How an architecture archetype is selected — not suggested, but **computed**
- How each technology in the stack is prescribed with specific rationale
- How the PRD document is structured and what each section must contain
- How the quality of the generated PRD is scored
- How clarification requests feed back into regeneration
- How the PRD is approved and frozen for downstream use

### Why Determinism?

Architecture decisions are not opinions. Given identical constraints, two experienced engineers
should arrive at identical (or near-identical) architectural decisions. The gap between "two
engineers disagreed" and "the algorithm decided" is accountability.

When this pipeline outputs: **"Monolith — forced: bootstrap budget + 4-week timeline"**, that is
not a recommendation. That is a **computed conclusion** from declared constraints. If stakeholders
disagree, they must change the input constraints, not argue about the output.

This prevents:
- Architecture debates that are actually budget debates in disguise
- Technology preference arguments that should be trade-off analyses
- Scope creep from vague requirements surviving into design
- PRDs that pass review but fail engineering reality

### The Contract

```
Input:   Completed REQUIREMENTS_INTAKE.md (status = SUBMITTED or APPROVED)
Process: Deterministic 7-phase pipeline defined in this document
Output:  PRD document + Architecture Decision Records + Risk Register + Evolution Roadmap
Gate:    PRD must pass quality gate (score ≥ 85/100) before approval
Freeze:  Approved PRD is immutable; all downstream documents reference its frozen ID
```

---

## PRD Generation Pipeline Overview

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    PRD GENERATION PIPELINE                                  │
│                                                                              │
│  ┌───────────────┐                                                           │
│  │  INTAKE FORM  │  (REQUIREMENTS_INTAKE.md — status: SUBMITTED)            │
│  └───────┬───────┘                                                           │
│          │                                                                   │
│          ▼                                                                   │
│  ┌───────────────────────┐                                                  │
│  │  PHASE 1              │  Tension Detection → Stability Score → Risk Level │
│  │  STABILITY ANALYSIS   │                                                  │
│  └───────────┬───────────┘                                                  │
│              │                                                               │
│              ▼                                                               │
│  ┌───────────────────────┐                                                  │
│  │  PHASE 2              │  Archetype Matrix → Forced Overrides → Reasoning │
│  │  ARCHETYPE SELECTION  │                                                  │
│  └───────────┬───────────┘                                                  │
│              │                                                               │
│              ▼                                                               │
│  ┌───────────────────────┐                                                  │
│  │  PHASE 3              │  Frontend → Backend → DB → Cache → Auth →        │
│  │  STACK PRESCRIPTION   │  Queue → Storage → Observability → Hosting        │
│  └───────────┬───────────┘                                                  │
│              │                                                               │
│              ▼                                                               │
│  ┌───────────────────────┐                                                  │
│  │  PHASE 4              │  Template Population → Section Generation →      │
│  │  PRD GENERATION       │  ADRs → Risk Register → Roadmap                  │
│  └───────────┬───────────┘                                                  │
│              │                                                               │
│              ▼                                                               │
│  ┌───────────────────────┐                                                  │
│  │  PHASE 5              │  Completeness Score → Consistency Checks →       │
│  │  QUALITY GATE         │  Pass (≥85) or Fail (trigger Phase 6)            │
│  └───────────┬───────────┘                                                  │
│              │                                                               │
│    ┌─────────┴──────────┐                                                   │
│    │                    │                                                    │
│    ▼ FAIL               ▼ PASS                                              │
│  ┌──────────┐    ┌──────────────────┐                                       │
│  │ PHASE 6  │    │    PHASE 7       │                                       │
│  │ ITERATION│───▶│ APPROVAL & FREEZE│                                       │
│  │   LOOP   │    └──────────────────┘                                       │
│  └──────────┘                                                                │
└────────────────────────────────────────────────────────────────────────────┘
```

### Phase Execution Rules

| Phase | Trigger | Blocks On | Output |
|---|---|---|---|
| Phase 1 | Intake status = SUBMITTED | Unresolved critical ambiguities | TensionReport |
| Phase 2 | Phase 1 complete | Unresolvable archetype conflict | ArchetypeDecision |
| Phase 3 | Phase 2 complete | None (all decisions are forced) | StackManifest |
| Phase 4 | Phase 3 complete | None | PRDDraft |
| Phase 5 | Phase 4 complete | None | QualityReport |
| Phase 6 | Phase 5 score < 85 | Max iterations exceeded | Updated PRDDraft |
| Phase 7 | Phase 5 score ≥ 85 | Missing stakeholder approvals | FrozenPRD |

---

## Prerequisite: Intake Readiness Check

Before Phase 1 begins, the pipeline MUST verify the following conditions. If any condition fails,
the pipeline HALTS and issues the corresponding error.

```
READINESS CHECK RULES
──────────────────────────────────────────────────────────────────────────────
CHECK-001  Intake status must be SUBMITTED or APPROVED
           └─ FAIL: "Intake status is ${status}. Submit the intake form first."

CHECK-002  All [REQUIRED] fields must be non-null and non-empty
           └─ FAIL: List all missing required fields

CHECK-003  All enum fields must contain valid option values
           └─ FAIL: "Field ${field} contains invalid value ${value}. Valid options: ${options}"

CHECK-004  Interdependency rules must be satisfied
           └─ FAIL: "Field ${dependent} requires ${dependency} to be set to ${requiredValue}"

CHECK-005  No AMBIGUOUS fields with confidence < 0.7 on REQUIRED questions
           └─ FAIL: Escalate to CLARIFICATION_PROCESS.md

CHECK-006  Intake form version must be compatible with PRD generation engine version
           └─ FAIL: "Intake schema v${intakeVersion} is not supported. Minimum: v1.0.0"
──────────────────────────────────────────────────────────────────────────────
```

If all 6 checks pass, the pipeline logs:

```
✅ READINESS CHECK PASSED
   Intake Form ID: ${intakeFormId}
   Submitted At:   ${submittedAt}
   Submitted By:   ${submittedBy}
   PRD Run ID:     ${prdRunId}   (auto-generated UUID for this generation run)
   Proceeding to Phase 1...
```

---

## Phase 1 — Stability Analysis

Phase 1 analyzes the intake data for architectural contradictions, computes a stability score,
and classifies the overall risk level. This score directly controls Phase 2 (archetype selection)
and is permanently embedded in the generated PRD.

### 1A — Tension Detection Engine

The Tension Detection Engine scans the intake form for contradictions between declared constraints.
Each contradiction is called a **tension**. Tensions are classified by severity.

#### Severity Classifications

| Severity | Code | Definition |
|---|---|---|
| Critical | `CRIT` | A contradiction that, if unresolved, will cause production failure, legal/compliance violation, or complete timeline collapse. Deducts 25 points. |
| Warning | `WARN` | A contradiction that creates operational difficulty, cost overrun, or delivery risk. Deducts 10 points. |
| Info | `INFO` | A friction point that should be noted but does not materially change the architecture. Deducts 0 points but appears in Risk Register. |

#### Tension Report Structure

Every detected tension is recorded as:

```
TENSION-{NNN}
  Severity:    CRIT | WARN | INFO
  Field A:     {intakeFieldName} = {value}
  Field B:     {intakeFieldName} = {value}
  Rule:        {tensionRuleId}
  Description: {human-readable explanation}
  Score Impact: -{points}
  Mitigation:  {what the stakeholder must do to resolve this tension}
```

---

### 1B — Stability Score Computation

The stability score is a 0–100 integer computed as follows:

```
BASE SCORE = 100

For each detected tension:
  IF severity = CRITICAL: score -= 25
  IF severity = WARNING:  score -= 10
  IF severity = INFO:     score -= 0

COMPOSITE AMPLIFICATION (see section 1E):
  IF 3 or more CRITICAL tensions: additional -10 (system is fundamentally unstable)
  IF budget = bootstrap AND timeline ≤ 60 days AND scale ≥ mid_market: additional -15

FLOOR = 0 (score cannot go below 0)

FINAL STABILITY SCORE = MAX(0, BASE_SCORE - sum_of_deductions)
```

The stability score is **deterministic**. Given identical inputs, the score is always identical.
It cannot be adjusted by stakeholder preference or AI judgement.

---

### 1C — Risk Level Classification

The stability score maps to a risk level:

| Score Range | Risk Level | Color Code | Meaning |
|---|---|---|---|
| 75–100 | **Low Risk** | 🟢 | Constraints are coherent. Proceed with standard caution. |
| 50–74 | **Medium Risk** | 🟡 | At least one significant contradiction. Resolve before MVP launch. |
| 25–49 | **High Risk** | 🟠 | Multiple serious contradictions. Stakeholder alignment required before proceeding. |
| 0–24 | **Critical Risk** | 🔴 | System is fundamentally unstable. Pipeline recommends HALT and stakeholder realignment. |

#### Risk Level Consequences

| Risk Level | PRD Generation | Archetype | Stakeholder Review Required |
|---|---|---|---|
| Low Risk | Proceed normally | Standard matrix applies | Optional |
| Medium Risk | Proceed with tension callouts in PRD | Standard matrix applies | Recommended |
| High Risk | Proceed with mandatory ADR for each tension | May force downgrade | Required |
| Critical Risk | Generate PRD but mark as PROVISIONAL | Monolith forced regardless of preference | Mandatory before any downstream work |

---

### 1D — Tension Severity Catalogue

This is the exhaustive catalogue of detectable tensions. Rules are applied in order.
Multiple tensions may fire simultaneously.

#### Budget vs Scale Tensions

| Rule ID | Field A | Field B | Condition | Severity | Description |
|---|---|---|---|---|---|
| `T-BS-001` | `fundingStage = bootstrap` | `projectScale = enterprise` | Both true | CRIT | Enterprise-scale ambitions require enterprise-grade infrastructure. Bootstrap budget cannot sustain multi-region, HA, compliance, and the team required to operate it. |
| `T-BS-002` | `fundingStage = bootstrap` | `projectScale = mid_market` | Both true | WARN | Mid-market scale with bootstrap budget creates unsustainable unit economics. Plan for re-architecture at Series-A. |
| `T-BS-003` | `fundingStage = seed` | `projectScale = enterprise` | Both true | WARN | Seed funding for enterprise scale introduces architectural debt that compounds. Clarify scale expectations. |
| `T-BS-004` | `fundingStage = bootstrap` | `monthlyInfrastructureBudget < 500` | Both true | WARN | Very low infrastructure budget constrains managed service choices. Expect more operational burden. |
| `T-BS-005` | `fundingStage = bootstrap` | `availabilitySLA = 99.99` | Both true | CRIT | 99.99% availability requires multi-region active-active, automated failover, and 24/7 on-call. Bootstrap budget cannot fund this. |

#### Timeline vs Complexity Tensions

| Rule ID | Field A | Field B | Condition | Severity | Description |
|---|---|---|---|---|---|
| `T-TC-001` | `architecturePreference = microservices` | `mvpTimelineDays ≤ 28` | Both true | CRIT | Microservices require service mesh, inter-service auth, distributed tracing, and contract testing. A 4-week timeline is insufficient by an order of magnitude. |
| `T-TC-002` | `architecturePreference = microservices` | `mvpTimelineDays ≤ 90` | Both true | WARN | Microservices in under 90 days produces poorly bounded services that must be re-split. Plan for re-architecture. |
| `T-TC-003` | `requiresRealTime = true` | `mvpTimelineDays ≤ 14` | Both true | CRIT | Real-time systems require infrastructure setup (Pub/Sub, WebSocket management, reconnection logic) that cannot be completed in 14 days. |
| `T-TC-004` | `multiTenancyModel = database_per_tenant` | `mvpTimelineDays ≤ 60` | Both true | WARN | Database-per-tenant provisioning requires dynamic schema migration tooling. 60 days is insufficient for production-grade implementation. |
| `T-TC-005` | `devTeamSize = solo` | `mvpTimelineDays ≤ 30` AND `projectScale ≥ mid_market` | All true | CRIT | Solo developer + mid-market scale + sub-30-day timeline produces unmaintainable code that will be rewritten. |
| `T-TC-006` | `testingLayers includes e2e` | `mvpTimelineDays ≤ 21` | Both true | WARN | E2E test infrastructure setup (Playwright, test data seeding, CI integration) requires at least 1 week of dedicated engineering. |

#### Compliance vs Budget Tensions

| Rule ID | Field A | Field B | Condition | Severity | Description |
|---|---|---|---|---|---|
| `T-CB-001` | `complianceFrameworks includes hipaa` | `fundingStage = bootstrap` | Both true | CRIT | HIPAA compliance requires BAAs, audit logging, encryption at rest/transit, penetration testing, and security policies. Bootstrap budget cannot sustain a compliant HIPAA operation. |
| `T-CB-002` | `complianceFrameworks includes soc2_type2` | `fundingStage = bootstrap` | Both true | CRIT | SOC 2 Type II requires continuous monitoring, a 12-month observation period, and annual audits ($15K–$50K). Bootstrap budget makes this operationally impossible. |
| `T-CB-003` | `complianceFrameworks includes gdpr` | `fundingStage = bootstrap` | Both true | WARN | GDPR requires DPA agreements, data subject request workflows, breach notification systems, and a DPO for large-scale processing. Bootstrap is feasible but requires prioritization. |
| `T-CB-004` | `complianceFrameworks includes pci_dss` | `fundingStage ≤ seed` | Both true | CRIT | PCI DSS Level 1 certification costs $50K–$300K/year in audits and requires dedicated security engineering. This is incompatible with seed-stage funding. |
| `T-CB-005` | `complianceFrameworks includes fedramp` | `fundingStage ≤ series_a` | Both true | CRIT | FedRAMP authorization costs $1M–$3M and takes 12–24 months. Series-A or lower cannot sustain this. |

#### Architecture vs Team Tensions

| Rule ID | Field A | Field B | Condition | Severity | Description |
|---|---|---|---|---|---|
| `T-AT-001` | `architecturePreference = microservices` | `devTeamSize = solo OR small` | Both true | CRIT | Microservices operated by a solo/small team creates unmanageable operational overhead. Each service requires its own deployment pipeline, monitoring, and on-call rotation. |
| `T-AT-002` | `dbIsolationPerTenant = database_per_tenant` | `devTeamSize = solo` | Both true | WARN | Database-per-tenant with a solo developer means migrations, backups, and failover multiply with tenant count. This is unsustainable. |
| `T-AT-003` | `requiresAI = true` AND `aiDataPrivacy = no_external_ai` | `devTeamSize = solo OR small` | Both true | WARN | Self-hosted LLM inference requires dedicated ML infrastructure expertise and ongoing GPU instance management. Small teams rarely have this capacity. |
| `T-AT-004` | `openTelemetryRequired = true` | `devTeamSize = solo` | Both true | INFO | Full OpenTelemetry setup (traces, metrics, logs) requires non-trivial instrumentation time. Budget appropriately. |

#### Performance vs Infrastructure Tensions

| Rule ID | Field A | Field B | Condition | Severity | Description |
|---|---|---|---|---|---|
| `T-PI-001` | `targetApiP95 ≤ 100ms` | `cacheLayerRequired = false` | Both true | WARN | Sub-100ms P95 API response without a cache layer requires extremely optimized database queries and will be fragile at scale. |
| `T-PI-002` | `peakRPS ≥ 10000` | `archetype = monolith` | Both true | WARN | 10K+ RPS on a single monolith instance requires horizontal scaling with load balancing and careful session management. Document the scaling plan. |
| `T-PI-003` | `coldStartTolerance = zero` | `deploymentPlatform includes serverless` | Both true | CRIT | Zero cold-start tolerance is incompatible with serverless deployment. Serverless functions have inherent cold-start latency (50–3000ms). |
| `T-PI-004` | `targetFCP ≤ 1s` | `renderingStrategy = client_side_only` | Both true | WARN | Sub-1-second FCP with CSR requires aggressive code splitting, CDN-served assets, and service worker prefetching. SSR or SSG is strongly preferred. |
| `T-PI-005` | `peakRPS ≥ 1000` | `connectionPooling = none` | Both true | CRIT | 1K+ RPS without connection pooling will exhaust database connection limits and cause cascading failures. PgBouncer or equivalent is mandatory. |

#### Real-Time vs Infrastructure Tensions

| Rule ID | Field A | Field B | Condition | Severity | Description |
|---|---|---|---|---|---|
| `T-RT-001` | `requiresRealTime = true` | `realTimeScale ≥ 10k_concurrent` AND `realTimeProtocol = polling` | All true | CRIT | 10K+ concurrent polling clients create unsustainable server load. WebSocket or SSE infrastructure is required at this scale. |
| `T-RT-002` | `requiresRealTime = true` | `realTimeDeliveryGuarantee = exactly_once` AND `realTimeProtocol = sse` | Both true | WARN | SSE does not natively support exactly-once delivery. A message deduplication layer is required. |
| `T-RT-003` | `requiresRealTime = true` | `deploymentPlatform = vercel` AND `realTimeProtocol = websocket` | Both true | WARN | Vercel serverless functions have a 60-second execution limit, making persistent WebSocket connections impossible. Use a dedicated WebSocket server. |

#### AI / ML vs Compliance Tensions

| Rule ID | Field A | Field B | Condition | Severity | Description |
|---|---|---|---|---|---|
| `T-AC-001` | `aiProvider includes openai OR anthropic` | `complianceFrameworks includes hipaa` | Both true | CRIT | Sending PHI to external AI providers (OpenAI, Anthropic) without a signed BAA violates HIPAA. Verify BAA status or use Azure OpenAI with HIPAA addendum. |
| `T-AC-002` | `aiDataPrivacy = no_external_ai` | `aiProvider includes openai OR anthropic OR gemini` | Both true | CRIT | The intake specifies no external AI data processing but lists external AI providers. This is a direct contradiction. |
| `T-AC-003` | `requiresAI = true` | `aiMonthlyCostCeiling < 100` AND `aiFeatures includes text_generation` | Both true | WARN | Text generation at meaningful scale costs significantly more than $100/month. Cost ceiling may require prompt caching, output length limits, or usage quotas. |

---

### 1E — Composite Tension Amplification

When multiple tensions interact, their combined effect is greater than the sum of their parts.
The following amplification rules apply **after** all individual tensions are computed.

```
AMPLIFICATION RULE A — FUNDAMENTAL INSTABILITY
  Trigger: 3 or more CRITICAL tensions detected
  Additional Deduction: -10 points
  Message: "Three or more critical contradictions indicate fundamental misalignment between
            ambition, budget, timeline, and capacity. The system design cannot be made stable
            without resolving at least two of the three primary constraints."

AMPLIFICATION RULE B — BOOTSTRAPPED OVERREACH
  Trigger: fundingStage = bootstrap AND mvpTimelineDays ≤ 60 AND projectScale ≥ mid_market
  Additional Deduction: -15 points
  Message: "Bootstrap budget + aggressive timeline + mid-market scale is a high-failure
            combination. 78% of projects with this profile require complete architectural
            rework within 18 months. Reduce scope or increase runway before proceeding."

AMPLIFICATION RULE C — COMPLIANCE STACK OVERLOAD
  Trigger: 3 or more compliance frameworks declared AND fundingStage ≤ seed
  Additional Deduction: -10 points
  Message: "Three or more compliance frameworks with seed-stage funding creates an
            engineering team that spends more time on compliance than product. Prioritize
            compliance frameworks by customer requirement, not aspirational certification."

AMPLIFICATION RULE D — SOLO OPERATOR COMPLEXITY OVERLOAD
  Trigger: devTeamSize = solo AND (requiresRealTime = true OR aiDataPrivacy = no_external_ai
           OR multiTenancyModel = database_per_tenant)
  Additional Deduction: -10 points
  Message: "A solo operator with real-time, self-hosted AI, or database-per-tenant multi-tenancy
            creates unsustainable operational complexity. Simplify at least one dimension."
```

---

## Phase 2 — Architecture Archetype Selection

Phase 2 takes the stability score and key intake fields to deterministically select the
architecture archetype. This is not a recommendation — it is a computed decision.

### 2A — Archetype Decision Matrix

The matrix is evaluated **top to bottom**. The **first matching rule** wins.

```
ARCHETYPE DECISION MATRIX
──────────────────────────────────────────────────────────────────────────────────────────
Priority  Condition                                           Archetype       Override
──────────────────────────────────────────────────────────────────────────────────────────
  1       stabilityScore < 50                                monolith        FORCED
  2       fundingStage = bootstrap                           monolith        FORCED
  3       mvpTimelineDays ≤ 42                               monolith        FORCED
  4       devTeamSize = solo                                 monolith        FORCED
  5       CRITICAL tension T-TC-001 detected                 monolith        FORCED
          (microservices + timeline ≤ 28 days)
  6       CRITICAL tension T-AT-001 detected                 monolith        FORCED
          (microservices + solo/small team)
  7       stabilityScore ≥ 50 AND fundingStage = seed        modular_monolith SUGGESTED
          AND projectScale ≤ mid_market
  8       stabilityScore ≥ 70                                modular_monolith SUGGESTED
          AND fundingStage ∈ {seed, series_a}
          AND projectScale ≤ mid_market
  9       stabilityScore ≥ 70                                microservices   SUGGESTED
          AND fundingStage ≥ series_a
          AND projectScale = enterprise
          AND devTeamSize ∈ {large, enterprise}
          AND mvpTimelineDays > 180
 10       All other cases                                    modular_monolith DEFAULT
──────────────────────────────────────────────────────────────────────────────────────────
```

**FORCED** archetype: Stakeholder-declared `architecturePreference` is overridden.
**SUGGESTED** archetype: Stakeholder-declared preference is honored if it matches; otherwise
the matrix archetype is used and the override is documented in an ADR.

---

### 2B — Forced Archetype Override Rules

When the computed archetype overrides the stakeholder's `architecturePreference`, the pipeline:

1. Records an **Architecture Decision Record (ADR-001)** with the override rationale
2. Lists all constraints that forced the override
3. States what constraints must change to unlock the preferred archetype
4. Sets `archetypeOverridden = true` in the PRD metadata
5. Adds the override as a **WARN-level item** in the Quality Gate

**Override Message Template:**

```
ADR-001: Architecture Archetype Override
─────────────────────────────────────────────────────────────────
Stakeholder Preference: ${architecturePreference}
Computed Archetype:     ${computedArchetype}
Override Type:          FORCED

Reason: ${archetype} was declared but is not viable because:
  ${forEach matchedForcingRule}
    - Rule ${ruleId}: ${ruleDescription}
    - Forcing Condition: ${fieldA} = ${valueA}, ${fieldB} = ${valueB}
  ${endForEach}

To unlock ${architecturePreference}:
  ${forEach matchedForcingRule}
    - Change ${fieldName} from ${currentValue} to ${requiredValue}
  ${endForEach}

Impact: This override does not change product functionality. It changes
the deployment topology and team structure required to operate it.
The ${computedArchetype} can evolve to ${architecturePreference} in
Phase 2 of the Evolution Roadmap when constraints change.
─────────────────────────────────────────────────────────────────
```

---

### 2C — Archetype Reasoning Template

For every archetype selection (forced or not), the pipeline generates a mandatory reasoning block:

```
ARCHETYPE DECISION
──────────────────────────────────────────────────────────────────
Selected Archetype:   ${archetype}
Selection Method:     FORCED | SUGGESTED | DEFAULT
Stability Score:      ${score}/100
Risk Level:           ${riskLevel}

Reasoning:
  ${archetype} was selected because:
  ${primary_reason}

  Constraint summary:
  - Funding Stage:    ${fundingStage}
  - Team Size:        ${devTeamSize}
  - MVP Timeline:     ${mvpTimelineDays} days
  - Target Scale:     ${projectScale}
  - Critical Tensions: ${criticalTensionCount}

  This archetype is ${appropriate | suboptimal but forced} for:
  - Budget coherence
  - Team capacity
  - Timeline feasibility
  - Operational complexity
──────────────────────────────────────────────────────────────────
```

---

### 2D — Evolution Path Planning

Every PRD includes a 3-stage evolution roadmap anchored to the selected archetype.

| Archetype at MVP | Stage 1 (MVP) | Stage 2 (Growth) | Stage 3 (Scale) |
|---|---|---|---|
| monolith | Single deployable monolith, vertical scaling | Modular monolith with internal domain separation, horizontal scaling with load balancer | Extract highest-load domains to independent services as justified by traffic data |
| modular_monolith | Internal module boundaries enforced at code level, shared DB | Module-specific caches, read replicas, feature flags for gradual rollout | Extract performance-critical modules to services with dedicated databases |
| microservices | 3–5 bounded services with clear contracts | Service mesh (Istio/Linkerd), distributed tracing, independent deployments | Full service independence, dedicated DBs per service, event-driven integration |

The evolution roadmap is **not a timeline**. It is a capability unlocked when:
- Traffic data justifies decomposition
- Team capacity supports operational overhead
- Budget supports infrastructure expansion

---

## Phase 3 — Stack Prescription Engine

Phase 3 deterministically selects every technology in the stack. Each decision is derived
from intake fields via the decision trees below. No technology is selected by preference
unless all other conditions are equal.

### 3A — Frontend Decision Tree

```
INPUT FIELDS: renderingStrategy, seoRequired, targetFCP, nextjsRouterType, i18nRequired,
              themingRequired, staticExportRequired

FRONTEND FRAMEWORK
  → Always: Next.js (framework is fixed per pipeline scope)

ROUTER TYPE
  IF nextjsRouterType = app_router → Use App Router (recommended)
  IF nextjsRouterType = pages_router → Use Pages Router (document reason in ADR)

RENDERING STRATEGY
  IF seoRequired = true AND renderingStrategy = client_side_only
    → OVERRIDE to hybrid (SSR for public pages, CSR for app)
    → Record ADR: SEO requirement forces SSR for public-facing pages
  IF staticExportRequired = true AND renderingStrategy includes ssr
    → OVERRIDE: Static export is incompatible with SSR dynamic routes
    → Document which routes must be statically exported
  IF targetFCP ≤ 1s AND renderingStrategy = client_side_only
    → ADD WARNING: CSR alone cannot reliably achieve <1s FCP without aggressive optimization
  OTHERWISE → Use declared renderingStrategy

STYLING
  → Always: Tailwind CSS (standardized for this pipeline version)
  → Component library: shadcn/ui (Radix UI primitives, accessible, unstyled base)

THEMING
  IF themingRequired = none → Single theme, Tailwind config only
  IF themingRequired = dark_mode → Tailwind dark mode class strategy
  IF themingRequired = tenant_theming → CSS custom properties per tenant, Next.js middleware
                                        injects tenant theme variables

I18N
  IF i18nRequired = false → No i18n infrastructure
  IF i18nRequired = true → next-intl (App Router compatible, type-safe)
```

---

### 3B — Backend / API Decision Tree

```
INPUT FIELDS: apiArchitecture, apiVersioningStrategy, apiAuthMethod, rateLimitingStrategy,
              apiDocumentation, outboundWebhooks, useResponseEnvelope

API ARCHITECTURE
  IF apiArchitecture = rest → Next.js Route Handlers (app/api/**/route.ts)
  IF apiArchitecture = graphql → Add Apollo Server + type-graphql (document in ADR)
  IF apiArchitecture = trpc → tRPC v11 with Next.js adapter (document in ADR)
  IF apiArchitecture = rest_and_graphql → REST for external, GraphQL for internal BFF

API VERSIONING
  IF apiVersioningStrategy = url_versioning → /api/v1/, /api/v2/ route groups
  IF apiVersioningStrategy = header_versioning → X-API-Version header, middleware routing
  IF apiVersioningStrategy = none → No versioning (document: breaking changes require migration)

RATE LIMITING
  IF rateLimitingStrategy = none → No rate limiting (add INFO tension: security risk)
  IF rateLimitingStrategy = global → upstash/ratelimit with Redis backing
  IF rateLimitingStrategy = per_user → upstash/ratelimit, keyed by user ID
  IF rateLimitingStrategy = tenant_based → upstash/ratelimit, keyed by tenant ID

API DOCUMENTATION
  IF apiDocumentation = none → No documentation (add WARN: DX liability)
  IF apiDocumentation = openapi_manual → swagger-ui-react + manually maintained spec
  IF apiDocumentation = openapi_auto → zod-to-openapi (derives spec from Zod schemas)
  IF apiDocumentation = trpc_panel → Only valid with tRPC architecture

RESPONSE ENVELOPE
  IF useResponseEnvelope = true → Enforce ok()/fail() envelope (mandatory per GOVERNANCE.md)
  IF useResponseEnvelope = false → Add WARN: Inconsistent response shapes create client fragility

OUTBOUND WEBHOOKS
  IF outboundWebhooks = true → Add svix (webhook delivery infrastructure)
                               Record: Svix provides delivery retry, signature verification, portal
```

---

### 3C — Database Selection Engine

```
INPUT FIELDS: primaryDatabase, ormChoice, multiTenancyModel, dbIsolationPerTenant,
              readReplicaRequired, connectionPooling, migrationStrategy, seedingStrategy,
              dataVolumeAt12Months, backupStrategy, analyticsRequired

PRIMARY DATABASE
  IF primaryDatabase = postgresql
    IF fundingStage = bootstrap → Neon (serverless Postgres, no idle cost)
    IF fundingStage = seed → Supabase Postgres OR Neon (scale-based decision)
    IF fundingStage = series_a AND deploymentPlatform = aws → AWS RDS PostgreSQL
    IF fundingStage ≥ series_a AND availabilitySLA ≥ 99.9 → AWS RDS Multi-AZ
    IF fundingStage ≥ series_b AND peakRPS ≥ 5000 → AWS Aurora PostgreSQL (autoscaling)

  IF primaryDatabase = mysql
    IF fundingStage = bootstrap → PlanetScale Hobby (MySQL-compatible, branching)
    IF fundingStage ≥ seed → AWS RDS MySQL Multi-AZ

  IF primaryDatabase = mongodb
    IF fundingStage = bootstrap → MongoDB Atlas M0 (free tier)
    IF fundingStage ≥ seed → MongoDB Atlas M10+ (dedicated)

  IF primaryDatabase = sqlite
    → ONLY permitted for: fundingStage = bootstrap AND devTeamSize = solo
    → Add WARN: SQLite has no concurrent write support; plan migration before any team growth

ORM SELECTION
  IF ormChoice = prisma → Prisma ORM (type-safe, migration-based, this pipeline's standard)
  IF ormChoice = drizzle → Drizzle ORM (lighter, SQL-like, recommended for edge deployments)
  IF ormChoice = typeorm → Add WARN: TypeORM has known N+1 issues; ensure query optimization
  IF ormChoice = raw_sql → Add WARN: No migration tooling; add a migration library (pg-migrate)

MULTI-TENANCY DATABASE ISOLATION
  IF dbIsolationPerTenant = shared_schema → Row-level tenantId on all tenant-scoped tables
  IF dbIsolationPerTenant = schema_level → PostgreSQL schemas per tenant, connection routing
  IF dbIsolationPerTenant = database_per_tenant → Dynamic DB provisioning required
    → Add WARN if devTeamSize = solo OR small: High operational overhead
    → Requires: tenant provisioning service + migration orchestration + backup per tenant

CONNECTION POOLING
  IF connectionPooling = none AND peakRPS ≥ 100 → FORCE PgBouncer
    → Record ADR: Connection pooling forced by RPS requirement
  IF connectionPooling = pgbouncer → PgBouncer sidecar or managed (Railway PgBouncer)
  IF connectionPooling = rds_proxy → AWS RDS Proxy (only for AWS deployments)
  IF connectionPooling = prisma_accelerate → Prisma Accelerate (Prisma's managed proxy)

READ REPLICAS
  IF readReplicaRequired = false AND peakRPS ≥ 5000 → ADD WARN: Consider read replicas
  IF readReplicaRequired = true AND deploymentPlatform = aws → RDS Read Replica (same region)
  IF readReplicaRequired = true AND deploymentPlatform = vercel → Neon read replicas

ANALYTICS
  IF analyticsRequired = true AND dataVolumeAt12Months ≥ 100gb_to_1tb
    → Add ClickHouse or BigQuery for analytics (separate from OLTP DB)
    → Record: OLTP and OLAP on the same database is an anti-pattern at this data volume
  IF analyticsRequired = true AND dataVolumeAt12Months < 100gb_to_1tb
    → Postgres analytics views or Metabase on read replica is sufficient
```

---

### 3D — Caching Layer Decision Tree

```
INPUT FIELDS: cacheLayerRequired, cacheTechnology, cacheTargets, cacheInvalidationStrategy,
              nextjsDataCache, requiresRealTime, rateLimitingStrategy

CACHE LAYER
  IF cacheLayerRequired = false AND rateLimitingStrategy ≠ none
    → FORCE cache layer for rate limit counters
    → Record ADR: Cache required for rate limiting even without explicit cache requirement
  IF cacheLayerRequired = false AND requiresRealTime = true AND realTimeScale ≥ 1k_to_10k
    → FORCE cache layer for pub/sub or presence tracking

CACHE TECHNOLOGY
  IF cacheTechnology = redis
    IF fundingStage = bootstrap → Upstash Redis (serverless, per-request billing, free tier)
    IF fundingStage = seed → Upstash Redis OR Railway Redis
    IF fundingStage ≥ series_a AND deploymentPlatform = aws → AWS ElastiCache (Redis)
    IF fundingStage ≥ series_b AND peakRPS ≥ 5000 → ElastiCache Cluster Mode

  IF cacheTechnology = memcached → Only permitted if no pub/sub requirement; else force Redis
  IF cacheTechnology = none AND cacheLayerRequired = true → FORCE Redis (see above)

CACHE INVALIDATION
  IF cacheInvalidationStrategy = ttl_only → Simple; add WARN for stale data windows
  IF cacheInvalidationStrategy = event_based → Requires domain event bus (see queue section)
  IF cacheInvalidationStrategy = manual → Add WARN: Manual invalidation is error-prone at scale

NEXT.JS DATA CACHE
  IF nextjsDataCache = per_route → Route-level revalidation (revalidatePath / revalidateTag)
  IF nextjsDataCache = aggressive → Static generation with incremental revalidation
  IF nextjsDataCache = disabled → All data fetches bypass Next.js cache (SSR on every request)
```

---

### 3E — Authentication Provider Decision Tree

```
INPUT FIELDS: authLibrary, oauthProviders, sessionStrategy, mfaConfig, complianceFrameworks,
              multiTenancyModel

AUTH LIBRARY
  IF authLibrary = authjs_v5 → Auth.js v5 (Next.js 15 App Router compatible)
  IF authLibrary = authjs_v4 → NextAuth.js v4 (Pages Router; add ADR if using App Router)
  IF authLibrary = clerk → Clerk (hosted, embeddable UI; higher cost but faster time-to-auth)
    → Recommended for: bootstrap + solo developer + no compliance requirements
  IF authLibrary = supabase_auth → Supabase Auth (tied to Supabase DB; check DB selection)
  IF authLibrary = custom → Add CRIT WARN: Custom auth is a security anti-pattern. Use a library.

OAUTH PROVIDERS
  → Email/Password: bcrypt hashing mandatory (never MD5/SHA1)
  → Google: OAuth2 via Auth.js Google provider
  → GitHub: OAuth2 via Auth.js GitHub provider
  → Microsoft: OAuth2 or SAML via Auth.js Microsoft Entra provider
  → SAML: Use @auth/core SAML provider or Okta

COMPLIANCE-DRIVEN AUTH REQUIREMENTS
  IF complianceFrameworks includes hipaa
    → MFA: REQUIRED (TOTP minimum)
    → Session timeout: ≤ 15 minutes idle (configurable)
    → Audit log: Every login, logout, failed attempt must be logged
  IF complianceFrameworks includes soc2_type2
    → MFA: REQUIRED for admin and privileged roles
    → Password policy: minimum 12 chars, complexity enforcement
    → Failed attempt lockout: After 5 failures, 30-minute lockout
  IF complianceFrameworks includes gdpr
    → Session data: Must be deletable on user request
    → Consent: Record auth method and consent timestamp

SESSION STRATEGY
  IF sessionStrategy = database AND authLibrary = authjs_v5
    → Use @auth/prisma-adapter, store sessions in DB
    → Required for: HIPAA (audit trail), SOC 2, session revocation
  IF sessionStrategy = jwt
    → Stateless, no DB lookup per request; trade-off: no instant revocation
  IF sessionStrategy = database AND requiresRealTime = true
    → Session lookup on every WS connection; consider Redis session store for performance

MULTI-TENANCY AUTH
  IF multiTenancyModel ≠ single_tenant
    → Tenant resolution in middleware (read tenant from subdomain, path, or header)
    → Role assignments must be tenant-scoped (not global)
    → Super-admin must be able to impersonate tenant admin (audit logged)
```

---

### 3F — Queue / Job Infrastructure Decision Tree

```
INPUT FIELDS: requiresBackgroundJobs, jobQueuePreference, backgroundJobTypes,
              jobRetryStrategy, jobFailureHandling, deploymentPlatform

QUEUE INFRASTRUCTURE
  IF requiresBackgroundJobs = false → No queue infrastructure
  IF requiresBackgroundJobs = true

    IF jobQueuePreference = inngest
      → Inngest (event-driven, durable execution, built-in retries, Next.js native)
      → Recommended for: all funding stages; no infrastructure to manage
      → Event types map to: scheduled_cron → Inngest cron, event_driven → Inngest event fn

    IF jobQueuePreference = bull_mq
      → BullMQ + Redis (high-throughput queue with job prioritization)
      → Required: Redis instance (see caching section)
      → Recommended for: series_a+ with complex job topologies

    IF jobQueuePreference = trigger_dev
      → Trigger.dev (background jobs as code, OpenTelemetry native)
      → Cloud or self-hosted; good for long-running AI tasks

    IF jobQueuePreference = vercel_cron
      → Vercel Cron Jobs (ONLY for scheduled_cron; no event-driven support)
      → Add WARN if backgroundJobTypes includes event_driven: Vercel Cron cannot handle events

    IF jobQueuePreference = sqs_lambda (AWS)
      → AWS SQS + Lambda (event-driven; high scale; cold start considerations)
      → Add if coldStartTolerance = zero: Use provisioned concurrency

FAILURE HANDLING
  IF dead_letter_queue in jobFailureHandling → Configure DLQ in queue provider
  IF email_alert in jobFailureHandling → Integrate with email delivery provider
  IF slack_alert in jobFailureHandling → Add Slack webhook integration
  IF circuit_breaker in jobFailureHandling → Implement Opossum or similar circuit breaker
  IF dashboard_monitoring in jobFailureHandling → Inngest dashboard (built-in) OR Trigger.dev UI
```

---

### 3G — File Storage Decision Tree

```
INPUT FIELDS: requiresFileStorage, objectStorageProvider, uploadStrategy, acceptedFileTypes,
              maxFileSizeMB, fileProcessing, fileAccessModel, complianceFrameworks

FILE STORAGE
  IF requiresFileStorage = false → No storage infrastructure

  PROVIDER SELECTION
    IF objectStorageProvider = aws_s3
      IF fundingStage = bootstrap → AWS S3 with CloudFront CDN (pay-per-use)
      IF fundingStage ≥ seed → AWS S3 + CloudFront + S3 Transfer Acceleration

    IF objectStorageProvider = cloudflare_r2
      → Cloudflare R2 (S3-compatible, zero egress fees)
      → Recommended for: bootstrap OR high-egress scenarios

    IF objectStorageProvider = vercel_blob
      → Vercel Blob (Vercel-native; limited to 5GB on hobby)
      → Only for: bootstrap + Vercel deployment + small file volumes

    IF objectStorageProvider = supabase_storage
      → Only if primaryDatabase = supabase

  UPLOAD STRATEGY
    IF uploadStrategy = server_proxied
      → Files uploaded to Next.js API route, streamed to storage
      → Add WARN if maxFileSizeMB > 50: Proxied uploads ≥50MB will timeout on serverless
    IF uploadStrategy = client_direct
      → Presigned URL generated by API, client uploads directly to storage
      → Recommended for: all files > 10MB or serverless deployments

  FILE PROCESSING
    IF virus_scanning in fileProcessing → AWS Lambda + ClamAV on S3 upload event
    IF image_resizing in fileProcessing → Add sharp (Node.js) or AWS Lambda@Edge
    IF pdf_extraction in fileProcessing → Add pdf-parse or AWS Textract
    IF metadata_extraction in fileProcessing → Add exifr (images) or tika (documents)

  COMPLIANCE
    IF complianceFrameworks includes hipaa
      → S3 server-side encryption: mandatory (SSE-KMS)
      → Access logging: mandatory (S3 access logs to CloudTrail)
      → Bucket policy: Block public access, enforce VPC endpoint access
```

---

### 3H — Observability Stack Decision Tree

```
INPUT FIELDS: loggingProvider, errorTrackingProvider, apmProvider, openTelemetryRequired,
              metricsAndAlerting, complianceFrameworks, fundingStage

LOGGING
  IF loggingProvider = pino
    → Pino structured JSON logger (built into this pipeline's standard stack)
    → Log transport: stdout → cloud provider ingestion
  IF loggingProvider = datadog → @datadog/datadog-api-client + dd-trace
  IF loggingProvider = axiom → next-axiom (Axiom's Next.js SDK)
  IF loggingProvider = betterstack → logtail-next
  IF fundingStage = bootstrap → Axiom (generous free tier) OR BetterStack (free tier)
  IF fundingStage ≥ series_a → Datadog (unified platform: logs, APM, metrics, alerts)

ERROR TRACKING
  IF errorTrackingProvider = sentry → @sentry/nextjs (standard integration)
  IF errorTrackingProvider = datadog → Datadog Error Tracking (unified with logs)
  IF errorTrackingProvider = highlight → @highlight-run/next (session replay included)

APM
  IF apmProvider = datadog → Datadog APM + Distributed Tracing
  IF apmProvider = new_relic → New Relic APM
  IF apmProvider = none AND openTelemetryRequired = true → Add WARN: No APM backend

OPENTELEMETRY
  IF openTelemetryRequired = true
    → @opentelemetry/sdk-node + @opentelemetry/auto-instrumentations-node
    → Exporter: OTLP to declared APM provider (Datadog, Grafana Cloud, etc.)
    → Instrumentation: HTTP, Prisma, Redis, fetch (all auto-instrumented)
  IF openTelemetryRequired = false AND fundingStage ≥ series_a
    → ADD WARN: Series-A+ systems benefit strongly from distributed tracing

COMPLIANCE OBSERVABILITY
  IF complianceFrameworks includes hipaa
    → Audit log: Dedicated audit trail table (never deleted, 7-year retention default)
    → All PHI access events: logged with user ID, timestamp, resource, action
    → Log access controls: Only compliance officers and auditors can query audit logs
  IF complianceFrameworks includes soc2_type2
    → Security events: Authentication, authorization failures, admin actions
    → Availability metrics: Uptime tracking, incident timelines
    → Change management: Deployment events logged with deployer identity
```

---

### 3I — Hosting / Deployment Decision Tree

```
INPUT FIELDS: deploymentPlatform, managedServicesPreference, containerizationRequired,
              coldStartTolerance, monthlyInfrastructureBudget, cicdPlatform,
              deploymentStrategy, environments

HOSTING PLATFORM
  IF deploymentPlatform = vercel
    IF coldStartTolerance = zero → ADD CRIT: Vercel serverless has cold starts
    IF requiresRealTime = true AND realTimeProtocol = websocket
      → ADD WARN: Vercel does not support persistent WebSocket (60s timeout)
    → Suitable for: bootstrap, seed, series-a (front-end + serverless API)

  IF deploymentPlatform = aws
    IF containerizationRequired = true → AWS ECS Fargate (container orchestration)
    IF containerizationRequired = false → AWS App Runner OR Elastic Beanstalk
    IF peakRPS ≥ 10000 → AWS EKS (Kubernetes; requires dedicated DevOps)
    IF coldStartTolerance = zero → Fargate (always-on containers, no cold start)

  IF deploymentPlatform = railway
    → Railway (container-based, auto-deploy from GitHub; excellent DX)
    → Suitable for: bootstrap to seed; limited enterprise compliance

  IF deploymentPlatform = fly_io
    → Fly.io (global edge deployment, persistent volumes)
    → Suitable for: seed to series-a; good for latency-sensitive global apps

CI/CD
  IF cicdPlatform = github_actions
    → GitHub Actions workflows (standard for this pipeline)
    → Pipeline stages: type-check → lint → test → build → deploy
    IF deploymentStrategy = blue_green → Blue-green deploy via ECS task set swap
    IF deploymentStrategy = canary → Canary via AWS CodeDeploy weight routing
    IF deploymentStrategy = rolling → Rolling update via ECS deployment config
    IF deploymentStrategy = direct → Direct deploy (only for bootstrap/development)

ENVIRONMENTS
  IF environments includes preview
    → Vercel preview deployments OR GitHub Actions ephemeral environments
  IF environments includes staging
    → Dedicated staging cluster mirroring production topology
    → Stage-gated deployment: staging must pass smoke tests before production promote
  IF complianceFrameworks includes hipaa OR soc2_type2
    → Production and staging environments must be isolated (separate AWS accounts recommended)
```

