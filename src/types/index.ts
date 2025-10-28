/**
 * Configuration options for the Convoso SDK client
 */
export interface ConvosoClientConfig {
  /**
   * API key for authentication
   */
  apiKey: string;

  /**
   * Base URL for the Convoso API
   * @default "https://api.convoso.com/v1"
   */
  baseUrl?: string;

  /**
   * Request timeout in milliseconds
   * @default 30000
   */
  timeout?: number;

  /**
   * Maximum number of retry attempts for failed requests
   * @default 3
   */
  maxRetries?: number;

  /**
   * Custom headers to include in all requests
   */
  headers?: Record<string, string>;
}

/**
 * Custom error class for API errors
 */
export class ConvosoApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly code?: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ConvosoApiError";
  }
}

/**
 * Convoso error definition
 *
 * Defines a specific error code and its associated message
 */
export interface ConvosoErrorDef {
  /** Numeric error code */
  code: number;
  /** Error message text */
  text: string;
}

/**
 * Global authentication/authorization error
 *
 * This error can occur on any endpoint when the API key is not
 * allowed to access the resource.
 */
export type ConvosoGlobalError = { code: 403; text: "Forbidden" };

/**
 * Generic Convoso API error response
 *
 * This is the base error structure returned by the Convoso API
 * when an operation fails. Creates a discriminated union where each
 * error definition becomes its own union member, preserving the
 * relationship between code and text.
 *
 * When you narrow by checking the `code` field, TypeScript will
 * automatically infer the exact `text` value that corresponds to it.
 *
 * All error responses automatically include the 403 Forbidden error,
 * which can occur when the API key lacks permission for the resource.
 *
 * @template TError - Union of ConvosoErrorDef objects for this endpoint
 *
 * @example
 * ```typescript
 * // Define endpoint-specific errors
 * type MyErrors =
 *   | { code: 6001; text: "Invalid input" }
 *   | { code: 6002; text: "Not found" };
 *
 * // Create response type
 * type MyErrorResponse = ConvosoErrorResponse<MyErrors>;
 *
 * // TypeScript narrows based on code (includes 403 automatically)
 * const handleError = (error: MyErrorResponse) => {
 *   if (error.code === 403) {
 *     error.text; // TypeScript knows this is exactly "Forbidden"
 *   } else if (error.code === 6001) {
 *     error.text; // TypeScript knows this is exactly "Invalid input"
 *   } else {
 *     error.text; // TypeScript knows this is exactly "Not found"
 *   }
 * };
 * ```
 */
export type ConvosoErrorResponse<TError extends ConvosoErrorDef = ConvosoErrorDef> = (
  | TError
  | ConvosoGlobalError
) & {
  /** Success status - always false for errors */
  success: false;
};

/**
 * Request options for API calls
 */
export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
}
