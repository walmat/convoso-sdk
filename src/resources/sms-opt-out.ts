import type {
  SmsOptOutInsertParams,
  SmsOptOutInsertResponse,
  SmsOptOutSearchParams,
  SmsOptOutSearchResponse,
  SmsOptOutUpdateParams,
  SmsOptOutUpdateResponse,
} from "../types/sms-opt-out.js";
import { BaseResource } from "./base-resource.js";

/**
 * SMS Opt-Out API resource
 *
 * Manage SMS opt-out records for phone numbers. Add phone numbers to opt-out lists,
 * update existing records, and search for opt-out entries by campaign or phone number.
 *
 * @example
 * ```typescript
 * // Insert a phone number into SMS opt-out
 * const result = await client.smsOptOut.insert({
 *   phone_number: "8185551212",
 *   phone_code: "1",
 *   campaign_id: "0", // Global opt-out
 *   reason: "DNC",
 *   purpose: "TELEMKT",
 * });
 *
 * if (result.success) {
 *   console.log("Number added to SMS opt-out list");
 * }
 * ```
 */
export class SmsOptOutResource extends BaseResource {
  protected get basePath(): string {
    return "/sms-opt-out";
  }

  /**
   * Insert a new SMS opt-out record
   *
   * Add a phone number to the SMS opt-out list for a specific campaign or globally.
   * Use campaign_id "0" for global opt-out across all campaigns.
   *
   * @param params - SMS opt-out data including required phone_number, phone_code, and campaign_id
   * @returns Promise resolving to insert response
   *
   * @example
   * ```typescript
   * // Add to global SMS opt-out
   * const result = await client.smsOptOut.insert({
   *   phone_number: "8185551212",
   *   phone_code: "1",
   *   campaign_id: "0", // Global
   * });
   *
   * // Add with reason and purpose
   * const detailed = await client.smsOptOut.insert({
   *   phone_number: "5551234567",
   *   phone_code: "1",
   *   campaign_id: "64",
   *   reason: "ConsentRevoked",
   *   purpose: "TELEMKT",
   * });
   *
   * if (detailed.success) {
   *   console.log("Number successfully added to SMS opt-out list");
   * }
   * ```
   */
  async insert(params: SmsOptOutInsertParams): Promise<SmsOptOutInsertResponse> {
    const query = this.normalizeParams(params);
    return this.client.request({
      path: `${this.basePath}/insert`,
      query,
    });
  }

  /**
   * Update an SMS opt-out record
   *
   * Update an existing SMS opt-out record by ID. Can update phone number, campaign,
   * or reason/purpose. Use '-BLANK-' to set empty values.
   *
   * @param params - SMS opt-out update data including required id
   * @returns Promise resolving to update response with record id
   *
   * @example
   * ```typescript
   * // Update campaign assignment
   * const result = await client.smsOptOut.update({
   *   id: 12345,
   *   campaign_id: 64,
   * });
   *
   * // Update reason and purpose
   * const detailed = await client.smsOptOut.update({
   *   id: 12345,
   *   reason: "DNC",
   *   purpose: "NOTIFY",
   * });
   *
   * // Clear reason using reserved keyword
   * const cleared = await client.smsOptOut.update({
   *   id: 12345,
   *   reason: "-BLANK-",
   * });
   *
   * if (cleared.success) {
   *   console.log(`Updated record ID: ${cleared.data.id}`);
   * }
   * ```
   */
  async update(params: SmsOptOutUpdateParams): Promise<SmsOptOutUpdateResponse> {
    const query = this.normalizeParams(params);
    return this.client.request({
      path: `${this.basePath}/update`,
      query,
    });
  }

  /**
   * Search SMS opt-out records
   *
   * Search and retrieve SMS opt-out records with optional filtering by campaign,
   * phone number, reason, or purpose. Supports pagination with a maximum offset of 100000
   * and limit of 1000 records.
   *
   * @param params - Search filter parameters with pagination
   * @returns Promise resolving to paginated SMS opt-out search results
   *
   * @example
   * ```typescript
   * // Search all global opt-outs
   * const results = await client.smsOptOut.search({
   *   campaign_id: 0,
   *   limit: 100,
   * });
   *
   * // Search by phone number
   * const byPhone = await client.smsOptOut.search({
   *   phone_number: "8185551212",
   *   phone_code: "1",
   * });
   *
   * // Search with filters
   * const filtered = await client.smsOptOut.search({
   *   campaign_id: 64,
   *   Reason: "DNC",
   *   Purpose: "TELEMKT",
   *   limit: 50,
   * });
   *
   * // Get records with empty reason
   * const emptyReason = await client.smsOptOut.search({
   *   Reason: "-BLANK-",
   *   limit: 100,
   * });
   *
   * if (filtered.success && filtered.data) {
   *   console.log(`Found ${filtered.data.total} SMS opt-out records`);
   *   filtered.data.entries.forEach(record => {
   *     console.log(`${record.phone_number} - ${record.reason} - ${record.Purpose}`);
   *   });
   * }
   * ```
   */
  async search(params?: SmsOptOutSearchParams): Promise<SmsOptOutSearchResponse> {
    const validated = this.applyPaginationValidation(params, {
      offsetMax: 100000,
    });

    const query = this.normalizeParams(validated);
    return this.client.request({
      path: `${this.basePath}/search`,
      query,
    });
  }
}
