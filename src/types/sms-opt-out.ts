import type { ConvosoErrorResponse } from "./index.js";

/**
 * SMS Opt-Out purpose values
 * Shared with DNC purpose values
 */
export type SmsOptOutPurpose =
  | "-BLANK-"
  | "-NOTBLANK-"
  | "COLLECT"
  | "COMMNOTM"
  | "CONFIRM"
  | "ESIGN"
  | "HIPAA"
  | "INFORM"
  | "NONCOMM"
  | "NONPROF"
  | "NOTFOUND"
  | "NOTIFY"
  | "TELEMKT"
  | "VERIFY"
  | (string & {});

/**
 * SMS Opt-Out reason values
 * Shared with DNC reason values
 */
export type SmsOptOutReason =
  | "-BLANK-"
  | "-NOTBLANK-"
  | "DNC"
  | "DNCT"
  | "ConsentRevoked"
  | (string & {});

/**
 * Parameters for inserting a new SMS Opt-Out record
 */
export interface SmsOptOutInsertParams extends Record<string, unknown> {
  /**
   * SMS Opt-Out Phone Number (required)
   */
  phone_number: string;

  /**
   * SMS Opt-Out phone code/country code (required)
   */
  phone_code: string;

  /**
   * SMS Opt-Out Campaign ID - use "0" for Global (required)
   */
  campaign_id: string;

  /**
   * SMS Opt-Out reason (optional)
   */
  reason?: SmsOptOutReason;

  /**
   * SMS Opt-Out purpose (optional)
   */
  purpose?: SmsOptOutPurpose;
}

/**
 * SMS Opt-Out insert success response
 */
export interface SmsOptOutInsertResponseSuccess {
  /** Success status */
  success: true;
}

/**
 * SMS Opt-Out insert error definitions
 */
export type SmsOptOutInsertError =
  | { code: 6006; text: "Invalid Campaign ID" }
  | { code: 6007; text: "Invalid Phone Number" }
  | { code: 6008; text: "The phone number already exists" }
  | { code: 6026; text: "Missing or Invalid Country Code" }
  | { code: 6057; text: "Invalid Purpose Provided" }
  | { code: 6058; text: "Invalid Reason Provided" };

/**
 * SMS Opt-Out insert error response
 */
export type SmsOptOutInsertResponseError = ConvosoErrorResponse<SmsOptOutInsertError>;

/**
 * SMS Opt-Out insert response (discriminated union)
 */
export type SmsOptOutInsertResponse = SmsOptOutInsertResponseSuccess | SmsOptOutInsertResponseError;

/**
 * Parameters for updating an SMS Opt-Out record
 */
export interface SmsOptOutUpdateParams extends Record<string, unknown> {
  /**
   * Record ID (required)
   */
  id: number;

  /**
   * Campaign ID - use 0 for Global (optional)
   */
  campaign_id?: number;

  /**
   * Phone Code (optional)
   */
  phone_code?: string;

  /**
   * Phone Number (optional)
   */
  phone_number?: string;

  /**
   * SMS Opt-Out Reason
   * Use '-BLANK-' to set records with empty reason (optional)
   */
  reason?: SmsOptOutReason;

  /**
   * SMS Opt-Out Purpose
   * Use '-BLANK-' to set records with empty purpose (optional)
   */
  purpose?: SmsOptOutPurpose;
}

/**
 * SMS Opt-Out update success response
 */
export interface SmsOptOutUpdateResponseSuccess {
  /** Success status */
  success: true;

  /** Response data */
  data: {
    /**
     * ID of the updated record
     */
    id: string;
  };
}

/**
 * SMS Opt-Out update error definitions
 */
export type SmsOptOutUpdateError =
  | { code: 6004; text: "Unknown Campaign ID" }
  | { code: 6008; text: "The phone number is invalid" }
  | { code: 6026; text: "Missing or Invalid Country Code" }
  | { code: 6056; text: "Missing or Invalid value for ID" }
  | { code: 6057; text: "Invalid Purpose Provided" }
  | { code: 6058; text: "Invalid Reason Provided" }
  | {
      code: 6059;
      text: "This combination of Phone number, Campaign ID, and Phone Code already exists.";
    }
  | { code: 4001; text: "Missing required field: phone_number / phone_code / campaign_id." }
  | { code: 4002; text: "phone_number / phone_code / campaign_id must be numeric." };

/**
 * SMS Opt-Out update error response
 */
export type SmsOptOutUpdateResponseError = ConvosoErrorResponse<SmsOptOutUpdateError>;

/**
 * SMS Opt-Out update response (discriminated union)
 */
export type SmsOptOutUpdateResponse = SmsOptOutUpdateResponseSuccess | SmsOptOutUpdateResponseError;

/**
 * Parameters for searching SMS Opt-Out records
 */
export interface SmsOptOutSearchParams extends Record<string, unknown> {
  /**
   * SMS Opt-Out id (optional)
   */
  id?: number;

  /**
   * Campaign ID - use 0 for Global (optional)
   */
  campaign_id?: number;

  /**
   * Phone Number (optional)
   */
  phone_number?: string;

  /**
   * Phone code (optional)
   */
  phone_code?: string;

  /**
   * SMS Opt-Out reason
   * Use '-BLANK-' or '-NOTBLANK-' to get records with empty or non-empty reason (optional)
   */
  Reason?: SmsOptOutReason;

  /**
   * SMS Opt-Out purpose
   * Use '-BLANK-' or '-NOTBLANK-' to get records with empty or non-empty purpose (optional)
   */
  Purpose?: SmsOptOutPurpose;

  /**
   * SMS Opt-Out Insert Date in format YYYY-MM-DD hh:mm:ss (optional)
   */
  insert_date?: string;

  /**
   * Row offset into SMS Opt-Out table (default: 0, max: 100000)
   */
  offset?: number;

  /**
   * Max number of requested rows (default: 1000, max: 1000)
   */
  limit?: number;
}

/**
 * SMS Opt-Out entry data structure
 */
export interface SmsOptOutData {
  /**
   * SMS Opt-Out record ID
   */
  id: string;

  /**
   * Phone number
   */
  phone_number: string;

  /**
   * Campaign ID (0 = Global)
   */
  campaign_id: string;

  /**
   * SMS Opt-Out reason
   */
  reason: string;

  /**
   * SMS Opt-Out purpose
   */
  Purpose: string;

  /**
   * Insert date timestamp
   */
  insert_date: string;

  /**
   * Phone code/country code
   */
  phone_code: string;

  /**
   * Campaign UID
   */
  campaign_uid: string;

  /**
   * Campaign name
   */
  campaign_name: string;
}

/**
 * SMS Opt-Out search success response
 */
export interface SmsOptOutSearchResponseSuccess {
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

    /** Array of SMS Opt-Out entries */
    entries: SmsOptOutData[];
  };
}

/**
 * SMS Opt-Out search error definitions
 */
export type SmsOptOutSearchError =
  | { code: 6006; text: "Invalid Campaign ID" }
  | { code: 7231; text: "Invalid offset value" }
  | { code: 6008; text: "The phone number already exists" }
  | { code: 6026; text: "Missing or Invalid Country Code" }
  | { code: 6057; text: "Invalid Purpose Provided" }
  | { code: 6058; text: "Invalid Reason Provided" };

/**
 * SMS Opt-Out search error response
 */
export type SmsOptOutSearchResponseError = ConvosoErrorResponse<SmsOptOutSearchError>;

/**
 * SMS Opt-Out search response (discriminated union)
 */
export type SmsOptOutSearchResponse = SmsOptOutSearchResponseSuccess | SmsOptOutSearchResponseError;
