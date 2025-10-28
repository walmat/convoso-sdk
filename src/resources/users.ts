import { BaseResource } from "./base-resource.js";

/**
 * Users API resource
 */
export class UsersResource extends BaseResource {
  protected get basePath(): string {
    return "/users";
  }

  /**
   * Get all users
   */
  async list(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/list`,
      body: params,
    });
  }

  /**
   * Get user details
   */
  async get(userId: string | number) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/get`,
      body: { user_id: userId },
    });
  }

  /**
   * Create a user
   */
  async create(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: this.basePath,
      body: params,
    });
  }

  /**
   * Update a user
   */
  async update(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/update`,
      body: params,
    });
  }

  /**
   * Delete a user
   */
  async delete(userId: string | number) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/delete`,
      body: { user_id: userId },
    });
  }
}
