# File Creation Checklist

Use this checklist BEFORE creating or editing any file in the ArchAI codebase.

---

## Before Creating a New File

- [ ] **Does this file already exist?** Search the codebase before creating duplicates.
- [ ] **Is the correct layer?** Identify where this file belongs in the layer model.
- [ ] **Are imports correct?** Verify no boundary violations per `GOVERNANCE.md`.
- [ ] **Is there a Zod schema needed?** All data crossing API boundaries needs validation.
- [ ] **Does the response use the envelope?** API routes must use `ok()` / `fail()`.

---

## Layer Placement Guide

| What you're creating | Where it goes |
|---|---|
| API route handler | `src/app/api/[resource]/route.ts` |
| Use-case business logic | `src/lib/services/[name].service.ts` |
| Pure domain rules | `src/lib/domain/[domain]/rules.ts` |
| Domain entity types | `src/lib/domain/[domain]/entities.ts` |
| Database access | `src/lib/repositories/[name].repository.ts` |
| Zod input schema | `src/lib/validators/[name].schema.ts` |
| TypeScript types only | `src/types/[name].ts` |
| Reusable UI component | `src/components/ui/[name].tsx` |
| Feature-specific component | `src/components/features/[name].tsx` |
| Utility / pure function | `src/lib/utils/[name].ts` |

---

## Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Services | `[domain].service.ts` | `analysis.service.ts` |
| Repositories | `[domain].repository.ts` | `analysis.repository.ts` |
| Validators | `[domain].schema.ts` | `analysis.schema.ts` |
| Components | PascalCase `.tsx` | `AnalysisCard.tsx` |
| Types | `[domain].ts` | `analysis.ts` |
| Utils | camelCase `.ts` | `formatDate.ts` |

---

## Common Mistakes to Avoid

1. **Don't import `@prisma/client` outside `src/db/` or `src/lib/repositories/`**
2. **Don't return raw objects from API routes** — always use `ok()` / `fail()`
3. **Don't add business logic to components** — components are presentational
4. **Don't skip Zod validation** at API route entry points
5. **Don't use `console.log`** — use the Pino logger
6. **Don't hard-delete user data** — use `deletedAt` soft-delete pattern
7. **Don't create circular imports** — run `eslint import/no-cycle` before committing
