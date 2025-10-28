import type { ConvosoErrorResponse } from "./index.js";

/**
 * Lead Post insert request parameters
 */
export interface LeadPostInsertParams extends Record<string, unknown> {
  /** The unique identifier for the criteria to be applied to the request (required) */
  criteria_key: string;

  /** Primary Phone (required) */
  phone_number: string;

  /** Lead's phone code (optional, default: 1) */
  phone_code?: string;

  /** Lead's status (optional) */
  status?: string;

  /** Created By (optional) */
  created_by?: string;

  /** Email (optional) */
  email?: string;

  /** Last Modified By (optional) */
  last_modified_by?: string;

  /** Lead Owner (optional) */
  owner_id?: string;

  /** First Name (optional) */
  first_name?: string;

  /** Last Name (optional) */
  last_name?: string;

  /** Cell Phone (optional) */
  alt_phone_1?: string;

  /** Work Phone (optional) */
  alt_phone_2?: string;

  /** Address 1 (optional) */
  address1?: string;

  /** Address 2 (optional) */
  address2?: string;

  /** City (optional) */
  city?: string;

  /** State (optional) */
  state?: string;

  /** Province (optional) */
  province?: string;

  /** Postal Code (optional) */
  postal_code?: string;

  /** Country (optional) */
  country?: string;

  /** Gender (optional) */
  gender?: string;

  /** Date Of Birth (optional) */
  date_of_birth?: string;

  /** Notes (optional) */
  notes?: string;

  /** Carrier and Plan 1 (optional) */
  carrier_and_plan_1?: string;

  /** Carrier and Plan 2 (optional) */
  carrier_and_plan_2?: string;

  /** Carrier and Plan 3 (optional) */
  carrier_and_plan_3?: string;

  /** Carrier and Plan 4 (optional) */
  carrier_and_plan_4?: string;

  /** Individual or Family (optional) */
  individual_or_family?: string;

  /** Current Coverage (optional) */
  current_coverage?: string;
}

/**
 * Lead Post insert success response
 */
export interface LeadPostInsertResponseSuccess {
  /** Success status */
  success: true;

  /** Response data */
  data: {
    /** Created lead ID */
    lead_id: string;
  };
}

/**
 * Lead Post insert error response
 *
 * This endpoint has no specific error codes - only the global 403 Forbidden
 * error can occur when the API key lacks permission.
 */
export type LeadPostInsertResponseError = ConvosoErrorResponse<never>;

/**
 * Lead Post insert response (discriminated union)
 */
export type LeadPostInsertResponse = LeadPostInsertResponseSuccess | LeadPostInsertResponseError;
