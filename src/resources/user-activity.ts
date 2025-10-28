import { BaseResource } from "./base-resource.js";

/**
 * User Activity API resource
 */
export class UserActivityResource extends BaseResource {
  protected get basePath(): string {
    return "/user-activity";
  }

  /**
   * Get user activity
   */
  async get(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: this.basePath,
      body: params,
    });
  }

  /**
   * Search user activity
   */
  async search(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/search`,
      body: params,
    });
  }
}
