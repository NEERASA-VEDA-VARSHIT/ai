# ArchAI Folder Structure

Complete folder structure with responsibility definitions for every directory and file.

---

```
/home/runner/work/ai/ai/
├── src/
│   ├── app/                          Next.js App Router root
│   │   ├── (auth)/                   Route group: public auth pages (no dashboard nav)
│   │   │   ├── login/
│   │   │   │   └── page.tsx          Login form — client component, calls NextAuth signIn
│   │   │   └── layout.tsx            Centered layout for auth pages
│   │   ├── (dashboard)/              Route group: protected pages (dashboard nav)
│   │   │   ├── analyze/
│   │   │   │   └── page.tsx          Analysis form + results display
│   │   │   ├── projects/
│   │   │   │   └── page.tsx          List of saved analyses
│   │   │   └── layout.tsx            Dashboard nav wrapper
│   │   ├── api/
│   │   │   ├── analyze/
│   │   │   │   └── route.ts          POST /api/analyze — auth → validate → service → envelope
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts      NextAuth catch-all handler
│   │   │   └── health/
│   │   │       └── route.ts          GET /api/health — DB ping + status
│   │   ├── globals.css               Tailwind base/components/utilities
│   │   ├── layout.tsx                Root HTML shell, metadata, font
│   │   └── page.tsx                  Landing page — links to /analyze and /login
│   │
│   ├── components/
│   │   ├── ui/                       shadcn/ui primitives ONLY
│   │   │   └── (future: button.tsx, input.tsx, card.tsx, etc.)
│   │   └── features/                 Composed feature components
│   │       └── (future: AnalysisCard.tsx, TensionList.tsx, etc.)
│   │
│   ├── lib/
│   │   ├── domain/
│   │   │   └── analysis/
│   │   │       ├── entities.ts       Domain entity type — AnalysisEntity
│   │   │       └── rules.ts          Pure functions: detectTensions, computeScore, classifyRisk
│   │   ├── services/
│   │   │   └── analysis.service.ts   AnalysisService — orchestrates domain + repository
│   │   ├── repositories/
│   │   │   └── analysis.repository.ts  PrismaAnalysisRepository — ONLY DB access layer
│   │   ├── contracts/
│   │   │   ├── envelope.ts           ok() / fail() factory functions
│   │   │   └── errors.ts             ERROR_CODES constants
│   │   ├── validators/
│   │   │   └── analysis.schema.ts    Zod schema for AnalysisInput
│   │   ├── auth/
│   │   │   ├── config.ts             NextAuthOptions — providers, JWT callbacks
│   │   │   └── rbac.ts               hasPermission / assertPermission helpers
│   │   └── utils/
│   │       └── logger.ts             Pino logger singleton with redaction
│   │
│   ├── types/
│   │   ├── api.ts                    ApiSuccess<T>, ApiError, ApiResponse<T>
│   │   ├── analysis.ts               All analysis domain types + enums
│   │   └── rbac.ts                   ROLES, PERMISSIONS, Role, Resource, Action
│   │
│   └── db/
│       ├── client.ts                 Prisma singleton — THE ONLY PrismaClient instance
│       └── schema/
│           └── README.md             Schema documentation placeholder
│
├── prisma/
│   └── schema.prisma                 Database schema — source of truth
│
├── docs/
│   ├── ARCHITECTURE.md               System design and layer model
│   ├── MASTER_PROMPT.md              Hardened LLM meta-prompt for analysis engine
│   ├── GOVERNANCE.md                 Non-negotiable engineering standards
│   ├── FILE_CREATION_CHECKLIST.md    Pre-flight checklist before adding files
│   └── FOLDER_STRUCTURE.md           This file
│
├── .env.example                      Required environment variables template
├── .eslintignore                     ESLint ignore patterns
├── .eslintrc.json                    ESLint config with architectural boundary rules
├── .gitignore                        Git ignore patterns
├── .prettierrc                       Prettier formatting config
├── next.config.ts                    Next.js config (typed routes, fetch logging)
├── package.json                      Dependencies and scripts
├── postcss.config.mjs                PostCSS config for Tailwind
├── tailwind.config.ts                Tailwind CSS config
├── tsconfig.json                     TypeScript strict config with path aliases
└── README.md                         Project overview and quickstart
```

---

## Responsibility Summary

| Directory | Responsibility | May Import |
|---|---|---|
| `app/api/` | HTTP interface — validate, call service, return envelope | validators, services, contracts, auth |
| `lib/services/` | Use-case orchestration | domain, repositories |
| `lib/repositories/` | Data persistence — ONLY DB access | db/client |
| `lib/domain/` | Pure business logic — no I/O | types only |
| `lib/contracts/` | API shape factories and error constants | types/api |
| `lib/validators/` | Zod schemas at transport boundaries | types |
| `lib/auth/` | Auth config and RBAC helpers | db/client (config only), types |
| `lib/utils/` | Pure utilities and logger | (external packages only) |
| `types/` | TypeScript interfaces — zero runtime code | (nothing) |
| `db/` | Prisma client singleton | @prisma/client |
| `components/ui/` | shadcn primitives — zero business logic | (UI packages only) |
| `components/features/` | Feature compositions | components/ui, types |
