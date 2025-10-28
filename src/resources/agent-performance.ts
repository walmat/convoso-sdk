import { BaseResource } from "./base-resource.js";
import type {
  AgentPerformanceSearchParams,
  AgentPerformanceSearchResponse,
} from "../types/agent-performance.js";

/**
 * Agent Performance API resource
 *
 * Provides methods to retrieve and analyze agent performance metrics
 * including call statistics, talk time, conversions, and revenue data.
 *
 * @example
 * ```typescript
 * // Get performance for date range
 * const performance = await client.agentPerformance.search({
 *   date_start: "2025-01-01",
 *   date_end: "2025-01-31",
 *   campaign_ids: [102, 104]
 * });
 *
 * // Get performance for specific agents
 * const agentStats = await client.agentPerformance.search({
 *   user_ids: [1002034, 1030483],
 *   date_start: "2025-01-01"
 * });
 * ```
 */
export class AgentPerformanceResource extends BaseResource {
  protected get basePath(): string {
    return "/agent-performance";
  }

  /**
   * Search agent performance data
   *
   * Retrieve agent performance records within a specified date range,
   * with optional filters for campaigns, lists, queues, users, and statuses.
   *
   * @param params - Search filter parameters
   * @returns Promise resolving to agent performance data
   *
   * @example
   * ```typescript
   * // Get all performance data for today
   * const today = await client.agentPerformance.search();
   *
   * // Get performance for specific date range
   * const monthly = await client.agentPerformance.search({
   *   date_start: "2025-01-01 00:00:00",
   *   date_end: "2025-01-31 23:59:59"
   * });
   *
   * // Filter by campaigns and users
   * const filtered = await client.agentPerformance.search({
   *   date_start: "2025-01-01",
   *   date_end: "2025-01-31",
   *   campaign_ids: [102, 104],
   *   user_ids: [1002034, 1030483]
   * });
   *
   * // Get performance by status
   * const byStatus = await client.agentPerformance.search({
   *   status_ids: ["active", "completed"],
   *   date_start: "2025-01-01"
   * });
   * ```
   */
  async search(
    params?: AgentPerformanceSearchParams,
  ): Promise<AgentPerformanceSearchResponse> {
    return this.client.request({
      path: `${this.basePath}/search`,
      query: this.normalizeParams(params ?? {}),
    });
  }
}
