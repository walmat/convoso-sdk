import { BaseResource } from "./base-resource.js";

/**
 * Lists API resource
 */
export class ListsResource extends BaseResource {
  protected get basePath(): string {
    return "/lists";
  }

  /**
   * Get all lists
   */
  async list(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/list`,
      body: params,
    });
  }

  /**
   * Get list details
   */
  async get(listId: string | number) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/get`,
      body: { list_id: listId },
    });
  }

  /**
   * Create a list
   */
  async create(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: this.basePath,
      body: params,
    });
  }

  /**
   * Update a list
   */
  async update(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/update`,
      body: params,
    });
  }

  /**
   * Delete a list
   */
  async delete(listId: string | number) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/delete`,
      body: { list_id: listId },
    });
  }
}
