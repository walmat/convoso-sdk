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
 * API Error response structure
 */
export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
  details?: unknown;
}

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: ApiError;
}

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
