import type { RevenueUpdateParams, RevenueUpdateResponse } from "../types/revenue.js";
import { BaseResource } from "./base-resource.js";

/**
 * Revenue API resource
 *
 * Manage revenue and return data for call logs. Update revenue amounts
 * and track returns associated with specific calls.
 *
 * @example
 * ```typescript
 * // Update revenue for a call log
 * const result = await client.revenue.update({
 *   call_log_id: "100125",
 *   revenue: 149.99,
 * });
 *
 * if (result.success) {
 *   console.log(`Updated call log: ${result.data.call_log_id}`);
 * }
 * ```
 */
export class RevenueResource extends BaseResource {
  protected get basePath(): string {
    return "/revenue";
  }

  /**
   * Update revenue
   *
   * Update revenue or return information for a specific call log.
   * At least one of revenue or return must be provided.
   *
   * @param params - Revenue update data including required call_log_id
   * @returns Promise resolving to update response with call_log_id
   *
   * @example
   * ```typescript
   * // Update revenue amount
   * const result = await client.revenue.update({
   *   call_log_id: "100125",
   *   revenue: 199.99,
   * });
   *
   * // Mark as return
   * const returnResult = await client.revenue.update({
   *   call_log_id: "100125",
   *   return: 1,
   * });
   *
   * // Update both revenue and return
   * const combined = await client.revenue.update({
   *   call_log_id: "100125",
   *   revenue: 199.99,
   *   return: 0,
   * });
   *
   * if (combined.success) {
   *   console.log(`Updated call log: ${combined.data.call_log_id}`);
   * }
   * ```
   */
  async update(params: RevenueUpdateParams): Promise<RevenueUpdateResponse> {
    const query = this.normalizeParams(params);
    return this.client.request({
      path: `${this.basePath}/update`,
      query,
    });
  }
}
