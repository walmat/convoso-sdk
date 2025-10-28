import { ConvosoApiError, type ConvosoClientConfig, type RequestOptions } from "../types/index.js";
import { buildUrl, calculateBackoff, isRetryableError, sleep } from "../utils/index.js";

const DEFAULT_BASE_URL = "https://api.convoso.com/v1/";

/**
 * HTTP Client for making API requests with retry logic
 */
export class HttpClient {
  private readonly config: Required<Omit<ConvosoClientConfig, "headers">> & {
    headers?: Record<string, string>;
  };

  constructor(config: ConvosoClientConfig) {
    this.config = {
      apiKey: config.apiKey,
      baseUrl: config.baseUrl ?? DEFAULT_BASE_URL,
      timeout: config.timeout ?? 30000,
      maxRetries: config.maxRetries ?? 3,
      headers: config.headers ?? {},
    };
  }

  /**
   * Make an API request with automatic retries
   */
  async request<T>(options: RequestOptions): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        return await this.executeRequest<T>(options);
      } catch (error) {
        lastError = error as Error;

        // Don't retry if not retryable or if we've exhausted attempts
        if (
          !(error instanceof ConvosoApiError) ||
          !isRetryableError(error.statusCode) ||
          attempt === this.config.maxRetries
        ) {
          throw error;
        }

        // Wait before retrying
        const delay = calculateBackoff(attempt);
        await sleep(delay);
      }
    }

    throw lastError;
  }

  private async executeRequest<T>(options: RequestOptions): Promise<T> {
    const url = buildUrl(this.config.baseUrl, this.config.apiKey, options.path, options.query);

    const headers = new Headers({
      "Content-Type": "application/json",
      ...this.config.headers,
      ...options.headers,
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        method: options.method ?? "GET",
        headers,
        ...(options.body ? { body: JSON.stringify(options.body) } : {}),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle non-OK responses
      if (!response.ok) {
        await this.handleErrorResponse(response);
      }

      // Handle empty responses
      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        return undefined as T;
      }

      return (await response.json()) as T;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof ConvosoApiError) {
        throw error;
      }

      // Handle network errors
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new ConvosoApiError("Request timeout", undefined, "TIMEOUT");
        }
        throw new ConvosoApiError(error.message, undefined, "NETWORK_ERROR");
      }

      throw error;
    }
  }

  /**
   * Handle error responses from the API
   */
  private async handleErrorResponse(response: Response): Promise<never> {
    let errorData: ConvosoApiError | undefined;

    try {
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        errorData = (await response.json()) as ConvosoApiError;
      }
    } catch {
      // Ignore JSON parsing errors
    }

    throw new ConvosoApiError(
      errorData?.message ?? response.statusText,
      response.status,
      errorData?.code,
      errorData?.details,
    );
  }
}
