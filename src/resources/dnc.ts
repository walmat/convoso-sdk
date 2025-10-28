import { BaseResource } from "./base-resource.js";

/**
 * DNC (Do Not Call) API resource
 */
export class DncResource extends BaseResource {
  protected get basePath(): string {
    return "/dnc";
  }

  /**
   * Add number to DNC list
   */
  async add(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/add`,
      body: params,
    });
  }

  /**
   * Remove number from DNC list
   */
  async remove(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/remove`,
      body: params,
    });
  }

  /**
   * Search DNC list
   */
  async search(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/search`,
      body: params,
    });
  }
}
