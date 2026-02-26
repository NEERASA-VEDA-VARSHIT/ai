// THIS FILE IS THE ONLY PRISMA CLIENT INSTANTIATION IN THE CODEBASE
// Do not import PrismaClient anywhere else. Import { db } from "@/db/client"
// and only within src/lib/repositories/

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env["NODE_ENV"] === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env["NODE_ENV"] !== "production") {
  globalForPrisma.prisma = db;
}
