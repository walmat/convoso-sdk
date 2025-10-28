import type { ConvosoErrorResponse } from "./index.js";

/**
 * Call type filter options
 */
export type CallType = "OUTBOUND" | "INBOUND" | "MANUAL" | "3WAY";

/**
 * Sort order for call log results
 */
export type CallLogOrder = "ASC" | "DESC";

/**
 * Call Logs Search request parameters
 *
 * Retrieve call log records with optional filters.
 * All parameters are optional and can be combined to filter results.
 */
export interface CallLogsSearchParams extends Record<string, unknown> {
  /**
   * Call Log ID
   * @example "2073617"
   */
  id?: string;

  /**
   * Lead ID
   * @example "408159"
   */
  lead_id?: string;

  /**
   * Campaign ID
   * @example "3475"
   */
  campaign_id?: string;

  /**
   * Queue ID
   * @example "301"
   */
  queue_id?: string;

  /**
   * List ID
   * @example "10855"
   */
  list_id?: string;

  /**
   * User ID
   * @example "666666"
   */
  user_id?: string;

  /**
   * Call Type filter
   * @example "OUTBOUND"
   */
  call_type?: CallType;

  /**
   * Search by Call Count
   * @example "11"
   */
  called_count?: string;

  /**
   * Status filter (e.g., PALL, DROP, AM, AA, NA, etc.)
   * @example "AA"
   */
  status?: string;

  /**
   * Phone Number
   * @example "6159445881"
   */
  phone_number?: string;

  /**
   * Number Dialed
   * @example "6159445881"
   */
  number_dialed?: string;

  /**
   * First Name
   * @example "PAMELA"
   */
  first_name?: string;

  /**
   * Last Name
   * @example "HAGA"
   */
  last_name?: string;

  /**
   * Start Time for date range filter
   * Format: YYYY-MM-DD HH:MM:SS
   * @default today at 00:00:00
   * @example "2025-10-27 00:00:00"
   */
  start_time?: string;

  /**
   * End Time for date range filter
   * Format: YYYY-MM-DD HH:MM:SS
   * @default today at 23:59:59
   * @example "2025-10-27 23:59:59"
   */
  end_time?: string;

  /**
   * Maximum number of results to return
   * Range: 1-500
   * @default 500
   * @example 100
   */
  limit?: number;

  /**
   * Offset for pagination
   * Range: 0-40000
   * To access data sets larger than 40000 items, use start_time and end_time filters
   * @default 0
   * @example 0
   */
  offset?: number;

  /**
   * Sort order
   * - ASC: Oldest first
   * - DESC: Newest first (default)
   * @default "DESC"
   * @example "DESC"
   */
  order?: CallLogOrder;

  /**
   * Include call recordings in response
   * - 0: Do not include recordings (default)
   * - 1: Include recordings
   * @default 0
   * @example 0
   */
  include_recordings?: number;
}

/**
 * Call Log record
 */
export interface CallLogData {
  /** Call Log ID */
  id?: string;
  /** Lead ID */
  lead_id?: string;
  /** List ID */
  list_id?: string;
  /** Campaign ID */
  campaign_id?: string;
  /** Campaign name */
  campaign?: string;
  /** User/Agent name */
  user?: string;
  /** User/Agent ID */
  user_id?: string;
  /** Phone number contacted */
  phone_number?: string;
  /** Number that was dialed */
  number_dialed?: string;
  /** Lead first name */
  first_name?: string | null;
  /** Lead last name */
  last_name?: string | null;
  /** Call status code */
  status?: string;
  /** Human-readable status name */
  status_name?: string;
  /** Call length in seconds (as string) */
  call_length?: string;
  /** Date and time of the call */
  call_date?: string;
  /** Agent's comment on the call */
  agent_comment?: string | null;
  /** Queue ID (if applicable) */
  queue_id?: string | null;
  /** Number of times this lead has been called */
  called_count?: string;
  /** Caller ID displayed to the recipient */
  caller_id_displayed?: string;
  /** Call termination reason */
  term_reason?: string;
  /** Type of call */
  call_type?: string;
  /** Position in queue */
  queue_position?: string;
  /** Time spent in queue (seconds) */
  queue_seconds?: string;
  /** Originating agent ID (for transfers) */
  originating_agent_id?: string | null;
  /** SIP session ID */
  session_id?: string;
}

