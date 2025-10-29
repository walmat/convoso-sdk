import type {
  UserActivitySearchParams,
  UserActivitySearchResponse,
} from "../types/user-activity.js";
import { BaseResource } from "./base-resource.js";

/**
 * User Activity API resource
 *
 * Retrieve agent activity metrics including available and logged-in agent counts.
 * Filter by campaign, queue, user, or skill options to get specific activity data.
 *
 * @example
 * ```typescript
 * // Get all user activity
 * const result = await client.userActivity.search();
 *
 * if (result.success) {
 *   console.log(`Available: ${result.data.available_agents}`);
 *   console.log(`Logged in: ${result.data.logged_in_agents}`);
 * }
 * ```
 */
export class UserActivityResource extends BaseResource {
  protected get basePath(): string {
    return "/user-activity";
  }

  /**
   * Search user activity
   *
   * Retrieve agent activity metrics with optional filtering by campaign, queue,
   * user, or skill options. Returns counts of available and logged-in agents.
   *
   * @param params - Optional search filters
   * @returns Promise resolving to user activity data
   *
   * @example
   * ```typescript
   * // Get all agent activity
   * const all = await client.userActivity.search();
   *
   * // Filter by campaign
   * const byCampaign = await client.userActivity.search({
   *   campaign_id: 102,
   * });
   *
   * // Filter by multiple campaigns
   * const multiCampaign = await client.userActivity.search({
   *   campaign_id: [102, 104],
   * });
   *
   * // Filter by queue and user
   * const filtered = await client.userActivity.search({
   *   queue_id: [203, 204],
   *   user_id: [1002034, 1030483],
   * });
   *
   * // Filter by skill options (e.g., state)
   * const bySkill = await client.userActivity.search({
   *   filter_by_skill_options: ["CA", "TX", "NY"],
   * });
   *
   * if (filtered.success) {
   *   console.log(`Available agents: ${filtered.data.available_agents}`);
   *   console.log(`Logged in agents: ${filtered.data.logged_in_agents}`);
   * }
   * ```
   */
  async search(params?: UserActivitySearchParams): Promise<UserActivitySearchResponse> {
    const query = params ? this.normalizeParams(params) : {};
    return this.client.request({
      path: `${this.basePath}/search`,
      query,
    });
  }
}
