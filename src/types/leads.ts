import type { ConvosoErrorResponse } from "./index.js";

/**
 * Leads insert request parameters
 */
export interface LeadsInsertParams extends Record<string, unknown> {
  /** List's ID (required) */
  list_id: number;

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

  /**
   * Check for duplicates (optional)
   * - Pass 1 or true: check duplicates against entire account
   * - Pass 2: check duplicates in the list where lead is being entered
   * - Pass 3: check duplicates across the Campaign that the lead is assigned to
   */
  check_dup?: number;

  /**
   * Whether to check for duplicate lead phone number in Archived Leads (optional)
   * Note: check_dup should be enabled, filter is applied across entire account
   */
  check_dup_archive?: boolean;

  /**
   * Whether to check the lead phone number for Do Not Call (DNC) list (optional)
   * Only if campaign set to "Ignore rules/filters and insert into hopper to dial immediately"
   */
  check_dnc?: boolean;

  /** Whether to check the lead phone number for Wireless list (optional) */
  check_wireless?: boolean;

  /** Whether to insert the lead into the Hopper (optional) */
  hopper?: boolean;

  /**
   * Hopper priority level (optional)
   * Value range: 0 to 99, default: 99
   */
  hopper_priority?: number;

  /**
   * In how many minutes hopper will be expired (optional)
   * Max value: 300
   */
  hopper_expires_in?: number;

  /**
   * Token used to fetch the lead's phone number from Blue Ink Digital (optional)
   * Requirement: dedicated form field needed before using this integration
   */
  blueinkdigital_token?: string;

  /**
   * Reject leads based on one or more carrier types (optional)
   * Values: MOBILE, VOIP, LANDLINE (can be comma-separated, e.g., "MOBILE,VOIP")
   */
  reject_by_carrier_type?: string;

  /**
   * Strip the country code from primary phone number and place into phone_code field (optional)
   * Commonly used if phone number passed to API contains the country code
   */
  filter_phone_code?: boolean;

  /** Whether to insert as new contact or update if Lead ID or Phone Number found (optional) */
  update_if_found?: boolean;

  /** The Campaign ID to search within when update_if_found is true (optional) */
  search_campaign_id?: number;

  /**
   * The List ID to search within when update_if_found is true (optional)
   * Takes priority over search_campaign_id if both are passed
   */
  search_list_id?: number;

  /**
   * In case duplicate is found, find the Phone Number by order of Last Called Time (optional)
   * Values: ASC or DESC
   */
  update_order_by_last_called_time?: string;

  /** Lead ID (optional) */
  lead_id?: number;
}

/**
 * Leads insert success response
 */
export interface LeadsInsertResponseSuccess {
  /** Success status */
  success: true;

  /** Response data */
  data: {
    /** Created or updated lead ID */
    lead_id: string;
  };
}

/**
 * Leads insert error definitions
 */
export type LeadsInsertError =
  | { code: 6002; text: "No such List" }
  | { code: 6006; text: "No such User" }
  | { code: 6007; text: "The Lead requires a phone number and list id" }
  | { code: 6008; text: "The phone number is invalid" }
  | { code: 6009; text: "The phone number already exists" }
  | { code: 6023; text: "Required fields are missed" }
  | { code: 6079; text: "Invalid Email(s)" };

/**
 * Leads insert error response
 */
export type LeadsInsertResponseError = ConvosoErrorResponse<LeadsInsertError>;

/**
 * Leads insert response (discriminated union)
 */
export type LeadsInsertResponse = LeadsInsertResponseSuccess | LeadsInsertResponseError;

/**
 * Leads update request parameters
 */
export interface LeadsUpdateParams extends Record<string, unknown> {
  /** Lead's ID (required) */
  lead_id: number;

  /** List's ID (optional) */
  list_id?: number;

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

  /** Primary Phone (optional) */
  phone_number?: string;

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
 * Leads update success response
 */
export interface LeadsUpdateResponseSuccess {
  /** Success status */
  success: true;

