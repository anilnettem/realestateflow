// client/src/lib/errors.ts

export interface ApiErrorData {
  message?: string;
  [key: string]: unknown;
}

export class ApiError extends Error {
  public readonly status?: number;
  public readonly data?: ApiErrorData;

  constructor(message: string, status?: number, data?: ApiErrorData) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { name?: string }).name === "ApiError"
  );
}
