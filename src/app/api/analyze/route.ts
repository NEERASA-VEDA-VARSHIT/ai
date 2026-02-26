import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/config";
import { fail, ok } from "@/lib/contracts/envelope";
import { ERROR_CODES } from "@/lib/contracts/errors";
import { PrismaAnalysisRepository } from "@/lib/repositories/analysis.repository";
import { AnalysisService } from "@/lib/services/analysis.service";
import { logger } from "@/lib/utils/logger";
import { analysisInputSchema } from "@/lib/validators/analysis.schema";

export async function POST(request: Request): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      fail(ERROR_CODES.UNAUTHORIZED, "Authentication required"),
      { status: 401 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      fail(ERROR_CODES.VALIDATION_ERROR, "Invalid JSON body"),
      { status: 400 },
    );
  }

  const parsed = analysisInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      fail(ERROR_CODES.VALIDATION_ERROR, "Validation failed", {
        errors: parsed.error.flatten().fieldErrors,
      }),
      { status: 422 },
    );
  }

  try {
    const repository = new PrismaAnalysisRepository();
    const service = new AnalysisService(repository);
    const userId = (session.user as { id?: string }).id ?? "";

    const result = await service.runAnalysis(userId, parsed.data);

    return NextResponse.json(ok(result), { status: 200 });
  } catch (error) {
    logger.error({ error }, "Analysis failed");
    return NextResponse.json(
      fail(ERROR_CODES.ANALYSIS_FAILED, "Analysis could not be completed"),
      { status: 500 },
    );
  }
}