  /** Response data */
  data: {
    /** Updated lead ID */
    lead_id: string;
  };
}

/**
 * Leads update error definitions
 */
export type LeadsUpdateError =
  | { code: 6001; text: "No such Lead" }
  | { code: 6002; text: "No such List" }
  | { code: 6006; text: "No such User" }
  | { code: 6008; text: "The phone number is invalid" }
  | { code: 6079; text: "Invalid Email(s)" };

/**
 * Leads update error response
 */
export type LeadsUpdateResponseError = ConvosoErrorResponse<LeadsUpdateError>;

/**
 * Leads update response (discriminated union)
 */
export type LeadsUpdateResponse = LeadsUpdateResponseSuccess | LeadsUpdateResponseError;

/**
 * Leads delete request parameters
 */
export interface LeadsDeleteParams extends Record<string, unknown> {
  /** Lead's ID (required) */
  lead_id: number;
}

/**
 * Leads delete success response
 */
export interface LeadsDeleteResponseSuccess {
  /** Success status */
  success: true;
}

/**
 * Leads delete error definitions
 */
export type LeadsDeleteError = { code: 6001; text: "No such Lead" };

/**
 * Leads delete error response
 */
export type LeadsDeleteResponseError = ConvosoErrorResponse<LeadsDeleteError>;

/**
 * Leads delete response (discriminated union)
 */
export type LeadsDeleteResponse = LeadsDeleteResponseSuccess | LeadsDeleteResponseError;

/**
 * Leads search request parameters
 */
export interface LeadsSearchParams extends Record<string, unknown> {
  /** Lead's ID (optional, searchable) */
  lead_id?: number;

  /** List's ID (optional, searchable) */
  list_id?: number;

  /** User's ID (optional, searchable) */
  user_id?: string;

  /** Owner's ID (optional, searchable) */
  owner_id?: string;

  /** Lead's status (optional, searchable) */
  status?: string;

  /** Created By (optional, searchable) */
  created_by?: string;

  /** Email (optional, searchable) */
  email?: string;

  /** Last Modified By (optional, searchable) */
  last_modified_by?: string;

  /** First Name (optional, searchable) */
  first_name?: string;

  /** Last Name (optional, searchable) */
  last_name?: string;

  /** Primary Phone (optional, searchable) */
  phone_number?: string;

  /** Cell Phone (optional, searchable) */
  alt_phone_1?: string;

  /** Work Phone (optional, searchable) */
  alt_phone_2?: string;

  /** Address 1 (optional, searchable) */
  address1?: string;

  /** Address 2 (optional, searchable) */
  address2?: string;

  /** City (optional, searchable) */
  city?: string;

  /** State (optional, searchable) */
  state?: string;

  /** Province (optional, searchable) */
  province?: string;

  /** Postal Code (optional, searchable) */
  postal_code?: string;

  /** Country (optional, searchable) */
  country?: string;

  /** Gender (optional, searchable) */
  gender?: string;

  /** Date Of Birth (optional, searchable) */
  date_of_birth?: string;

  /** Created At Start Date (optional, searchable, format: 2019-01-01 00:00:00) */
  created_at_start_date?: string;

  /** Created At End Date (optional, searchable, format: 2019-01-01 23:59:59) */
  created_at_end_date?: string;

  /** Updated At Start Date (optional, searchable, format: 2019-01-01 00:00:00) */
  updated_at_start_date?: string;

  /** Updated At End Date (optional, searchable, format: 2019-01-01 23:59:59) */
  updated_at_end_date?: string;

  /** Deleted At Start Date (optional, searchable, format: 2019-01-01 00:00:00) */
  deleted_at_start?: string;

  /** Deleted At End Date (optional, searchable, format: 2019-01-01 23:59:59) */
  deleted_at_end?: string;

  /** Archived At Start Date (optional, searchable, format: 2019-01-01 00:00:00) */
  archived_at_start?: string;

  /** Archived At End Date (optional, searchable, format: 2019-01-01 23:59:59) */
  archived_at_end?: string;

  /** Last Call Start Date (optional, searchable, format: 2019-01-01 00:00:00) */
  last_call_start_date?: string;

  /** Last Call End Date (optional, searchable, format: 2019-01-01 23:59:59) */
  last_call_end_date?: string;

  /** Notes (non-searchable) */
  notes?: string;

  /** Carrier and Plan 1 (non-searchable) */
  carrier_and_plan_1?: string;

  /** Carrier and Plan 2 (non-searchable) */
  carrier_and_plan_2?: string;

  /** Carrier and Plan 3 (non-searchable) */
  carrier_and_plan_3?: string;

  /** Carrier and Plan 4 (non-searchable) */
  carrier_and_plan_4?: string;

