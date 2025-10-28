/**
 * Agent Productivity Search request parameters
 *
 * Retrieve agent productivity records within a date range,
 * optionally filtered by agent emails or campaign.
 */
export interface AgentProductivitySearchParams extends Record<string, unknown> {
  /**
   * Start Date for productivity data
   * Format: YYYY-MM-DD HH:MM:SS or YYYY-MM-DD
   * @default today at 00:00:00
   * @example "2017-09-01 00:00:00"
   * @example "2025-01-01"
   */
  date_start?: string;

  /**
   * End Date for productivity data
   * Format: YYYY-MM-DD HH:MM:SS or YYYY-MM-DD
   * @default today at 23:59:59
   * @example "2017-09-01 23:59:59"
   * @example "2025-01-31"
   */
  date_end?: string;

  /**
   * Filter by Agent Email(s)
   * - Single email: "agent@example.com"
   * - Multiple emails: ["agent1@example.com", "agent2@example.com"]
   * - If left blank, returns all agents
   * @example "agent@example.com"
   * @example ["agent1@example.com", "agent2@example.com"]
   */
  agent_emails?: string | string[];

  /**
   * Filter by Campaign ID
   * @example 102
   */
  campaign_id?: number;

  /**
   * Offset for pagination
   * - Automatically clamped to [0, 50000]
   * - Negative values become 0
   * - Values over 50000 become 50000
   * @default 0
   * @example 0
   * @example 1000
   */
  offset?: number;

  /**
   * Maximum number of rows to return
   * - Automatically clamped to [1, 1000]
   * - Values under 1 become 1
   * - Values over 1000 become 1000
   * @default 1000
   * @example 100
   * @example 1000
   */
  limit?: number;
}

/**
 * Agent productivity metrics
 */
export interface AgentProductivityData {
  /** User/Agent ID */
  user_id?: number;
  /** Agent username */
  username?: string;
  /** Agent email */
  email?: string;
  /** Agent first name */
  first_name?: string;
  /** Agent last name */
  last_name?: string;
  /** Campaign ID */
  campaign_id?: number;
  /** Campaign name */
  campaign_name?: string;
  /** Date of the productivity record */
  date?: string;
  /** Total login time (seconds) */
  login_time?: number;
  /** Total available time (seconds) */
  available_time?: number;
  /** Total on-call time (seconds) */
  on_call_time?: number;
  /** Total wrap-up time (seconds) */
  wrap_up_time?: number;
  /** Total pause time (seconds) */
  pause_time?: number;
  /** Number of calls handled */
  calls_handled?: number;
  /** Number of leads contacted */
  leads_contacted?: number;
  /** Productivity percentage */
  productivity_percentage?: number;
  /** Utilization percentage */
  utilization_percentage?: number;
}

/**
 * Agent Productivity Search response
 */
export interface AgentProductivitySearchResponse {
  /** Success status */
  success?: boolean;
  /** Response message */
  message?: string;
  /** List of agent productivity records */
  data?: AgentProductivityData[];
  /** Total count of results */
  total?: number;
  /** Pagination information */
  pagination?: {
    offset?: number;
    limit?: number;
    has_more?: boolean;
  };
  /** Date range for the data */
  date_range?: {
    start?: string;
    end?: string;
  };
}
