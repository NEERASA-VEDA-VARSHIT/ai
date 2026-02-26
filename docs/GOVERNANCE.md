# ArchAI Governance Rules

This document defines the non-negotiable engineering standards for the ArchAI codebase.
All contributors must adhere to these rules. PRs that violate these rules will be rejected.

---

## 1. IMPORT BOUNDARY ENFORCEMENT

### Rule: Strict Layered Architecture

```
API Routes → Services → Repositories → Database
                ↓
             Domain (pure functions only)
```

| ✅ Allowed | ❌ Forbidden |
|---|---|
| `lib/services/` importing `lib/repositories/` | `lib/services/` importing `db/client` |
| `lib/repositories/` importing `db/client` | `app/api/` importing `db/client` |
| `lib/domain/` importing `types/` | `lib/domain/` importing anything with I/O |
| `components/features/` importing `components/ui/` | `components/ui/` containing business logic |

**Enforced by:** `eslint no-restricted-imports` + `import/no-cycle`

---

## 2. API CONTRACT POLICY

### Rule: All API responses MUST use the envelope pattern

```typescript
// ✅ Correct
return NextResponse.json(ok(data), { status: 200 });
return NextResponse.json(fail(ERROR_CODES.UNAUTHORIZED, "Auth required"), { status: 401 });

// ❌ Forbidden
return NextResponse.json({ user: data }, { status: 200 });
return NextResponse.json({ error: "bad" }, { status: 400 });
```

### Rule: All API inputs MUST be validated with Zod

```typescript
// ✅ Correct
const parsed = mySchema.safeParse(body);
if (!parsed.success) return fail(...)

// ❌ Forbidden
const { name } = body as { name: string }; // No validation
```

---

## 3. DATABASE POLICY

### Rule: Prisma client ONLY instantiated in `src/db/client.ts`
### Rule: `@prisma/client` ONLY imported in `src/lib/repositories/` and `src/db/`
### Rule: Soft deletes for all user data (no hard deletes)

```typescript
// ✅ Correct soft delete
await db.analysis.update({ where: { id }, data: { deletedAt: new Date() } });

// ❌ Forbidden hard delete on user data
await db.analysis.delete({ where: { id } });
```

### Rule: All schema changes via `prisma migrate dev` — never direct DB edits

---

## 4. TYPE SAFETY POLICY

### Rule: TypeScript strict mode — no `any` types
### Rule: No type assertions (`as Type`) without explicit comment explaining why

```typescript
// ✅ Acceptable with comment
const result = row.result as unknown as AnalysisResult; // Prisma Json → typed domain object

// ❌ Forbidden
const data = response as any;
```

### Rule: Consistent type imports (`import type { Foo }`)

---

## 5. RBAC ENFORCEMENT

### Rule: Role checks MUST occur in middleware or service layer — never trust client claims

```typescript
// ✅ Correct — server-side role check
const session = await getServerSession(authOptions);
assertPermission(session.user.role, "analysis", "create");

// ❌ Forbidden — client-provided role
const { role } = req.body; // Never trust this
```

---

## 6. LOGGING POLICY

### Rule: Use structured Pino logger — no `console.log` in application code

```typescript
// ✅ Correct
logger.info({ userId, action: "create_analysis" }, "Analysis started");

// ❌ Forbidden
console.log("Analysis started for user:", userId);
```

### Rule: Never log sensitive data

```typescript
// ❌ Forbidden — PII in logs
logger.info({ password, token, email }); // redact handles some, but don't include intentionally
```

---

## 7. CODE REVIEW CHECKLIST

Before any PR is merged, verify:

- [ ] No direct Prisma/DB import outside `src/db/` or `src/lib/repositories/`
- [ ] Zod validation present at every API route entry point
- [ ] All API responses use `ok()` or `fail()` envelope
- [ ] No circular imports (`eslint import/no-cycle` must pass)
- [ ] TypeScript strict mode — zero `any` types
- [ ] New logic checked against existing utils (no duplication)
- [ ] Soft delete used where applicable — no hard deletes on user data
- [ ] All new environment variables documented in `.env.example`
- [ ] Migrations committed to version control
- [ ] Logger used instead of `console.log`
