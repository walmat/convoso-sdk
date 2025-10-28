import { BaseResource } from "./base-resource.js";

/**
 * Lead Post API resource
 */
export class LeadPostResource extends BaseResource {
  protected get basePath(): string {
    return "/lead-post";
  }

  /**
   * Post a new lead
   */
  async create(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: this.basePath,
      body: params,
    });
  }

  /**
   * Bulk post leads
   */
  async bulk(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/bulk`,
      body: params,
    });
  }
}
