import type {
  UsersRecordingsParams,
  UsersRecordingsResponse,
  UsersSearchParams,
  UsersSearchResponse,
} from "../types/users.js";
import { BaseResource } from "./base-resource.js";

/**
 * Users API resource
 *
 * Manage users and retrieve user-related data including call recordings and user search.
 *
 * @example
 * ```typescript
 * // Search for users
 * const users = await client.users.search({
 *   user: "john@example.com",
 *   limit: 10,
 * });
 *
 * if (users.success && users.data) {
 *   console.log(`Found ${users.data.total} users`);
 * }
 * ```
 */
export class UsersResource extends BaseResource {
  protected get basePath(): string {
    return "/users";
  }

  /**
   * Get user recordings
   *
   * Retrieve call recordings for a specific user with optional date filtering
   * and pagination. Returns recording details including duration and file URLs.
   *
   * @param params - Recording search parameters including required user email
   * @returns Promise resolving to paginated recording results
   *
   * @example
   * ```typescript
   * // Get all recordings for a user
   * const recordings = await client.users.getRecordings({
   *   user: "agent@example.com",
   *   limit: 10,
   * });
   *
   * // Filter recordings by date range
   * const filtered = await client.users.getRecordings({
   *   user: "agent@example.com",
   *   start_time: "2014-06-19 00:00:00",
   *   end_time: "2014-06-19 23:59:59",
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
  async getRecordings(params: UsersRecordingsParams): Promise<UsersRecordingsResponse> {
    const validated = this.applyPaginationValidation(params);
    const query = this.normalizeParams(validated);
    return this.client.request({
      path: `${this.basePath}/recordings`,
      query,
    });
  }

  /**
   * Search users
   *
   * Search and retrieve users with optional filtering by email, first name, or last name.
   * Supports pagination and returns detailed user information.
   *
   * @param params - Search filter parameters with pagination
   * @returns Promise resolving to paginated user search results
   *
   * @example
   * ```typescript
   * // Search all users
   * const all = await client.users.search({
   *   limit: 100,
   * });
   *
   * // Search by email
   * const byEmail = await client.users.search({
   *   user: "john@example.com",
   * });
   *
   * // Search by partial name
   * const byName = await client.users.search({
   *   user: "John",
   *   limit: 50,
   * });
   *
   * if (byName.success && byName.data) {
   *   console.log(`Found ${byName.data.total} users`);
   *   Object.values(byName.data.results).forEach(user => {
   *     console.log(`${user.first_name} ${user.last_name} - ${user.email}`);
   *     console.log(`  Status: ${user.status}, Level: ${user.user_level}`);
   *     console.log(`  Last login: ${user.last_login || "Never"}`);
   *   });
   * }
   * ```
   */
  async search(params?: UsersSearchParams): Promise<UsersSearchResponse> {
    const validated = this.applyPaginationValidation(params);
    const query = this.normalizeParams(validated);
    return this.client.request({
      path: `${this.basePath}/search`,
      query,
    });
  }
}
