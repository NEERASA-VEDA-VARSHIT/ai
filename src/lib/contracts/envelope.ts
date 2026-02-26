import type { ApiError, ApiSuccess } from "@/types/api";

export function ok<T>(data: T, meta?: ApiSuccess<T>["meta"]): ApiSuccess<T> {
  return {
    success: true,
    data,
    meta: {
      ...meta,
      timestamp: new Date().toISOString(),
    },
  };
}

export function fail(
  code: string,
  message: string,
  details?: Record<string, unknown>,
): ApiError {
  return {
    success: false,
    error: { code, message, details },
  };
}
