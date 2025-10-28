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
 * Call Logs Search response
 */
export interface CallLogsSearchResponse {
  /** Success status */
  success?: boolean;
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
 * Call Logs Get response (single record)
 */
export interface CallLogsGetResponse {
  /** Success status */
  success?: boolean;
  /** Call log data */
  data?: CallLogData;
}
