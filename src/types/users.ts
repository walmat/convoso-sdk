import type { ConvosoErrorResponse } from "./index.js";

/**
 * Parameters for getting user recordings
 */
export interface UsersRecordingsParams extends Record<string, unknown> {
  /**
   * User's email (required)
   */
  user: string;

  /**
   * Start datetime (optional)
   * Format: Y-m-d H:i:s
   * @example "2014-06-19 21:11:36"
   */
  start_time?: string;

  /**
   * End datetime (optional)
   * Format: Y-m-d H:i:s
   * @example "2014-06-19 23:59:59"
   */
  end_time?: string;

  /**
   * Pagination offset (optional)
   */
  offset?: number;

  /**
   * Maximum number of results to retrieve (optional)
   */
  limit?: number;
}

/**
 * User recording data entry structure
 */
export interface UserRecordingData {
  /**
   * Recording ID
   */
  recording_id: number;

  /**
   * Lead ID
   */
  lead_id: number;

  /**
   * Start time timestamp
   */
  start_time: string;

  /**
   * End time timestamp
   */
  end_time: string;

  /**
   * Duration in seconds
   */
  seconds: number | null;

  /**
   * Recording file URL
   */
  url: string;
}

/**
 * Users recordings success response
 */
export interface UsersRecordingsResponseSuccess {
  /** Success status */
  success: true;

  /** Response data */
  data?: {
    /** Current offset */
    offset: number;

    /** Current limit */
    limit: number;

    /** Total number of recordings found */
    total: number;

    /** Array of recording entries */
    entries: UserRecordingData[];
  };
}

/**
 * Users recordings error definitions
 */
export type UsersRecordingsError =
  | { code: 6005; text: "Missing users" }
  | { code: 7231; text: "Invalid offset value" };

/**
 * Users recordings error response
 */
export type UsersRecordingsResponseError = ConvosoErrorResponse<UsersRecordingsError>;

/**
 * Users recordings response (discriminated union)
 */
export type UsersRecordingsResponse = UsersRecordingsResponseSuccess | UsersRecordingsResponseError;

/**
 * Parameters for searching users
 */
export interface UsersSearchParams extends Record<string, unknown> {
  /**
   * User's email, first name, or last name (optional)
   */
  user?: string;

  /**
   * Pagination offset (optional)
   */
  offset?: number;

  /**
   * Maximum number of results to retrieve (optional)
   */
  limit?: number;
}

/**
 * User data entry structure
 */
export interface UserData {
  /**
   * User ID
   */
  id: number;

  /**
   * ACL access profile
   */
  acl_access_profile: number;

  /**
   * User email
   */
  email: string;

  /**
   * First name
   */
  first_name: string;

  /**
   * Last name
   */
  last_name: string;

  /**
   * User level
   */
  user_level: number;

  /**
   * Queue override setting
   */
  queue_override: string;

  /**
   * Allow queue selection
   */
  allow_queue_selection: string;

  /**
   * Allow callbacks
   */
  allow_callbacks: string;

  /**
   * Callback types allowed
   */
  callback_types_allowed: string;

  /**
   * Allow transfers
   */
  allow_transfers: string;

  /**
   * Default blended selection
   */
  default_blended_selection: string;

  /**
   * Alter customer data override
   */
  alter_custdata_override: string;

  /**
   * User status
   */
  status: string;

  /**
   * Local GMT offset
   */
  local_gmt: string;

  /**
   * Allow blended campaign
   */
  allow_blended_campaign: string;

  /**
   * Notification setting
   */
  notification: string;

  /**
   * Created at timestamp
   */
  created_at: string;

  /**
   * Connection type
   */
  connection_type: string;

  /**
   * Extension numbers
   */
  extension: number[];

  /**
   * Last login timestamp
   */
  last_login: string | null;
}

/**
 * Users search success response
 */
export interface UsersSearchResponseSuccess {
  /** Success status */
  success: true;

  /** Response data */
  data?: {
    /** Current offset */
    offset: number;

    /** Current limit */
    limit: string;

    /** Total number of users found */
    total: string;

    /** User entries keyed by user ID */
    results: Record<string, UserData>;
  };
}

/**
 * Users search error definitions
 */
export type UsersSearchError =
  | { code: 6005; text: "Missing users" }
  | { code: 7231; text: "Invalid offset value" };

/**
 * Users search error response
 */
export type UsersSearchResponseError = ConvosoErrorResponse<UsersSearchError>;

/**
 * Users search response (discriminated union)
 */
export type UsersSearchResponse = UsersSearchResponseSuccess | UsersSearchResponseError;
