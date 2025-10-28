import { BaseResource } from "./base-resource.js";

/**
 * Revenue API resource
 */
export class RevenueResource extends BaseResource {
  protected get basePath(): string {
    return "/revenue";
  }

  /**
   * Get revenue data
   */
  async get(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: this.basePath,
      body: params,
    });
  }

  /**
   * Search revenue data
   */
  async search(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/search`,
      body: params,
    });
  }

  /**
   * Get revenue report
   */
  async report(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/report`,
      body: params,
    });
  }
}