  /** Individual or Family (non-searchable) */
  individual_or_family?: string;

  /** Current Coverage (non-searchable) */
  current_coverage?: string;

  /** Pagination offset (optional) */
  offset?: number;

  /** Maximum number of results to retrieve (optional, max: 2000) */
  limit?: number;
}

/**
 * Lead data entry structure
 */
export interface LeadData {
  /** Lead ID */
  id: string;

  /** Created at timestamp */
  created_at: string;

  /** Modified at timestamp */
  modified_at: string;

  /** First name */
  first_name: string;

  /** Last name */
  last_name: string;

  /** Email address */
  email: string;

  /** Lead status */
  status: string;

  /** User ID */
  user_id: string;

  /** Owner ID */
  owner_id: string;

  /** Source ID */
  source_id: string;

  /** List ID */
  list_id: string;

  /** Phone code */
  phone_code: string;

  /** Phone number */
  phone_number: string;

  /** Alternate phone 1 */
  alt_phone_1: string;

  /** Alternate phone 2 */
  alt_phone_2: string;

  /** Address line 1 */
  address1: string;

  /** Address line 2 */
  address2: string;

  /** City */
  city: string;

  /** State */
  state: string;

  /** Province */
  province: string;

  /** Postal code */
  postal_code: string;

  /** Country */
  country: string;

  /** Gender */
  gender: string;

  /** Date of birth */
  date_of_birth?: string;

  /** Notes */
  notes?: string;

  /** Carrier and Plan 1 */
  carrier_and_plan_1?: string;

  /** Carrier and Plan 2 */
  carrier_and_plan_2?: string;

  /** Carrier and Plan 3 */
  carrier_and_plan_3?: string;

  /** Carrier and Plan 4 */
  carrier_and_plan_4?: string;

  /** Individual or Family */
  individual_or_family?: string;

  /** Current Coverage */
  current_coverage?: string;

  /** Additional fields returned by the API */
  [key: string]: unknown;
}

/**
 * Leads search success response
 */
export interface LeadsSearchResponseSuccess {
  /** Success status */
  success: true;

  /** Response data */
  data?: {
    /** Current offset */
    offset: number;

    /** Current limit */
    limit: number;

    /** Total number of records found */
    total: number;

    /** Array of lead entries */
    entries: LeadData[];
  };
}

/**
 * Leads search error definitions
 */
export type LeadsSearchError =
  | { code: 6000; text: "Missing lists" }
  | { code: 7230; text: "Invalid limit value" }
  | { code: 7231; text: "Invalid offset value" };

/**
 * Leads search error response
 */
export type LeadsSearchResponseError = ConvosoErrorResponse<LeadsSearchError>;

/**
 * Leads search response (discriminated union)
 */
export type LeadsSearchResponse = LeadsSearchResponseSuccess | LeadsSearchResponseError;

/**
 * Lead recordings request parameters
 */
export interface LeadRecordingsParams extends Record<string, unknown> {
  /** Lead's ID (required) */
  lead_id: number;

  /** Start datetime (optional, format: Y-m-d H:i:s) */
  start_time?: string;

  /** End datetime (optional, format: Y-m-d H:i:s) */
  end_time?: string;

  /** Pagination offset (optional) */
  offset?: number;

  /** Maximum number of results to retrieve (optional) */
  limit?: number;
}

/**
 * Lead recording data entry structure
 */
export interface LeadRecordingData {
  /** Recording ID */
  recording_id: number;

  /** Lead ID */
  lead_id: number;

  /** Start time timestamp */
  start_time: string;

  /** End time timestamp */
  end_time: string;

  /** Duration in seconds */
  seconds: number;

  /** Recording file URL */
  url: string;
}

/**
 * Lead recordings success response
 */
export interface LeadRecordingsResponseSuccess {
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
    entries: LeadRecordingData[];
  };
}

/**
 * Lead recordings error definitions
 */
export type LeadRecordingsError =
  | { code: 6005; text: "Missing users" }
  | { code: 7231; text: "Invalid offset value" };

/**
 * Lead recordings error response
 */
export type LeadRecordingsResponseError = ConvosoErrorResponse<LeadRecordingsError>;

/**
 * Lead recordings response (discriminated union)
 */
export type LeadRecordingsResponse = LeadRecordingsResponseSuccess | LeadRecordingsResponseError;
