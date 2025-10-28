import { BaseResource } from "./base-resource.js";

/**
 * Leads API resource
 */
export class LeadsResource extends BaseResource {
  protected get basePath(): string {
    return "/leads";
  }

  /**
   * Search leads
   */
  async search(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/search`,
      body: params,
    });
  }

  /**
   * Get lead details
   */
  async get(leadId: string | number) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/get`,
      body: { lead_id: leadId },
    });
  }

  /**
   * Update a lead
   */
  async update(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/update`,
      body: params,
    });
  }

  /**
   * Delete a lead
   */
  async delete(leadId: string | number) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/delete`,
      body: { lead_id: leadId },
    });
  }
}
