# ArchAI Architecture Documentation

## Overview

ArchAI is a production-grade Next.js 14 application that provides CTO-level architectural analysis
using a deterministic evaluation engine. It detects tensions, scores system stability, and produces
opinionated, actionable architecture blueprints.

---

## System Architecture

### Layer Model

```
┌─────────────────────────────────────────────┐
│              Next.js App Router              │
│   (pages, layouts, API routes)              │
├─────────────────────────────────────────────┤
│         Validation Layer (Zod)              │
│   Transport boundary — all input validated  │
├─────────────────────────────────────────────┤
│         Service Layer                       │
│   Use-case orchestration, no DB access      │
├─────────────────────────────────────────────┤
│         Domain Layer                        │
│   Pure business rules, no I/O               │
├─────────────────────────────────────────────┤
│         Repository Layer                    │
│   ONLY layer that accesses the database     │
├─────────────────────────────────────────────┤
│         Database (PostgreSQL + Prisma)      │
└─────────────────────────────────────────────┘
```

### Import Boundaries (strictly enforced by ESLint)

| Layer | May Import | May NOT Import |
|---|---|---|
| `app/api/` | validators, services, contracts, auth | db, repositories, domain |
| `lib/services/` | domain, repositories | db, HTTP, app |
| `lib/repositories/` | db/client | (nothing above) |
| `lib/domain/` | types | everything else |
| `components/ui/` | (nothing) | business logic, API, DB |
| `components/features/` | ui, types | db, repositories |

---

## Key Design Decisions

### 1. Repository Pattern
All database access is isolated to `src/lib/repositories/`. This enables:
- Easy database swap (Prisma → Drizzle, Postgres → CockroachDB)
- Testability via interface mocking
- Clear audit trail of all data mutations

### 2. API Envelope Contract
All API responses use `ApiSuccess<T> | ApiError` envelope shape. No raw objects are returned.
This ensures consistent client-side error handling and predictable response shapes.

### 3. Zod at Transport Boundaries
Zod schemas validate all inputs at the API route level before passing to services.
Domain layer receives only typed, validated data — never `unknown` or `any`.

### 4. Soft Deletes
All user-owned data uses `deletedAt` timestamps rather than hard deletes.
This enables audit trails, undo functionality, and compliance requirements.

### 5. Structured Logging (Pino)
All logs are structured JSON via Pino. Sensitive fields (tokens, passwords, PII) are
automatically redacted via the `redact` configuration.

---

## Authentication

NextAuth.js v4 with:
- JWT session strategy (stateless, scalable)
- Credentials provider (email + bcrypt password)
- Role stored in JWT token (`ADMIN | ARCHITECT | VIEWER`)
- RBAC enforced via `src/lib/auth/rbac.ts`

---

## Database Schema

See `prisma/schema.prisma` for the authoritative schema.

Key models:
- `User` — accounts with RBAC roles
- `Analysis` — architectural analysis records with soft-delete
- `Account` / `Session` — NextAuth adapter tables

---

## Environment Variables

See `.env.example` for required variables:
- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_SECRET` — JWT signing secret (min 32 chars)
- `NEXTAUTH_URL` — Application URL
- `LOG_LEVEL` — Pino log level (default: `info`)
