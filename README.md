# ArchAI — CTO-Level Architecture Analysis

ArchAI is a production-grade Next.js 14 application that delivers **principal-architect-level system design analysis**. It uses a deterministic evaluation engine to detect architectural tensions, score system stability, and prescribe opinionated, production-ready infrastructure blueprints.

---

## Features

- **Tension Detection** — Identifies contradictions (scale vs budget, timeline vs complexity, compliance vs cost)
- **Stability Scoring** — 0–100 score with risk classification (Low / Medium / High / Critical)
- **Archetype Selection** — Forced monolith when constraints demand it; microservices only when viable
- **Stack Prescription** — Specific tooling recommendations with concrete cost and scale reasoning
- **Evolution Roadmap** — 3-stage plan: Lean MVP → Scalable Startup → Enterprise Grade
- **Governance Rules** — Import boundaries, API contract policy, RBAC matrix, code review checklist

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Database | PostgreSQL via Prisma ORM |
| Auth | NextAuth.js v4 (JWT, RBAC) |
| Validation | Zod |
| UI | shadcn/ui + Tailwind CSS |
| Logging | Pino (structured JSON) |
| Linting | ESLint with architectural boundary rules |

---

## Quickstart

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Setup

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL and NEXTAUTH_SECRET

# Generate Prisma client and push schema
npm run db:generate
npm run db:push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript type check |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:studio` | Open Prisma Studio |

---

## Architecture

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the full system design.

### Layer Model

```
API Routes → Validators → Services → Domain (pure)
                              ↓
                        Repositories → Database
```

All import boundaries are enforced by ESLint rules. See [`docs/GOVERNANCE.md`](docs/GOVERNANCE.md) for rules.

---

## API

### `POST /api/analyze`

Requires authentication. Accepts analysis input, returns architectural analysis.

**Request body** (validated by Zod):
```json
{
  "description": "SaaS platform for...",
  "expectedScale": "startup | smb | enterprise",
  "architectureMode": "monolith | modular_monolith | microservices",
  "budget": "bootstrap | seed | series_a | enterprise",
  "timeline": "mvp_4w | mvp_3m | standard_6m | long_12m",
  "coreFeatures": "auth, billing, notifications...",
  "complianceFlags": ["GDPR", "HIPAA"]
}
```

**Response** (envelope pattern):
```json
{
  "success": true,
  "data": {
    "stabilityScore": 75,
    "riskLevel": "Low",
    "infraArchetype": "modular_monolith",
    "tensions": [...],
    "stack": {...},
    "evolutionRoadmap": [...]
  },
  "meta": { "timestamp": "2024-01-01T00:00:00.000Z" }
}
```

### `GET /api/health`

Returns database connectivity status.

---

## Docs

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — System design and layer model
- [`docs/MASTER_PROMPT.md`](docs/MASTER_PROMPT.md) — Analysis engine meta-prompt
- [`docs/GOVERNANCE.md`](docs/GOVERNANCE.md) — Engineering standards
- [`docs/FILE_CREATION_CHECKLIST.md`](docs/FILE_CREATION_CHECKLIST.md) — Pre-flight checklist
- [`docs/FOLDER_STRUCTURE.md`](docs/FOLDER_STRUCTURE.md) — Directory responsibilities