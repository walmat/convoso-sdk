import type {
  LeadValidationSearchParams,
  LeadValidationSearchResponse,
} from "../types/lead-validation.js";
import { BaseResource } from "./base-resource.js";

/**
 * Lead Validation API resource
 *
 * Validate prospective leads before posting them to campaigns.
 * Check if a lead meets criteria requirements based on phone number,
 * state, and postal code.
 *
 * @example
 * ```typescript
 * // Validate a lead
 * const result = await client.leadValidation.search({
 *   criteria_key: "12345",
 *   phone_number: "5551234567",
 *   state: "CA",
 *   postal_code: "94102",
 * });
 *
 * if (result.success) {
 *   console.log(`Validation result: ${result.result}`); // "Accepted"
 * }
 * ```
 */
export class LeadValidationResource extends BaseResource {
  protected get basePath(): string {
    return "/lead-validation";
  }

  /**
   * Search/validate a lead
   *
   * Validate whether a prospective lead meets campaign criteria requirements.
   * Returns validation result indicating if the lead is accepted.
   *
   * @param params - Lead validation parameters including criteria_key and phone_number
   * @returns Promise resolving to validation response with result
   *
   * @example
   * ```typescript
   * // Minimal required fields
   * const result = await client.leadValidation.search({
   *   criteria_key: "12345",
   *   phone_number: "5551234567",
   * });
   *
   * // With optional location details
   * const detailed = await client.leadValidation.search({
   *   criteria_key: "12345",
   *   phone_number: "5551234567",
   *   state: "CA",
   *   postal_code: "94102",
   * });
   *
   * if (detailed.success) {
   *   console.log(`Validation result: ${detailed.result}`);
   * }
   * ```
   */
  async search(params: LeadValidationSearchParams): Promise<LeadValidationSearchResponse> {
    const query = this.normalizeParams(params);
    return this.client.request({
      path: `${this.basePath}/search`,
      query,
    });
  }
}
