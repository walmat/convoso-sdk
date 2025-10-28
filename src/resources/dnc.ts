import type {
  DncDeleteParams,
  DncDeleteResponse,
  DncInsertParams,
  DncInsertResponse,
  DncSearchParams,
  DncSearchResponse,
  DncUpdateParams,
  DncUpdateResponse,
} from "../types/dnc.js";
import { BaseResource } from "./base-resource.js";

/**
 * DNC (Do Not Call) API resource
 *
 * Manage Do Not Call lists at global or campaign-specific levels.
 *
 * @example
 * ```typescript
 * // Add number to global DNC
 * await client.dnc.insert({
 *   phone_number: "5551234567",
 *   phone_code: "1",
 *   campaign_id: "0", // 0 = Global
 *   reason: "Customer request",
 * });
 *
 * // Search DNC entries
 * const results = await client.dnc.search({
 *   campaign_id: 0,
 *   limit: 100,
 * });
 * ```
 */
export class DncResource extends BaseResource {
  protected get basePath(): string {
    return "/dnc";
  }

  /**
   * Insert number to DNC list
   *
   * Add a phone number to the Do Not Call list, either globally or for a specific campaign.
   * Use campaign_id "0" for global DNC.
   *
   * @param params - DNC insert parameters
   * @returns Promise resolving to insert response
   *
   * @example
   * ```typescript
   * // Add to global DNC
   * const result = await client.dnc.insert({
   *   phone_number: "5551234567",
   *   phone_code: "1",
   *   campaign_id: "0", // Global
   *   reason: "Customer request",
   *   purpose: "Do not contact",
   * });
   *
   * // Add to campaign-specific DNC
   * await client.dnc.insert({
   *   phone_number: "5559876543",
   *   phone_code: "1",
   *   campaign_id: "3471",
   * });
   * ```
   */
  async insert(params: DncInsertParams): Promise<DncInsertResponse> {
    const query = this.normalizeParams(params);
    return this.client.request({
      path: `${this.basePath}/insert`,
      query,
    });
  }

  /**
   * Update DNC record
   *
   * Update an existing DNC record by ID. You can update phone number, campaign,
   * and reason/purpose fields.
   *
   * Special keywords:
   * - Use '-BLANK-' for reason or purpose to set them as empty
   *
   * @param params - DNC update parameters
   * @returns Promise resolving to update response with record ID
   *
   * @example
   * ```typescript
   * // Update reason and purpose
   * const result = await client.dnc.update({
   *   id: 12671,
   *   reason: "Updated reason",
   *   purpose: "Updated purpose",
   * });
   * console.log(result.id); // Updated record ID
   *
   * // Clear reason using special keyword
   * await client.dnc.update({
   *   id: 12671,
   *   reason: "-BLANK-",
   * });
   * ```
   */
  async update(params: DncUpdateParams): Promise<DncUpdateResponse> {
    const query = this.normalizeParams(params);
    return this.client.request({
      path: `${this.basePath}/update`,
      query,
    });
  }

  /**
   * Delete number from DNC list
   *
   * Remove a phone number from the DNC list for a specific campaign or global.
   * Optionally update the lead status when removing from DNC.
   *
   * @param params - DNC delete parameters
   * @returns Promise resolving to delete response
   *
   * @example
   * ```typescript
   * // Remove from global DNC
   * await client.dnc.delete({
   *   phone_number: "5551234567",
   *   phone_code: "1",
   *   campaign_id: "0",
   * });
   *
   * // Remove and update lead status
   * await client.dnc.delete({
   *   phone_number: "5559876543",
   *   phone_code: "1",
   *   campaign_id: "3471",
   *   update_lead_status: "true",
   *   lead_status: "active",
   * });
   * ```
   */
  async delete(params: DncDeleteParams): Promise<DncDeleteResponse> {
    const query = this.normalizeParams(params);
    return this.client.request({
      path: `${this.basePath}/delete`,
      query,
    });
  }

  /**
   * Search DNC list
   *
   * Search and retrieve DNC records with optional filtering by campaign, phone number,
   * reason, purpose, and more. Supports pagination.
   *
   * Note: DNC search has custom pagination limits:
   * - Maximum offset: 100000 (higher than standard 50000)
   * - Maximum limit: 1000
   * - Default limit: 1000
   *
   * Special keywords for reason/purpose:
   * - Use '-BLANK-' to find records with empty values
   * - Use '-NOTBLANK-' to find records with non-empty values
   *
   * @param params - Search filter parameters
   * @returns Promise resolving to paginated DNC search results
   *
   * @example
   * ```typescript
   * // Search global DNC
   * const global = await client.dnc.search({
   *   campaign_id: 0,
   *   limit: 100,
   * });
   *
   * // Search by phone number
   * const byPhone = await client.dnc.search({
   *   phone_number: "5551234567",
   *   phone_code: "1",
   * });
   *
   * // Find entries with empty reason
   * const noReason = await client.dnc.search({
   *   reason: "-BLANK-",
   * });
   *
   * // Find entries with any purpose set
   * const hasPurpose = await client.dnc.search({
   *   purpose: "-NOTBLANK-",
   * });
   * ```
   */
  async search(params?: DncSearchParams): Promise<DncSearchResponse> {
    const validated = this.applyPaginationValidation(params, {
      offsetMax: 100000, // DNC allows higher offset
      limitMax: 1000,
      limitDefault: 1000,
    });

    const query = this.normalizeParams(validated);
    return this.client.request({
      path: `${this.basePath}/search`,
      query,
    });
  }

  /**
   * Add number to DNC list (legacy)
   * @deprecated Use insert() instead
   */
  async add(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/add`,
      body: params,
    });
  }

  /**
   * Remove number from DNC list (legacy)
   * @deprecated Use delete() instead
   */
  async remove(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/remove`,
      body: params,
    });
  }
}
