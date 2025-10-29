/**
 * Parameters for searching user activity
 */
export interface UserActivitySearchParams extends Record<string, unknown> {
  /**
   * Filter by Campaign ID (optional)
   * For multiple campaigns, use comma-separated values
   * @example "102,104"
   */
  campaign_id?: number | number[];

  /**
   * Filter by Queue ID (optional)
   * For multiple queues, use comma-separated values
   * @example "203,204"
   */
  queue_id?: number | number[];

  /**
   * Filter by User ID (optional)
   * For multiple users, use comma-separated values
   * @example "1002034,1030483"
   */
  user_id?: number | number[];

  /**
   * Filter by Skill Options (optional)
   * For multiple skill options, use comma-separated values
   * @example "CA,TX,NY"
   */
  filter_by_skill_options?: string | string[];
}

/**
 * User activity search success response
 */
export interface UserActivitySearchResponseSuccess {
  /** Success status */
  success: true;

  /** Response data */
  data: {
    /**
     * Number of agents currently available
     */
    available_agents: number;

    /**
     * Number of agents currently logged in
     */
    logged_in_agents: number;
  };
}

/**
 * User activity search response
 * No specific error codes documented for this endpoint
 */
export type UserActivitySearchResponse = UserActivitySearchResponseSuccess;
