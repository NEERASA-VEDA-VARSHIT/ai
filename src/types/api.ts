// API envelope pattern — ALL API responses must use this shape
// No raw objects returned from API routes

export type ApiSuccess<T> = {
  success: true;
  data: T;
  meta?: {
    page?: number;
    total?: number;
    timestamp: string;
  };
};

export type ApiError = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
