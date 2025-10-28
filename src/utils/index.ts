/**
 * Build a URL with query parameters
 */
export function buildUrl(
  baseUrl: string,
  apiKey: string,
  path: string,
  query?: Record<string, string | number | boolean | undefined>,
): string {
  // Remove trailing slash from baseUrl and leading slash from path
  const normalizedBase = baseUrl.replace(/\/$/, "");
  const normalizedPath = path.replace(/^\//, "");

  // Construct the full URL
  const fullUrl = `${normalizedBase}/${normalizedPath}`;
  const url = new URL(fullUrl);

  url.searchParams.append("auth_token", apiKey);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    }
  }

  return url.toString();
}

/**
 * Sleep for a specified number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Calculate exponential backoff delay
 */
export function calculateBackoff(attempt: number, baseDelay = 1000): number {
  return Math.min(baseDelay * 2 ** attempt, 30000);
}

/**
 * Check if an error is retryable
 */
export function isRetryableError(statusCode?: number): boolean {
  if (!statusCode) return false;
  return statusCode === 429 || statusCode >= 500;
}
