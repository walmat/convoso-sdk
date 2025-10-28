import type {
  CallbackDeleteParams,
  CallbackDeleteResponse,
  CallbackInsertParams,
  CallbackInsertResponse,
  CallbackSearchParams,
  CallbackSearchResponse,
  CallbackUpdateParams,
  CallbackUpdateResponse,
} from "../types/callbacks.js";
import { BaseResource } from "./base-resource.js";

/**
 * Callbacks API resource
 *
 * Manage callback scheduling for leads.
 *
 * @example
 * ```typescript
 * // Insert a new callback
 * const result = await client.callbacks.insert({
 *   lead_id: "123456",
 *   recipient: "Personal",
 *   callback_time_zone: "America/New_York",
 *   callback_time: "2025-11-01 14:00:00",
 *   comments: "Follow up on quote",
 * });
 *
 * // Search callbacks
 * const callbacks = await client.callbacks.search({
 *   stage: "PENDING",
 *   limit: 100,
 * });
 * ```
 */
export class CallbacksResource extends BaseResource {
  protected get basePath(): string {
    return "/callbacks";
  }

  /**
   * Insert a new callback
   *
   * Creates a callback for a lead with specified scheduling details.
   *
   * @param params - Callback creation parameters
   * @returns Promise resolving to callback creation response with callback_id
   *
   * @example
   * ```typescript
   * const result = await client.callbacks.insert({
   *   lead_id: "546006",
   *   recipient: "System",
   *   callback_time_zone: "America/Los_Angeles",
   *   callback_time: "2025-11-01 08:00:00",
   *   user_id: "1275043",
   *   comments: "callback to enroll into a plan for 1/1",
   * });
   * console.log(result.data?.callback_id); // "657"
   * ```
   */
  async insert(params: CallbackInsertParams): Promise<CallbackInsertResponse> {
    const query = this.normalizeParams(params);
    return this.client.request({
      path: `${this.basePath}/insert`,
      query,
    });
  }

  /**
   * Update an existing callback
   *
   * Modifies callback details such as time, recipient, or status.
   * Use status: "Dismissed" to dismiss a callback.
   *
   * @param params - Callback update parameters
   * @returns Promise resolving to callback update response with callback_id
   *
   * @example
   * ```typescript
   * // Update callback time
   * await client.callbacks.update({
   *   callback_id: "768389",
   *   callback_time: "2025-11-02 10:00:00",
   *   comments: "Rescheduled to next week",
   * });
   *
   * // Dismiss a callback
   * await client.callbacks.update({
   *   callback_id: "768389",
   *   status: "Dismissed",
   * });
   * ```
   */
  async update(params: CallbackUpdateParams): Promise<CallbackUpdateResponse> {
    const query = this.normalizeParams(params);
    return this.client.request({
      path: `${this.basePath}/update`,
      query,
    });
  }

  /**
   * Delete a callback
   *
   * Permanently removes a callback from the system.
   *
   * @param params - Callback deletion parameters containing callback_id
   * @returns Promise resolving to deletion success response
   *
   * @example
   * ```typescript
   * await client.callbacks.delete({
   *   callback_id: "768389",
   * });
   * ```
   */
  async delete(params: CallbackDeleteParams): Promise<CallbackDeleteResponse> {
    const query = this.normalizeParams(params);
    return this.client.request({
      path: `${this.basePath}/delete`,
      query,
    });
  }

  /**
   * Search callbacks
   *
   * Retrieves callbacks with optional filtering by campaign, lead, user, stage, and date range.
   * Supports pagination with offset and limit parameters.
   *
   * Note: Search has different pagination limits than other endpoints:
   * - Default limit: 20
   * - Maximum limit: 5000
   * - Maximum offset: 50000
   *
   * @param params - Search parameters and filters
   * @returns Promise resolving to paginated callback search results
   *
   * @example
   * ```typescript
   * // Search pending callbacks for a campaign
   * const result = await client.callbacks.search({
   *   campaign_id: "3475",
   *   stage: "PENDING",
   *   limit: 50,
   *   offset: 0,
   * });
   *
   * // Search callbacks by date range
   * const callbacks = await client.callbacks.search({
   *   start_date: "2025-10-01",
   *   end_date: "2025-10-31",
   *   user_id: "1275043",
   * });
   *
   * console.log(result.data?.total); // Total callbacks matching criteria
   * console.log(result.data?.results); // Array of callback records
   * ```
   */
  async search(params?: CallbackSearchParams): Promise<CallbackSearchResponse> {
    const validated = this.applyPaginationValidation(params, {
      limitMax: 5000,
      limitDefault: 20,
    });

    const query = this.normalizeParams(validated);
    return this.client.request({
      path: `${this.basePath}/search`,
      query,
    });
  }
}
