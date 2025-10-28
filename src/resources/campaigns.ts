import { BaseResource } from "./base-resource.js";

/**
 * Campaigns API resource
 */
export class CampaignsResource extends BaseResource {
  protected get basePath(): string {
    return "/campaigns";
  }

  /**
   * Get all campaigns
   */
  async list(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/list`,
      body: params,
    });
  }

  /**
   * Get campaign details
   */
  async get(campaignId: string | number) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/get`,
      body: { campaign_id: campaignId },
    });
  }

  /**
   * Create a campaign
   */
  async create(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: this.basePath,
      body: params,
    });
  }

  /**
   * Update a campaign
   */
  async update(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/update`,
      body: params,
    });
  }
}
