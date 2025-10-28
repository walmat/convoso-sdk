import type { ConvosoErrorResponse } from "./index.js";

/**
 * Callback recipient types
 */
export type CallbackRecipient = "System" | "Personal";

/**
 * Callback stage status
 */
export type CallbackStage = "COMPLETED" | "PAST_DUE" | "PENDING" | "DISMISSED";

/**
 * Insert Callback request parameters
 */
export interface CallbackInsertParams extends Record<string, unknown> {
  /** Lead ID (required) */
  lead_id: string | number;

  /** Recipient type: System or Personal (required) */
  recipient: CallbackRecipient;

  /** Callback time zone (required) */
  callback_time_zone: string;

  /** Callback time in format YYYY-MM-DD HH:MM:SS (required) */
  callback_time: string;

  /** User ID (optional) */
  user_id?: string | number;

  /** Comments (optional) */
  comments?: string;
}

/**
 * Insert Callback success response
 */
export interface CallbackInsertResponseSuccess {
  /** Success status */
  success: true;

  /** Response data */
  data?: {
    /** ID of the created callback */
    callback_id: string;
  };
}

/**
 * Insert Callback error definitions
 */
export type CallbackInsertError =
  | { code: 6038; text: "No such Callback" }
  | { code: 6001; text: "No such Lead" }
  | { code: 6006; text: "No such User" }
  | { code: 6023; text: "Required fields are missed" }
  | { code: 7237; text: "Invalid callback_time" };

/**
 * Insert Callback error response
 */
export type CallbackInsertResponseError = ConvosoErrorResponse<CallbackInsertError>;

/**
 * Insert Callback response (discriminated union)
 */
export type CallbackInsertResponse = CallbackInsertResponseSuccess | CallbackInsertResponseError;

/**
 * Update Callback request parameters
 */
export interface CallbackUpdateParams extends Record<string, unknown> {
  /** Callback ID (required) */
  callback_id: string | number;

  /** User ID (optional) */
  user_id?: string | number;

  /** Recipient type: System or Personal (optional) */
  recipient?: CallbackRecipient;

  /** Comments (optional) */
  comments?: string;

  /** Callback time zone (optional) */
  callback_time_zone?: string;

  /** Callback time in format YYYY-MM-DD HH:MM:SS (optional) */
  callback_time?: string;

  /** Status - use "Dismissed" to dismiss callback (optional) */
  status?: string;
}

/**
 * Update Callback success response
 */
export interface CallbackUpdateResponseSuccess {
  /** Success status */
  success: true;

  /** Response data */
  data?: {
    /** ID of the updated callback */
    callback_id: string;
  };
}

/**
 * Update Callback error definitions
 */
export type CallbackUpdateError =
  | { code: 6006; text: "No such User" }
  | { code: 6023; text: "Required fields are missed" }
  | { code: 6038; text: "No such Callback" }
  | { code: 7237; text: "Invalid callback_time" };

/**
 * Update Callback error response
 */
export type CallbackUpdateResponseError = ConvosoErrorResponse<CallbackUpdateError>;

/**
 * Update Callback response (discriminated union)
 */
export type CallbackUpdateResponse = CallbackUpdateResponseSuccess | CallbackUpdateResponseError;

/**
 * Delete Callback request parameters
 */
export interface CallbackDeleteParams extends Record<string, unknown> {
  /** Callback ID (required) */
  callback_id: string | number;
}

/**
 * Delete Callback success response
 */
export interface CallbackDeleteResponseSuccess {
  /** Success status */
  success: true;
}

/**
 * Delete Callback error definitions
 */
export type CallbackDeleteError = { code: 6038; text: "No such Callback" };

/**
 * Delete Callback error response
 */
export type CallbackDeleteResponseError = ConvosoErrorResponse<CallbackDeleteError>;

/**
 * Delete Callback response (discriminated union)
 */
export type CallbackDeleteResponse = CallbackDeleteResponseSuccess | CallbackDeleteResponseError;

/**
 * Search Callbacks request parameters
 */
export interface CallbackSearchParams extends Record<string, unknown> {
  /** Campaign ID (optional) */
  campaign_id?: string | number;

  /** Comments filter (optional) */
  comments?: string;

  /** Callback ID (optional) */
  id?: number;

  /** Lead ID (optional) */
  lead_id?: number;

  /** List ID (optional) */
  list_id?: number;

  /** Recipient filter: System or Personal (optional) */
  recipient?: CallbackRecipient;

  /** User ID (optional) */
  user_id?: string | number;

  /** Stage filter: COMPLETED, PAST_DUE, PENDING, DISMISSED (optional) */
  stage?: CallbackStage;

  /** Pagination offset (default: 0, max: 50000) */
  offset?: number;

  /** Maximum results to return (default: 20, max: 5000) */
  limit?: number;

  /** Start date filter in format YYYY-MM-DD (optional) */
  start_date?: string;

  /** End date filter in format YYYY-MM-DD (optional) */
  end_date?: string;
}

/**
 * Callback data structure
 */
export interface CallbackData {
  /** Callback ID */
  id: string;

  /** Lead ID */
  lead_id: string;

  /** List ID */
  list_id: string;

  /** Campaign ID */
  campaign_id: string;

  /** Status */
  status: string;

  /** Created timestamp */
  created_at: string;

  /** Callback scheduled time */
  callback_time: string;

  /** Last modified timestamp */
  modified_at: string;

  /** User ID */
  user: string;

  /** Recipient type */
  recipient: string;

  /** Comments */
  comments: string;

  /** Context */
  context: string;

  /** Callback seen timestamp */
  callback_seen: string;

  /** Phone number */
  phone_number: string;

  /** Stage */
  stage: string;

  /** CSS class for stage */
  class: string;

  /** User name */
  user_name: string;

  /** Directory/List name */
  directory_name: string;

  /** Campaign name */
  campaign_name: string;

  /** Campaign type */
  campaign_type: string;

  /** Status name */
  status_name: string;
}

/**
 * Search Callbacks success response
 */
export interface CallbackSearchResponseSuccess {
  /** Success status */
  success: true;

  /** Response data */
  data?: {
    /** Pagination offset */
    offset: number;

    /** Results limit */
    limit: number;

    /** Total number of callbacks */
    total: number;

    /** Array of callback records */
    results: CallbackData[];
  };
}

/**
 * Search Callbacks error definitions
 */
export type CallbackSearchError =
  | { code: 6000; text: "Missing callbacks" }
  | { code: 7231; text: "Invalid offset value" };

/**
 * Search Callbacks error response
 */
export type CallbackSearchResponseError = ConvosoErrorResponse<CallbackSearchError>;

/**
 * Search Callbacks response (discriminated union)
 *
 * @example
 * ```typescript
 * const response = await client.callbacks.search({
 *   stage: "PENDING",
 *   limit: 100,
 * });
 *
 * if (response.success) {
 *   console.log(response.data?.results); // ✅ Valid
 * } else {
 *   if (response.code === 6000) {
 *     console.log(response.text); // ✅ Type is exactly "Missing callbacks"
 *   } else if (response.code === 7231) {
 *     console.log(response.text); // ✅ Type is exactly "Invalid offset value"
 *   }
 * }
 * ```
 */
export type CallbackSearchResponse = CallbackSearchResponseSuccess | CallbackSearchResponseError;
