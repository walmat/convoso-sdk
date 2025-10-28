import type { HttpClient } from "../client/http-client.js";

/**
 * Base class for API resources
 */
export abstract class BaseResource {
  constructor(protected readonly client: HttpClient) {}

  /**
   * Get the base path for this resource
   */
  protected abstract get basePath(): string;

  /**
   * Normalize parameters by converting arrays to comma-separated strings
   *
   * Many Convoso API endpoints accept comma-separated values for filtering
   * by multiple IDs. This helper automatically converts arrays to the
   * required format.
   *
   * @param params - Request parameters that may contain arrays
   * @returns Normalized parameters with arrays converted to comma-separated strings
   *
   * @example
   * ```typescript
   * // Input
   * { campaign_id: [102, 104], user_id: 123 }
   *
   * // Output
   * { campaign_id: "102,104", user_id: 123 }
   * ```
   */
  protected normalizeParams<T extends Record<string, unknown>>(
    params: T,
  ): Record<string, string | number | boolean | undefined> {

    const normalized: Record<string, string | number | boolean | undefined> = {};
    for (const [key, value] of Object.entries(params)) {
      if (Array.isArray(value)) {
        normalized[key] = value.join(",");
      } else if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean" ||
        value === undefined
      ) {
        normalized[key] = value;
      }
      // Skip any other types
    }
    return normalized;
  }

  /**
   * Validate and clamp offset value to Convoso API limits
   *
   * @param offset - The offset value to validate
   * @param max - Maximum allowed offset (default: 50000)
   * @returns Clamped offset value between 0 and max
   *
   * @example
   * ```typescript
   * this.validateOffset(100); // Returns 100
   * this.validateOffset(-10); // Returns 0
   * this.validateOffset(60000); // Returns 50000
   * ```
   */
  protected validateOffset(offset?: number, max = 50000): number {
    if (offset === undefined || offset === null) return 0;
    return Math.max(0, Math.min(offset, max));
  }

  /**
   * Validate and clamp limit value to Convoso API limits
   *
   * @param limit - The limit value to validate
   * @param max - Maximum allowed limit (default: 1000)
   * @param defaultLimit - Default limit if not provided (default: 1000)
   * @returns Clamped limit value between 1 and max
   *
   * @example
   * ```typescript
   * this.validateLimit(100); // Returns 100
   * this.validateLimit(0); // Returns 1
   * this.validateLimit(2000); // Returns 1000
   * this.validateLimit(undefined); // Returns 1000 (default)
   * ```
   */
  protected validateLimit(
    limit?: number,
    max = 1000,
    defaultLimit = 1000,
  ): number {
    if (limit === undefined || limit === null) return defaultLimit;
    return Math.max(1, Math.min(limit, max));
  }

  /**
   * Apply pagination validation to parameters
   *
   * Automatically validates and normalizes offset and limit parameters
   * according to Convoso API constraints.
   *
   * @param params - Parameters that may contain offset and limit
   * @returns Parameters with validated offset and limit
   *
   * @example
   * ```typescript
   * // Input
   * { offset: -10, limit: 5000, other: "value" }
   *
   * // Output
   * { offset: 0, limit: 1000, other: "value" }
   * ```
   */
  protected applyPaginationValidation(
    params?: Record<string, unknown>,
  ): Record<string, unknown> {
    if (!params) return {};

    const validated = { ...params };

    if ("offset" in validated && typeof validated['offset'] === "number") {
      validated['offset'] = this.validateOffset(validated['offset']);
    }

    if ("limit" in validated && typeof validated['limit'] === "number") {
      validated['limit'] = this.validateLimit(validated['limit']);
    }

    return validated;
  }
}
