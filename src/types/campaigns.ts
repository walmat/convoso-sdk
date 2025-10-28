import type { ConvosoErrorResponse } from "./index.js";

/**
 * Campaign status values
 * - "Y" = Active
 * - "N" = Inactive
 */
export type CampaignStatus = "Y" | "N";

/**
 * Campaign status toggle values
 * - 0 = Deactivate campaign
 * - 1 = Activate campaign
 */
export type CampaignStatusToggle = 0 | 1;

/**
 * Campaign status request parameters
 */
export interface CampaignStatusParams extends Record<string, unknown> {
  /** Campaign ID (required) */
  campaign_id: string;

  /** Status to set: 0 = deactivate, 1 = activate (required) */
  status: CampaignStatusToggle;
}

/**
 * Campaign status success response
 */
export interface CampaignStatusResponseSuccess {
  /** Success status */
  success: true;
}

/**
 * Campaign status error definitions
 */
export type CampaignStatusError =
  | { code: 6004; text: "Unknown Campaign ID" }
  | { code: 6010; text: "Missing status" };

/**
 * Campaign status error response
 *
 * TypeScript will narrow the exact text when you check the code:
 * - If code === 6004, then text is "Unknown Campaign ID"
 * - If code === 6010, then text is "Missing status"
 */
export type CampaignStatusResponseError = ConvosoErrorResponse<CampaignStatusError>;

/**
 * Campaign status response (discriminated union)
 *
 * @example
 * ```typescript
 * const result = await client.campaigns.status({
 *   campaign_id: "3471",
 *   status: 1, // Activate
 * });
 *
 * if (result.success) {
 *   console.log("Campaign activated");
 * } else {
 *   if (result.code === 6004) {
 *     console.log(result.text); // ✅ Type is exactly "Unknown Campaign ID"
 *   }
 * }
 * ```
 */
export type CampaignStatusResponse = CampaignStatusResponseSuccess | CampaignStatusResponseError;

/**
 * Campaign date information
 */
export interface CampaignDate {
  /** Date string in format YYYY-MM-DD HH:MM:SS */
  date: string;

  /** Timezone type (typically 3 for named timezone) */
  timezone_type: number;

  /** Timezone identifier (e.g., "America/Los_Angeles") */
  timezone: string;
}

/**
 * Campaign data structure
 */
export interface CampaignData {
  /** Campaign ID */
  id: number;

  /** Campaign name */
  name: string;

  /** Campaign status: Y = Active, N = Inactive */
  status: CampaignStatus;

  /** Last call date with timezone info, or null if never called */
  last_call_date: CampaignDate | null;
}

/**
 * Campaign search response
 *
 * Note: This endpoint has no documented error cases.
 *
 * @example
 * ```typescript
 * const result = await client.campaigns.search();
 *
 * if (result.success) {
 *   result.data?.forEach(campaign => {
 *     console.log(`${campaign.name} (${campaign.status === "Y" ? "Active" : "Inactive"})`);
 *   });
 * }
 * ```
 */
export interface CampaignSearchResponse {
  /** Success status */
  success: true;

  /** Array of campaign records */
  data?: CampaignData[];
}