/**
 * Call Logs Search success response
 */
export interface CallLogsSearchResponseSuccess {
  /** Success status */
  success: true;
  /** Response data */
  data?: {
    /** Current offset */
    offset?: number;
    /** Current limit */
    limit?: number;
    /** Total number of records found */
    total_found?: number;
    /** Number of entries in this response */
    entries?: number;
    /** Array of call log records */
    results?: CallLogData[];
  };
}

/**
 * Call Logs Search error definitions
 */
export type CallLogsSearchError =
  | { code: 6002; text: "Unknown List Id" }
  | { code: 6006; text: "Unknown User Id" }
  | { code: 6004; text: "Unknown Campaign ID" }
  | { code: 6030; text: "Unknown Queue ID" }
  | { code: 7231; text: "Invalid offset value" };

/**
 * Call Logs Search error response
 *
 * TypeScript will narrow the exact text when you check the code:
 * - If code === 6002, then text is "Unknown List Id"
 * - If code === 6006, then text is "Unknown User Id"
 * - If code === 6004, then text is "Unknown Campaign ID"
 * - If code === 6030, then text is "Unknown Queue ID"
 * - If code === 7231, then text is "Invalid offset value"
 */
export type CallLogsSearchResponseError = ConvosoErrorResponse<CallLogsSearchError>;

/**
 * Call Logs Search response (discriminated union)
 *
 * @example
 * ```typescript
 * const response = await client.callLogs.search({
 *   call_type: "OUTBOUND",
 *   date_start: "2025-01-01",
 * });
 *
 * if (response.success) {
 *   console.log(response.data?.results); // ✅ Valid
 * } else {
 *   if (response.code === 6004) {
 *     console.log(response.text); // ✅ Type is exactly "Unknown Campaign ID"
 *   }
 * }
 * ```
 */
export type CallLogsSearchResponse = CallLogsSearchResponseSuccess | CallLogsSearchResponseError;

/**
 * Call Logs Update request parameters
 */
export interface CallLogsUpdateParams extends Record<string, unknown> {
  /** Call Log ID */
  call_log_id: string;

  extra_field_01?: string;

  extra_field_02?: string;
}

/**
 * Call Logs Update success response
 */
export interface CallLogsUpdateResponseSuccess {
  /** Success status */
  success: true;
}

/**
 * Call Logs Update error definitions
 */
export type CallLogsUpdateError =
  | { code: 6032; text: "Missing Call Log ID" }
  | { code: 6033; text: "No such Call Log" }
  | { code: 6035; text: "Either Extra Field 01 or Extra Field 02 need to have value" };

/**
 * Call Logs Update error response
 *
 * TypeScript will narrow the exact text when you check the code:
 * - If code === 6032, then text is "Missing Call Log ID"
 * - If code === 6033, then text is "No such Call Log"
 * - If code === 6035, then text is "Either Extra Field 01 or Extra Field 02 need to have value"
 */
export type CallLogsUpdateResponseError = ConvosoErrorResponse<CallLogsUpdateError>;

/**
 * Call Logs Update response (discriminated union)
 *
 * @example
 * ```typescript
 * const response = await client.callLogs.update({
 *   call_log_id: "12345",
 *   extra_field_01: "value",
 * });
 *
 * if (response.success) {
 *   console.log("Call log updated successfully");
 * } else {
 *   if (response.code === 6033) {
 *     console.log(response.text); // ✅ Type is exactly "No such Call Log"
 *   }
 * }
 * ```
 */
export type CallLogsUpdateResponse = CallLogsUpdateResponseSuccess | CallLogsUpdateResponseError;
