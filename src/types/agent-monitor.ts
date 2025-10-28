/**
 * Agent Monitor Search request parameters
 *
 * All parameters are optional and can be combined to filter results
 */
export interface AgentMonitorSearchParams extends Record<string, unknown> {
  /**
   * Filter by Campaign ID
   * - Single ID: 102
   * - Multiple IDs: [102, 104]
   * @example 102
   * @example [102, 104]
   */
  campaign_id?: number | number[];

  /**
   * Filter by Queue ID
   * - Single ID: 203
   * - Multiple IDs: [203, 204]
   * @example 203
   * @example [203, 204]
   */
  queue_id?: number | number[];

  /**
   * Filter by User ID
   * - Single ID: 1002034
   * - Multiple IDs: [1002034, 1030483]
   * @example 1002034
   * @example [1002034, 1030483]
   */
  user_id?: number | number[];

  /**
   * Filter by Skill Options
   * - Single value: "CA"
   * - Multiple values: ["CA", "TX", "NY"]
   * @example "CA"
   * @example ["CA", "TX", "NY"]
   */
  filter_by_skill_options?: string | string[];
}

/**
 * Agent status information
 */
export interface AgentStatus {
  /** Current agent status */
  status?: string;
  /** Status timestamp */
  status_time?: string;
  /** Duration in current status */
  duration?: number;
}

/**
 * Agent information returned from search
 */
export interface AgentMonitorData {
  /** User/Agent ID */
  user_id?: number;
  /** Agent username */
  username?: string;
  /** Agent first name */
  first_name?: string;
  /** Agent last name */
  last_name?: string;
  /** Agent email */
  email?: string;
  /** Campaign ID the agent is logged into */
  campaign_id?: number;
  /** Campaign name */
  campaign_name?: string;
  /** Queue ID the agent is in */
  queue_id?: number;
  /** Queue name */
  queue_name?: string;
  /** Current agent status information */
  status?: AgentStatus;
  /** Skill options assigned to the agent */
  skill_options?: string[];
  /** When the agent logged in */
  login_time?: string;
  /** Total login duration */
  login_duration?: number;
  /** Current call information */
  current_call?: {
    call_id?: string;
    phone_number?: string;
    call_start_time?: string;
    call_duration?: number;
  };
}

/**
 * Agent Monitor Search response
 */
export interface AgentMonitorSearchResponse {
  /** Success status */
  success?: boolean;
  /** Response message */
  message?: string;
  /** List of agents matching the search criteria */
  data?: AgentMonitorData[];
  /** Total count of results */
  total?: number;
}

/**
 * Agent Monitor Logout request parameters
 */
export interface AgentMonitorLogoutParams extends Record<string, unknown> {
  /**
   * User ID to logout
   * - Single ID: 1002034
   * - Multiple IDs: [1002034, 1030483]
   */
  user_id?: number | number[];

  /**
   * Campaign ID to logout agents from
   */
  campaign_id?: number | number[];

  /**
   * Queue ID to logout agents from
   */
  queue_id?: number | number[];

  /**
   * Force logout (disconnect active calls)
   */
  force?: boolean;
}

/**
 * Agent Monitor Logout response
 */
export interface AgentMonitorLogoutResponse {
  /** Success status */
  success?: boolean;
  /** Response message */
  message?: string;
  /** Number of agents logged out */
  count?: number;
  /** List of user IDs that were logged out */
  logged_out_users?: number[];
}
