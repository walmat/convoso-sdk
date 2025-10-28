import { BaseResource } from "./base-resource.js";

/**
 * Statuses API resource
 */
export class StatusesResource extends BaseResource {
  protected get basePath(): string {
    return "/statuses";
  }

  /**
   * Get all statuses
   */
  async list(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/list`,
      body: params,
    });
  }

  /**
   * Get status details
   */
  async get(statusId: string | number) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/get`,
      body: { status_id: statusId },
    });
  }

  /**
   * Create a status
   */
  async create(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: this.basePath,
      body: params,
    });
  }

  /**
   * Update a status
   */
  async update(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/update`,
      body: params,
    });
  }
}
