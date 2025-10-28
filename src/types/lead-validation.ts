import type { ConvosoErrorResponse } from "./index.js";

/**
 * Lead Validation search request parameters
 */
export interface LeadValidationSearchParams extends Record<string, unknown> {
  /** The unique identifier for the criteria to be applied to the request (required) */
  criteria_key: string;

  /** The phone number of the lead (required) */
  phone_number: string;

  /** The two character state code of the prospective lead (optional, e.g. CA) */
  state?: string;

  /** The five digit postal code for the prospective lead (optional) */
  postal_code?: string;
}

/**
 * Lead Validation search success response
 */
export interface LeadValidationSearchResponseSuccess {
  /** Success status */
  success: true;

  /** Validation result */
  result: string;
}

/**
 * Lead Validation search error response
 *
 * This endpoint has no specific error codes - only the global 403 Forbidden
 * error can occur when the API key lacks permission.
 */
export type LeadValidationSearchResponseError = ConvosoErrorResponse<never>;

/**
 * Lead Validation search response (discriminated union)
 */
export type LeadValidationSearchResponse =
  | LeadValidationSearchResponseSuccess
  | LeadValidationSearchResponseError;
