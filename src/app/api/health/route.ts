import { NextResponse } from "next/server";

import { db } from "@/db/client";
import { fail, ok } from "@/lib/contracts/envelope";
import { ERROR_CODES } from "@/lib/contracts/errors";

export async function GET(): Promise<NextResponse> {
  try {
    await db.$queryRaw`SELECT 1`;
    return NextResponse.json(ok({ status: "ok", db: "connected" }));
  } catch {
    return NextResponse.json(
      fail(ERROR_CODES.INTERNAL_ERROR, "Database unreachable"),
      { status: 503 },
    );
  }
}
