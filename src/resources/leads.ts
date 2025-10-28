import type {
  LeadRecordingsParams,
  LeadRecordingsResponse,
  LeadsDeleteParams,
  LeadsDeleteResponse,
  LeadsInsertParams,
  LeadsInsertResponse,
  LeadsSearchParams,
  LeadsSearchResponse,
  LeadsUpdateParams,
  LeadsUpdateResponse,
} from "../types/leads.js";
import { BaseResource } from "./base-resource.js";

/**
 * Leads API resource
 *
 * Manage leads including inserting, searching, updating, and deleting lead records.
 * Supports comprehensive lead data, duplicate checking, DNC validation, and hopper management.
 *
 * @example
 * ```typescript
 * // Insert a new lead
 * const result = await client.leads.insert({
 *   list_id: 12345,
 *   phone_number: "5551234567",
 *   first_name: "John",
 *   last_name: "Doe",
 *   check_dup: 1, // Check for duplicates across entire account
 *   hopper: true, // Insert into hopper
 * });
 *
 * if (result.success) {
 *   console.log(`Lead ID: ${result.data.lead_id}`);
 * }
 * ```
 */
export class LeadsResource extends BaseResource {
  protected get basePath(): string {
    return "/leads";
  }

  /**
   * Insert a new lead
   *
   * Create a new lead with comprehensive contact information, validation options,
   * and hopper management. Supports duplicate checking, DNC validation, and
   * update-if-found functionality.
   *
   * @param params - Lead data including required list_id and phone_number
   * @returns Promise resolving to insert response with lead_id
   *
   * @example
   * ```typescript
   * // Basic lead insert
   * const result = await client.leads.insert({
   *   list_id: 12345,
   *   phone_number: "5551234567",
   * });
   *
   * // Insert with duplicate checking and hopper
   * const detailed = await client.leads.insert({
   *   list_id: 12345,
   *   phone_number: "5551234567",
   *   phone_code: "1",
   *   first_name: "Jane",
   *   last_name: "Smith",
   *   email: "jane@example.com",
   *   state: "CA",
   *   check_dup: 2, // Check duplicates within list
   *   check_dnc: true,
   *   check_wireless: true,
   *   hopper: true,
   *   hopper_priority: 50,
   * });
   *
   * // Update if found
   * const updateOrInsert = await client.leads.insert({
   *   list_id: 12345,
   *   phone_number: "5551234567",
   *   first_name: "John",
   *   update_if_found: true,
   *   search_list_id: 12345,
   * });
   *
   * if (updateOrInsert.success) {
   *   console.log(`Lead ID: ${updateOrInsert.data.lead_id}`);
   * }
   * ```
   */
  async insert(params: LeadsInsertParams): Promise<LeadsInsertResponse> {
    const query = this.normalizeParams(params);
    return this.client.request({
      path: `${this.basePath}/insert`,
      query,
    });
  }

  /**
   * Update a lead
   *
   * Update an existing lead's information including contact details, status,
   * and custom fields.
   *
   * @param params - Lead update data including required lead_id
   * @returns Promise resolving to update response with lead_id
   *
   * @example
   * ```typescript
   * // Update lead contact information
   * const result = await client.leads.update({
   *   lead_id: 65007347,
   *   first_name: "Jane",
   *   last_name: "Doe",
   *   email: "jane.doe@example.com",
   *   status: "active",
   * });
   *
   * if (result.success) {
   *   console.log(`Updated lead ID: ${result.data.lead_id}`);
   * }
   * ```
   */
  async update(params: LeadsUpdateParams): Promise<LeadsUpdateResponse> {
    const query = this.normalizeParams(params);
    return this.client.request({
      path: `${this.basePath}/update`,
      query,
    });
  }

  /**
   * Delete a lead
   *
   * Delete a lead from the system by lead ID.
   *
   * @param params - Delete parameters with required lead_id
   * @returns Promise resolving to delete response
   *
   * @example
   * ```typescript
   * const result = await client.leads.delete({
   *   lead_id: 65007347,
   * });
   *
   * if (result.success) {
   *   console.log("Lead deleted successfully");
   * }
   * ```
   */
  async delete(params: LeadsDeleteParams): Promise<LeadsDeleteResponse> {
    const query = this.normalizeParams(params);
    return this.client.request({
      path: `${this.basePath}/delete`,
      query,
    });
  }

  /**
   * Search leads
   *
   * Search and retrieve leads with optional filtering by various criteria including
   * contact information, dates, status, and more. Supports pagination with a maximum
   * limit of 2000 results.
   *
   * @param params - Search filter parameters with pagination
   * @returns Promise resolving to paginated lead search results
   *
   * @example
   * ```typescript
   * // Search by list ID
   * const results = await client.leads.search({
   *   list_id: 12345,
   *   limit: 100,
   * });
   *
   * // Search with multiple criteria
   * const filtered = await client.leads.search({
   *   list_id: 12345,
   *   status: "active",
   *   state: "CA",
   *   created_at_start_date: "2025-01-01 00:00:00",
   *   created_at_end_date: "2025-12-31 23:59:59",
   *   limit: 50,
   * });
   *
   * if (filtered.success && filtered.data) {
   *   console.log(`Found ${filtered.data.total} leads`);
   *   filtered.data.entries.forEach(lead => {
   *     console.log(`${lead.first_name} ${lead.last_name} - ${lead.phone_number}`);
   *   });
   * }
   * ```
   */
  async search(params?: LeadsSearchParams): Promise<LeadsSearchResponse> {
    const validated = this.applyPaginationValidation(params, {
      limitMax: 2000,
    });

    const query = this.normalizeParams(validated);
    return this.client.request({
      path: `${this.basePath}/search`,
      query,
    });
  }

  /**
   * Get lead recordings
   *
   * Retrieve call recordings for a specific lead with optional date filtering
   * and pagination. Returns recording details including duration and file URLs.
   *
   * @param params - Recording search parameters including required lead_id
   * @returns Promise resolving to paginated recording results
   *
   * @example
   * ```typescript
   * // Get all recordings for a lead
   * const recordings = await client.leads.getRecordings({
   *   lead_id: 270,
   *   limit: 10,
   * });
   *
   * // Filter recordings by date range
   * const filtered = await client.leads.getRecordings({
   *   lead_id: 270,
   *   start_time: "2025-01-01 00:00:00",
   *   end_time: "2025-12-31 23:59:59",
   *   limit: 50,
   * });
   *
   * if (filtered.success && filtered.data) {
   *   console.log(`Found ${filtered.data.total} recordings`);
   *   filtered.data.entries.forEach(recording => {
   *     console.log(`Recording ${recording.recording_id}: ${recording.seconds}s - ${recording.url}`);
   *   });
   * }
   * ```
   */
  async getRecordings(params: LeadRecordingsParams): Promise<LeadRecordingsResponse> {
    const validated = this.applyPaginationValidation(params);
    const query = this.normalizeParams(validated);
    return this.client.request({
      path: `${this.basePath}/get-recordings`,
      query,
    });
  }
}
