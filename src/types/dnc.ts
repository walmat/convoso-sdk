import type { ConvosoErrorResponse } from "./index.js";

/**
 * DNC Insert request parameters
 */
export interface DncInsertParams extends Record<string, unknown> {
  /** DNC Phone Number (required) */
  phone_number: string;

  /** DNC phone code/country code (required) */
  phone_code: string;

  /** DNC Campaign ID - use "0" for Global (required) */
  campaign_id: string;

  /** DNC purpose */
  purpose:
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

  /** DNC reason */
  reason: "-BLANK-" | "-NOTBLANK-" | "DNC" | "DNCT" | "ConsentRevoked" | (string & {});
}

/**
 * DNC Insert success response
 */
export interface DncInsertResponseSuccess {
  /** Success status */
  success: true;
}

/**
 * DNC Insert error definitions
 */
export type DncInsertError =
  | { code: 6006; text: "Invalid Campaign ID" }
  | { code: 6007; text: "Invalid Phone Number" }
  | { code: 6008; text: "The phone number already exists" }
  | { code: 6026; text: "Missing or Invalid Country Code" }
  | { code: 6057; text: "Invalid Purpose Provided" }
  | { code: 6058; text: "Invalid Reason Provided" };

/**
 * DNC Insert error response
 */
export type DncInsertResponseError = ConvosoErrorResponse<DncInsertError>;

/**
 * DNC Insert response (discriminated union)
 */
export type DncInsertResponse = DncInsertResponseSuccess | DncInsertResponseError;

/**
 * DNC Update request parameters
 */
export interface DncUpdateParams extends Record<string, unknown> {
  /** DNC id (required) */
  id: number;

  /** DNC Phone Number (optional) */
  phone_number?: string;

  /** DNC Phone Code (optional) */
  phone_code?: string;

  /** DNC Campaign ID - use 0 for Global (optional) */
  campaign_id?: number;

  /** DNC purpose */
  purpose:
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

  /** DNC reason */
  reason: "-BLANK-" | "-NOTBLANK-" | "DNC" | "DNCT" | "ConsentRevoked" | (string & {});
}

/**
 * DNC Update success response
 */
export interface DncUpdateResponseSuccess {
  /** Success status */
  success: true;

  /** ID of the updated DNC record */
  id: number;
}

/**
 * DNC Update error definitions
 */
export type DncUpdateError =
  | { code: 6004; text: "Unknown Campaign ID" }
  | { code: 6008; text: "The phone number is invalid" }
  | { code: 6026; text: "Missing or Invalid Country Code" }
  | { code: 6056; text: "Missing or Invalid value for ID" }
  | { code: 6057; text: "Invalid Purpose Provided" }
  | { code: 6058; text: "Invalid Reason Provided" }
  | {
      code: 6059;
      text: "This combination of Phone number, Campaign ID, and Phone Code already exists.";
    };

/**
 * DNC Update error response
 */
export type DncUpdateResponseError = ConvosoErrorResponse<DncUpdateError>;

/**
 * DNC Update response (discriminated union)
 */
export type DncUpdateResponse = DncUpdateResponseSuccess | DncUpdateResponseError;

/**
 * DNC Delete request parameters
 */
export interface DncDeleteParams extends Record<string, unknown> {
  /** Phone Number (required) */
  phone_number: string;

  /** Phone Code (required) */
  phone_code: string;

  /** Campaign ID - use "0" for Global (required) */
  campaign_id: string;

  /** Update Lead Status (optional) */
  update_lead_status?: string;

  /** Lead Status (optional) */
  lead_status?: string;
}

/**
 * DNC Delete success response
 */
export interface DncDeleteResponseSuccess {
  /** Success status */
  success: true;
}

/**
 * DNC Delete error definitions
 */
export type DncDeleteError =
  | { code: 6000; text: "Missing Phone Code" }
  | { code: 6001; text: "Missing Campaign ID" }
  | { code: 6002; text: "Missing Phone Number" }
  | { code: 6003; text: "Phone Number Not Found" }
  | { code: 6004; text: "Invalid Lead status" }
  | { code: 6005; text: "Missing Lead status" };

/**
 * DNC Delete error response
 */
export type DncDeleteResponseError = ConvosoErrorResponse<DncDeleteError>;

/**
 * DNC Delete response (discriminated union)
 */
export type DncDeleteResponse = DncDeleteResponseSuccess | DncDeleteResponseError;

/**
 * DNC Search request parameters
 */
export interface DncSearchParams extends Record<string, unknown> {
  /** DNC id (optional) */
  id?: number;

  /** Campaign Id - use 0 for Global (optional) */
  campaign_id?: number;

  /** Phone Number (optional) */
  phone_number?: string;

  /** Phone code (optional) */
  phone_code?: string;

  /** DNC Insert Date in format YYYY-MM-DD hh:mm:ss (optional) */
  insert_date?: string;

  /** Row offset into DNC table (default: 0, max: 100000) */
  offset?: number;

  /** Max number of requested rows (default: 1000, max: 1000) */
  limit?: number;

  /** DNC purpose */
  purpose?:
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

  /** DNC reason */
  reason?: "-BLANK-" | "-NOTBLANK-" | "DNC" | "DNCT" | "ConsentRevoked" | (string & {});
}

/**
 * DNC entry data structure
 */
export interface DncData {
  /** DNC record ID */
  id: string;

  /** Phone number */
  phone_number: string;

  /** Campaign ID (0 = Global) */
  campaign_id: string;

  /** Insert date timestamp */
  insert_date: string;

  /** Phone code/country code
   * @example
   * ```typescript
   * const result = await client.dnc.search({
   *   phone_code: "+1",
   * });
   * ```
   */
  phone_code: string;

  /** Campaign UID */
  campaign_uid: string;

  /** Campaign name */
  campaign_name: string;

  /** Campaign type */
  campaign_type: string;

  /** DNC purpose */
  purpose:
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

  /** DNC reason */
  reason: "-BLANK-" | "-NOTBLANK-" | "DNC" | "DNCT" | "ConsentRevoked" | (string & {});
}

/**
 * DNC Search success response
 */
export interface DncSearchResponseSuccess {
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

    /** Array of DNC entries */
    entries: DncData[];
  };
}

/**
 * DNC Search error definitions
 */
export type DncSearchError =
  | { code: 6006; text: "Invalid Campaign ID" }
  | { code: 7231; text: "Invalid offset value" }
  | { code: 6008; text: "The phone number already exists" }
  | { code: 6026; text: "Missing or Invalid Country Code" }
  | { code: 6057; text: "Invalid Purpose Provided" }
  | { code: 6058; text: "Invalid Reason Provided" };

/**
 * DNC Search error response
 */
export type DncSearchResponseError = ConvosoErrorResponse<DncSearchError>;

/**
 * DNC Search response (discriminated union)
 *
 * @example
 * ```typescript
 * const result = await client.dnc.search({
 *   campaign_id: 0, // Global DNC
 *   limit: 100,
 * });
 *
 * if (result.success) {
 *   console.log(result.data?.entries); // ✅ Valid
 * } else {
 *   if (result.code === 7231) {
 *     console.log(result.text); // ✅ Type is exactly "Invalid offset value"
 *   }
 * }
 * ```
 */
export type DncSearchResponse = DncSearchResponseSuccess | DncSearchResponseError;
