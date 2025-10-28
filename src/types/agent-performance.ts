import type { ConvosoErrorResponse } from "./index.js";

/**
 * Agent Performance Search request parameters
 *
 * Retrieve agent performance records within a date range,
 * optionally filtered by campaigns, lists, queues, users, or statuses.
 */
export interface AgentPerformanceSearchParams extends Record<string, unknown> {
  /**
   * Start Date for performance data
   * Format: YYYY-MM-DD HH:MM:SS or YYYY-MM-DD
   * @default today at 00:00:00
   * @example "2017-09-01 00:00:00"
   * @example "2025-01-01"
   */
  date_start?: string;

  /**
   * End Date for performance data
   * Format: YYYY-MM-DD HH:MM:SS or YYYY-MM-DD
   * @default today at 23:59:59
   * @example "2017-09-01 23:59:59"
   * @example "2025-01-31"
   */
  date_end?: string;

  /**
   * Filter by Campaign IDs
   * - Single ID: 102
   * - Multiple IDs: [102, 104]
   * @example 102
   * @example [102, 104]
   */
  campaign_ids?: number | number[];

  /**
   * Filter by List IDs
   * - Single ID: 201
   * - Multiple IDs: [201, 202]
   * @example 201
   * @example [201, 202, 203]
   */
  list_ids?: number | number[];

  /**
   * Filter by Queue IDs
   * - Single ID: 301
   * - Multiple IDs: [301, 302]
   * @example 301
   * @example [301, 302]
   */
  queue_ids?: number | number[];

  /**
   * Filter by User IDs
   * - Single ID: 1002034
   * - Multiple IDs: [1002034, 1030483]
   * @example 1002034
   * @example [1002034, 1030483]
   */
  user_ids?: number | number[];

  /**
   * Filter by Status IDs
   * - Single ID: "active"
   * - Multiple IDs: ["active", "completed"]
   * @example "active"
   * @example ["active", "completed", "pending"]
   */
  status_ids?: string | string[];
}

/**
 * Agent performance metrics
 */
export interface AgentPerformanceMetrics {
  /** User/Agent ID */
  user_id?: number;
  /** Agent username */
  username?: string;
  /** Agent first name */
  first_name?: string;
  /** Agent last name */
  last_name?: string;
  /** Campaign ID */
  campaign_id?: number;
  /** Campaign name */
  campaign_name?: string;
  /** Queue ID */
  queue_id?: number;
  /** Queue name */
  queue_name?: string;
  /** Total calls made */
  total_calls?: number;
  /** Total talk time (seconds) */
  talk_time?: number;
  /** Total wait time (seconds) */
  wait_time?: number;
  /** Total pause time (seconds) */
  pause_time?: number;
  /** Total login time (seconds) */
  login_time?: number;
  /** Total contacts made */
  contacts?: number;
  /** Conversion rate percentage */
  conversion_rate?: number;
  /** Average handle time (seconds) */
  avg_handle_time?: number;
  /** Calls per hour */
  calls_per_hour?: number;
  /** Sales/conversions count */
  sales?: number;
  /** Revenue generated */
  revenue?: number;
}

/**
 * Agent Performance Search success response
 */
export interface AgentPerformanceSearchResponseSuccess {
  /** Success status */
  success: true;
  /** Response message */
  message?: string;
  /** List of agent performance records */
  data?: AgentPerformanceMetrics[];
  /** Total count of results */
  total?: number;
  /** Date range for the data */
  date_range?: {
    start?: string;
    end?: string;
  };
}

/**
 * Agent Performance Search error definition
 */
export type AgentPerformanceSearchError = {
  code: 6031;
  text: "Missing Agents";
};

/**
 * Agent Performance Search error response
 *
 * TypeScript will narrow the exact text when you check the code:
 * - If code === 6031, then text is "Missing Agents"
 */
export type AgentPerformanceSearchResponseError = ConvosoErrorResponse<AgentPerformanceSearchError>;

/**
 * Agent Performance Search response (discriminated union)
 *
 * TypeScript will automatically narrow the type based on the `success` field:
 *
 * @example
 * ```typescript
 * const response = await client.agentPerformance.search({
 *   date_start: "2025-01-01",
 *   date_end: "2025-01-31",
 * });
 *
 * if (response.success) {
 *   // TypeScript knows this is AgentPerformanceSearchResponseSuccess
 *   console.log(response.data); // ✅ Valid
 *   console.log(response.total); // ✅ Valid
 *   // console.log(response.code); // ❌ Error - doesn't exist on success type
 * } else {
 *   // TypeScript knows this is AgentPerformanceSearchResponseError
 *   if (response.code === 6031) {
 *     console.log(response.text); // ✅ Type is exactly "Missing Agents"
 *   }
 *   // console.log(response.data); // ❌ Error - doesn't exist on error type
 * }
 * ```
 */
export type AgentPerformanceSearchResponse =
  | AgentPerformanceSearchResponseSuccess
  | AgentPerformanceSearchResponseError;
