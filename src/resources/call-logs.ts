import type {
  CallLogsSearchParams,
  CallLogsSearchResponse,
  CallLogsUpdateParams,
  CallLogsUpdateResponse,
} from "../types/call-logs.js";
import { BaseResource } from "./base-resource.js";

/**
 * Call Logs API resource
 *
 * Provides methods to retrieve and search call logs.
 *
 * @example
 * ```typescript
 * // Search for calls in a specific campaign
 * const calls = await client.callLogs.search({
 *   campaign_id: "3475",
 *   start_time: "2025-10-27 00:00:00",
 *   end_time: "2025-10-27 23:59:59",
 *   limit: 100
 * });
 *
 * // Get specific call log
 * const call = await client.callLogs.get("2073617");
 * ```
 */
export class CallLogsResource extends BaseResource {
  protected get basePath(): string {
    return "/log";
  }

  /**
   * Search call logs
   *
   * Retrieve call log records with optional filters for campaign, date range,
   * status, call type, and more.
   *
   * @param params - Search filter parameters (all optional)
   * @returns Promise resolving to call logs search results
   *
   * @example
   * ```typescript
   * // Get all calls for today
   * const todayCalls = await client.callLogs.search();
   *
   * // Search by campaign and date range
   * const campaignCalls = await client.callLogs.search({
   *   campaign_id: "3475",
   *   start_time: "2025-10-27 00:00:00",
   *   end_time: "2025-10-27 23:59:59"
   * });
   *
   * // Search by call type and status
   * const outboundCalls = await client.callLogs.search({
   *   call_type: "OUTBOUND",
   *   status: "AA"
   * });
   *
   * // Search with pagination
   * const paginatedCalls = await client.callLogs.search({
   *   limit: 100,
   *   offset: 0,
   *   order: "DESC"
   * });
   *
   * // Search by phone number
   * const phoneCalls = await client.callLogs.search({
   *   phone_number: "6159445881"
   * });
   *
   * // Search by lead
   * const leadCalls = await client.callLogs.search({
   *   lead_id: "408159"
   * });
   * ```
   */
  async search(params?: CallLogsSearchParams): Promise<CallLogsSearchResponse> {
    const query = this.normalizeParams(params ?? {});
    return this.client.request({
      path: `${this.basePath}/retrieve`,
      query,
    });
  }

  /**
   * Get call log details
   *
   * Retrieve detailed information for a specific call log by ID.
   *
   * @param callId - The call log ID
   * @returns Promise resolving to call log details
   *
   * @example
   * ```typescript
   * // Get specific call log
   * const call = await client.callLogs.get("2073617");
   * ```
   */
  async update(params: CallLogsUpdateParams): Promise<CallLogsUpdateResponse> {
    const query = this.normalizeParams(params);
    return this.client.request({
      path: `${this.basePath}/update`,
      query,
    });
  }
}
