import type {
  AgentMonitorLogoutParams,
  AgentMonitorLogoutResponse,
  AgentMonitorSearchParams,
  AgentMonitorSearchResponse,
} from "../types/agent-monitor.js";
import { BaseResource } from "./base-resource.js";

/**
 * Agent Monitor API resource
 *
 * Provides methods to monitor and manage logged-in agents in real-time.
 *
 * @example
 * ```typescript
 * // Search for agents in specific campaigns
 * const agents = await client.agentMonitor.search({
 *   campaign_id: [102, 104],
 *   filter_by_skill_options: ["CA", "TX"]
 * });
 *
 * // Logout agents
 * await client.agentMonitor.logout({
 *   user_id: 1002034,
 *   campaign_id: 102
 * });
 * ```
 */
export class AgentMonitorResource extends BaseResource {
  protected get basePath(): string {
    return "/agent-monitor";
  }

  /**
   * Search through all logged in agents
   *
   * Globally search through all logged in users with optional filters
   * for campaign, queue, user ID, and skill options.
   *
   * @param params - Search filter parameters (all optional)
   * @returns Promise resolving to agent monitor search results
   *
   * @example
   * ```typescript
   * // Search all logged in agents
   * const allAgents = await client.agentMonitor.search();
   *
   * // Search agents in specific campaigns
   * const campaignAgents = await client.agentMonitor.search({
   *   campaign_id: [102, 104]
   * });
   *
   * // Search by user ID
   * const userAgent = await client.agentMonitor.search({
   *   user_id: 1002034
   * });
   *
   * // Search by skill options
   * const skillAgents = await client.agentMonitor.search({
   *   filter_by_skill_options: ["CA", "TX", "NY"]
   * });
   *
   * // Combine multiple filters
   * const filtered = await client.agentMonitor.search({
   *   campaign_id: 102,
   *   queue_id: [203, 204],
   *   filter_by_skill_options: ["CA", "TX"]
   * });
   * ```
   */
  async search(params?: AgentMonitorSearchParams): Promise<AgentMonitorSearchResponse> {
    return this.client.request({
      path: `${this.basePath}/search`,
      query: this.normalizeParams(params ?? {}),
    });
  }

  /**
   * Logout one or more agents
   *
   * Force logout agents from the system, optionally by campaign, queue,
   * or specific user IDs.
   *
   * @param params - Logout parameters
   * @returns Promise resolving to logout results
   *
   * @example
   * ```typescript
   * // Logout specific user
   * await client.agentMonitor.logout({
   *   user_id: 1002034
   * });
   *
   * // Logout multiple users
   * await client.agentMonitor.logout({
   *   user_id: [1002034, 1030483]
   * });
   *
   * // Force logout (disconnect active calls)
   * await client.agentMonitor.logout({
   *   user_id: 1002034,
   *   force: true
   * });
   *
   * // Logout all agents in a campaign
   * await client.agentMonitor.logout({
   *   campaign_id: 102
   * });
   * ```
   */
  async logout(params?: AgentMonitorLogoutParams): Promise<AgentMonitorLogoutResponse> {
    return this.client.request({
      path: `${this.basePath}/logout`,
      query: this.normalizeParams(params ?? {}),
    });
  }
}
