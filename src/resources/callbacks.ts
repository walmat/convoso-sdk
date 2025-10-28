import { BaseResource } from "./base-resource.js";

/**
 * Callbacks API resource
 */
export class CallbacksResource extends BaseResource {
  protected get basePath(): string {
    return "/callbacks";
  }

  /**
   * Create a callback
   */
  async create(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: this.basePath,
      body: params,
    });
  }

  /**
   * Search callbacks
   */
  async search(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/search`,
      body: params,
    });
  }

  /**
   * Update a callback
   */
  async update(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/update`,
      body: params,
    });
  }

  /**
   * Delete a callback
   */
  async delete(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/delete`,
      body: params,
    });
  }
}
