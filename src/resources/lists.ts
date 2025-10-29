import type {
  ListsDeleteParams,
  ListsDeleteResponse,
  ListsInsertParams,
  ListsInsertResponse,
  ListsSearchParams,
  ListsSearchResponse,
  ListsUpdateParams,
  ListsUpdateResponse,
} from "../types/lists.js";
import { BaseResource } from "./base-resource.js";

/**
 * Lists API resource
 *
 * Manage lists including creating, updating, deleting, and searching lists
 * within campaigns. Lists are used to organize leads for dialing campaigns.
 *
 * @example
 * ```typescript
 * // Insert a new list
 * const result = await client.lists.insert({
 *   name: "Summer 2025 Leads",
 *   campaign_id: "64",
 *   description: "High-priority summer campaign leads",
 *   status: true,
 * });
 *
 * if (result.success) {
 *   console.log(`List ID: ${result.data.list_id}`);
 * }
 * ```
 */
export class ListsResource extends BaseResource {
  protected get basePath(): string {
    return "/lists";
  }

  /**
   * Insert a new list
   *
   * Create a new list within a campaign. List names must be 10-30 characters long
   * and contain only letters, numbers, and the symbols: : - _ space
   *
   * @param params - List data including required name and campaign_id
   * @returns Promise resolving to insert response with list_id
   *
   * @example
   * ```typescript
   * // Create a basic list
   * const result = await client.lists.insert({
   *   name: "Q1 2025 Leads",
   *   campaign_id: "64",
   * });
   *
   * // Create a list with description and status
   * const detailed = await client.lists.insert({
   *   name: "VIP Customers 2025",
   *   campaign_id: "64",
   *   description: "High-value customer segment for targeted outreach",
   *   status: true,
   * });
   *
   * if (detailed.success) {
   *   console.log(`Created list ID: ${detailed.data.list_id}`);
   * }
   * ```
   */
  async insert(params: ListsInsertParams): Promise<ListsInsertResponse> {
    const query = this.normalizeParams(params);
    return this.client.request({
      path: `${this.basePath}/insert`,
      query,
    });
  }

  /**
   * Update a list
   *
   * Update an existing list's name, campaign assignment, or status.
   * List names must be 10-30 characters long if provided.
   *
   * @param params - List update data including required list_id
   * @returns Promise resolving to update response with list_id
   *
   * @example
   * ```typescript
   * // Update list name
   * const result = await client.lists.update({
   *   list_id: 17257,
   *   name: "Updated List Name 2025",
   * });
   *
   * // Update multiple properties
   * const detailed = await client.lists.update({
   *   list_id: 17257,
   *   name: "Reactivation Campaign",
   *   campaign_id: "128",
   *   status: true,
   * });
   *
   * if (detailed.success) {
   *   console.log(`Updated list ID: ${detailed.data.list_id}`);
   * }
   * ```
   */
  async update(params: ListsUpdateParams): Promise<ListsUpdateResponse> {
    const query = this.normalizeParams(params);
    return this.client.request({
      path: `${this.basePath}/update`,
      query,
    });
  }

  /**
   * Delete a list
   *
   * Delete a list from the system by list ID. Note that list deletion
   * may take time if it contains many leads.
   *
   * @param params - Delete parameters with required list_id
   * @returns Promise resolving to delete response
   *
   * @example
   * ```typescript
   * const result = await client.lists.delete({
   *   list_id: 17257,
   * });
   *
   * if (result.success) {
   *   console.log("List deleted successfully");
   * }
   * ```
   */
  async delete(params: ListsDeleteParams): Promise<ListsDeleteResponse> {
    const query = this.normalizeParams(params);
    return this.client.request({
      path: `${this.basePath}/delete`,
      query,
    });
  }

  /**
   * Search lists
   *
   * Search and retrieve lists with filtering by status, list ID, or campaign ID.
   * Returns list details including campaign assignment and last called timestamp.
   *
   * @param params - Search filter parameters with required status
   * @returns Promise resolving to list search results
   *
   * @example
   * ```typescript
   * // Search active lists
   * const results = await client.lists.search({
   *   status: "Y",
   * });
   *
   * // Search by campaign and status
   * const filtered = await client.lists.search({
   *   status: "Y",
   *   campaign_id: "64",
   * });
   *
   * // Search specific list
   * const specific = await client.lists.search({
   *   status: "Y",
   *   id: "48",
   * });
   *
   * if (filtered.success && filtered.data) {
   *   filtered.data.forEach(list => {
   *     console.log(`List ${list.id} in campaign ${list.campaign_id} - Status: ${list.status}`);
   *   });
   * }
   * ```
   */
  async search(params: ListsSearchParams): Promise<ListsSearchResponse> {
    const query = this.normalizeParams(params);
    return this.client.request({
      path: `${this.basePath}/search`,
      query,
    });
  }
}
