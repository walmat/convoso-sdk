import { BaseResource } from "./base-resource.js";
import type {
  AgentProductivitySearchParams,
  AgentProductivitySearchResponse,
} from "../types/agent-productivity.js";

/**
 * Agent Productivity API resource
 *
 * Provides methods to retrieve and analyze agent productivity metrics
 * including login time, call handling, and efficiency percentages.
 *
 * @example
 * ```typescript
 * // Get productivity for all agents today
 * const productivity = await client.agentProductivity.search();
 *
 * // Get productivity for specific agents
 * const agentStats = await client.agentProductivity.search({
 *   agent_emails: ["agent1@example.com", "agent2@example.com"],
 *   date_start: "2025-01-01",
 *   date_end: "2025-01-31"
 * });
 * ```
 */
export class AgentProductivityResource extends BaseResource {
  protected get basePath(): string {
    return "/agent-productivity";
  }

  /**
   * Search agent productivity data
   *
   * Retrieve agent productivity records within a specified date range,
   * with optional filters for agent emails, campaign, and pagination.
   *
   * @param params - Search filter parameters
   * @returns Promise resolving to agent productivity data
   *
   * @example
   * ```typescript
   * // Get all productivity data for today
   * const today = await client.agentProductivity.search();
   *
   * // Get productivity for specific date range
   * const monthly = await client.agentProductivity.search({
   *   date_start: "2025-01-01 00:00:00",
   *   date_end: "2025-01-31 23:59:59"
   * });
   *
   * // Filter by specific agents
   * const agentData = await client.agentProductivity.search({
   *   agent_emails: ["agent1@example.com", "agent2@example.com"],
   *   date_start: "2025-01-01"
   * });
   *
   * // Filter by campaign with pagination
   * const campaignData = await client.agentProductivity.search({
   *   campaign_id: 102,
   *   offset: 0,
   *   limit: 100,
   *   date_start: "2025-01-01"
   * });
   *
   * // Get all agents in a campaign
   * const allAgents = await client.agentProductivity.search({
   *   campaign_id: 102,
   *   date_start: "2025-01-01",
   *   date_end: "2025-01-31"
   * });
   *
   * // Pagination is automatically validated
   * const withPagination = await client.agentProductivity.search({
   *   offset: -10,  // Automatically becomes 0
   *   limit: 5000,  // Automatically becomes 1000 (max)
   *   date_start: "2025-01-01"
   * });
   * ```
   */
  async search(
    params?: AgentProductivitySearchParams,
  ): Promise<AgentProductivitySearchResponse> {
    return this.client.request({
      path: `${this.basePath}/search`,
      query: this.normalizeParams(this.applyPaginationValidation(params)),
    });
  }
}
