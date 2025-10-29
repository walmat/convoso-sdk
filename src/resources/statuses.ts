import type {
  StatusesInsertParams,
  StatusesInsertResponse,
  StatusesSearchParams,
  StatusesSearchResponse,
  StatusesUpdateParams,
  StatusesUpdateResponse,
} from "../types/statuses.js";
import { normalizeHexColor } from "../utils/hex-color.js";
import { BaseResource } from "./base-resource.js";

/**
 * Statuses API resource
 *
 * Manage custom lead statuses including creating, updating, and searching statuses.
 * Statuses control lead disposition with various flags like final, reached, success, etc.
 *
 * @example
 * ```typescript
 * // Create a new custom status
 * const result = await client.statuses.insert({
 *   status: "QUALI",
 *   name: "Qualified Lead",
 *   final: "N",
 *   reached: "Y",
 *   success: "Y",
 *   dnc: "N",
 *   callback: "N",
 *   contact: "Y",
 *   voicemail: "N",
 *   hex_color: "6711d1",
 * });
 *
 * if (result.success) {
 *   console.log(`Created status: ${result.data.status}`);
 * }
 * ```
 */
export class StatusesResource extends BaseResource {
  protected get basePath(): string {
    return "/statuses";
  }

  /**
   * Insert a new status
   *
   * Create a new custom status with various disposition flags. Status abbreviation
   * must be 2-6 alphanumeric characters. Hex color should not include the # symbol.
   *
   * @param params - Status data including required fields
   * @returns Promise resolving to insert response with status abbreviation
   *
   * @example
   * ```typescript
   * // Create a basic status
   * const result = await client.statuses.insert({
   *   status: "QUALI",
   *   name: "Qualified Lead",
   *   final: "N",
   *   reached: "Y",
   *   success: "Y",
   *   dnc: "N",
   *   callback: "N",
   *   contact: "Y",
   *   voicemail: "N",
   * });
   *
   * // Create with hex color (# will be automatically stripped)
   * const withColor = await client.statuses.insert({
   *   status: "HOT",
   *   name: "Hot Lead",
   *   hex_color: "#ff0000", // Automatically converted to "ff0000"
   *   final: "N",
   *   reached: "Y",
   *   success: "Y",
   *   dnc: "N",
   *   callback: "Y",
   *   contact: "Y",
   *   voicemail: "N",
   * });
   *
   * if (withColor.success) {
   *   console.log(`Created status ${withColor.data.status}, new: ${withColor.data.new}`);
   * }
   * ```
   */
  async insert(params: StatusesInsertParams): Promise<StatusesInsertResponse> {
    const normalizedParams = {
      ...params,
      hex_color: normalizeHexColor(params.hex_color),
    };

    const query = this.normalizeParams(normalizedParams);
    return this.client.request({
      path: `${this.basePath}/insert`,
      query,
    });
  }

  /**
   * Update a status
   *
   * Update an existing custom status. Only custom statuses can be modified, not
   * system statuses. All fields are optional except the status abbreviation.
   *
   * @param params - Status update data including required status abbreviation
   * @returns Promise resolving to update response with status abbreviation
   *
   * @example
   * ```typescript
   * // Update status name
   * const result = await client.statuses.update({
   *   status: "QUALI",
   *   name: "Super Qualified Lead",
   * });
   *
   * // Update multiple flags
   * const updated = await client.statuses.update({
   *   status: "HOT",
   *   final: "Y",
   *   success: "Y",
   *   hex_color: "00ff00",
   * });
   *
   * // Update color (# will be automatically stripped)
   * const colorUpdate = await client.statuses.update({
   *   status: "QUALI",
   *   hex_color: "#6711d1", // Automatically converted to "6711d1"
   * });
   *
   * if (updated.success) {
   *   console.log(`Updated status: ${updated.data.status}`);
   * }
   * ```
   */
  async update(params: StatusesUpdateParams): Promise<StatusesUpdateResponse> {
    const normalizedParams = {
      ...params,
      hex_color: normalizeHexColor(params.hex_color),
    };

    const query = this.normalizeParams(normalizedParams);
    return this.client.request({
      path: `${this.basePath}/update`,
      query,
    });
  }

  /**
   * Search statuses
   *
   * Search for statuses by abbreviation or description. Returns all matching
   * statuses including both system and custom statuses.
   *
   * @param params - Search parameters with required query string
   * @returns Promise resolving to array of matching statuses
   *
   * @example
   * ```typescript
   * // Search by abbreviation
   * const results = await client.statuses.search({
   *   query: "QUALI",
   * });
   *
   * // Search by partial name
   * const byName = await client.statuses.search({
   *   query: "Lead",
   * });
   *
   * if (byName.success) {
   *   byName.data.forEach(status => {
   *     console.log(`${status.status} - ${status.name}`);
   *     console.log(`  Custom: ${status.custom_status}`);
   *     console.log(`  Final: ${status.final}, Success: ${status.success}`);
   *   });
   * }
   * ```
   */
  async search(params: StatusesSearchParams): Promise<StatusesSearchResponse> {
    const query = this.normalizeParams(params);
    return this.client.request({
      path: `${this.basePath}/search`,
      query,
    });
  }
}
