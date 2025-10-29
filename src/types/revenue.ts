import type { ConvosoErrorResponse } from "./index.js";

/**
 * Parameters for updating revenue
 */
export interface RevenueUpdateParams extends Record<string, unknown> {
  /**
   * Call Log's ID (required)
   */
  call_log_id: string;

  /**
   * Revenue amount (optional)
   */
  revenue?: number;

  /**
   * Return flag - 0 or 1 (optional)
   */
  return?: number;
}

/**
 * Revenue update success response
 */
export interface RevenueUpdateResponseSuccess {
  /** Success status */
  success: true;

  /** Response data */
  data: {
    /**
     * Call Log ID that was updated
     */
    call_log_id: string;
  };
}

/**
 * Revenue update error definitions
 */
export type RevenueUpdateError =
  | { code: 6032; text: "Missing Call Log ID" }
  | { code: 6033; text: "No such Call Log" }
  | { code: 6036; text: "Either Revenue or Return need to have value" };

/**
 * Revenue update error response
 */
export type RevenueUpdateResponseError = ConvosoErrorResponse<RevenueUpdateError>;

/**
 * Revenue update response (discriminated union)
 */
export type RevenueUpdateResponse = RevenueUpdateResponseSuccess | RevenueUpdateResponseError;
