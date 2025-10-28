import type {
  CampaignSearchResponse,
  CampaignStatusParams,
  CampaignStatusResponse,
} from "../types/campaigns.js";
import { BaseResource } from "./base-resource.js";

/**
 * Campaigns API resource
 *
 * Provides methods to manage campaigns and their status.
 *
 * @example
 * ```typescript
 * // Search all campaigns for authenticated user
 * const campaigns = await client.campaigns.search();
 *
 * // Toggle campaign status
 * await client.campaigns.status({
 *   campaign_id: "3471",
 *   status: 1, // Activate
 * });
 * ```
 */
export class CampaignsResource extends BaseResource {
  protected get basePath(): string {
    return "/campaigns";
  }

  /**
   * Toggle campaign status
   *
   * Activate or deactivate a campaign for the authenticated user.
   * Use status 1 to activate, 0 to deactivate.
   *
   * @param params - Status toggle parameters
   * @returns Promise resolving to status change response
   *
   * @example
   * ```typescript
   * // Activate a campaign
   * const result = await client.campaigns.status({
   *   campaign_id: "3471",
   *   status: 1,
   * });
   *
   * if (result.success) {
   *   console.log("Campaign activated");
   * }
   *
   * // Deactivate a campaign
   * await client.campaigns.status({
   *   campaign_id: "3471",
   *   status: 0,
   * });
   * ```
   */
  async status(params: CampaignStatusParams): Promise<CampaignStatusResponse> {
    const query = this.normalizeParams(params);
    return this.client.request({
      path: `${this.basePath}/status`,
      query,
    });
  }

  /**
   * Search campaigns
   *
   * Retrieve all campaigns accessible to the authenticated user.
   * Returns campaign details including ID, name, status, and last call date.
   *
   * @returns Promise resolving to campaign list
   *
   * @example
   * ```typescript
   * const result = await client.campaigns.search();
   *
   * if (result.success && result.data) {
   *   result.data.forEach(campaign => {
   *     console.log(`Campaign: ${campaign.name}`);
   *     console.log(`Status: ${campaign.status === "Y" ? "Active" : "Inactive"}`);
   *     console.log(`ID: ${campaign.id}`);
   *
   *     if (campaign.last_call_date) {
   *       console.log(`Last Call: ${campaign.last_call_date.date}`);
   *       console.log(`Timezone: ${campaign.last_call_date.timezone}`);
   *     } else {
   *       console.log("No calls yet");
   *     }
   *   });
   * }
   * ```
   */
  async search(): Promise<CampaignSearchResponse> {
    return this.client.request({
      path: `${this.basePath}/search`,
    });
  }

  /**
   * Get all campaigns (legacy)
   * @deprecated Use search() instead
   */
  async list(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/list`,
      body: params,
    });
  }

  /**
   * Get campaign details (legacy)
   */
  async get(campaignId: string | number) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/get`,
      body: { campaign_id: campaignId },
    });
  }

  /**
   * Create a campaign (legacy)
   */
  async create(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: this.basePath,
      body: params,
    });
  }

  /**
   * Update a campaign (legacy)
   */
  async update(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/update`,
      body: params,
    });
  }
}
