import type { LeadPostInsertParams, LeadPostInsertResponse } from "../types/lead-post.js";
import { BaseResource } from "./base-resource.js";

/**
 * Lead Post Validation API resource
 *
 * Post leads to campaigns with comprehensive lead data including contact information,
 * address details, and custom fields. Validates and inserts leads into the system.
 *
 * @example
 * ```typescript
 * // Insert a new lead
 * const result = await client.leadPost.insert({
 *   criteria_key: "12345",
 *   phone_number: "5551234567",
 *   phone_code: "1",
 *   first_name: "John",
 *   last_name: "Doe",
 *   email: "john@example.com",
 *   state: "CA",
 * });
 *
 * if (result.success) {
 *   console.log(`Lead created with ID: ${result.data.lead_id}`);
 * }
 * ```
 */
export class LeadPostResource extends BaseResource {
  protected get basePath(): string {
    return "/lead-post-validation";
  }

  /**
   * Insert a new lead
   *
   * Validates and inserts a new lead with contact information, address, and custom fields.
   * The criteria_key identifies which campaign criteria to apply.
   *
   * @param params - Lead data including required criteria_key and phone_number
   * @returns Promise resolving to insert response with lead_id
   *
   * @example
   * ```typescript
   * // Minimal required fields
   * const result = await client.leadPost.insert({
   *   criteria_key: "12345",
   *   phone_number: "5551234567",
   * });
   *
   * // With optional fields
   * const detailed = await client.leadPost.insert({
   *   criteria_key: "12345",
   *   phone_number: "5551234567",
   *   phone_code: "1",
   *   first_name: "Jane",
   *   last_name: "Smith",
   *   email: "jane@example.com",
   *   address1: "123 Main St",
   *   city: "San Francisco",
   *   state: "CA",
   *   postal_code: "94102",
   *   date_of_birth: "1990-05-15",
   *   notes: "Preferred contact time: evenings",
   * });
   *
   * if (detailed.success) {
   *   console.log(`Lead ID: ${detailed.data.lead_id}`);
   * }
   * ```
   */
  async insert(params: LeadPostInsertParams): Promise<LeadPostInsertResponse> {
    const query = this.normalizeParams(params);
    return this.client.request({
      path: `${this.basePath}/insert`,
      query,
    });
  }
}
