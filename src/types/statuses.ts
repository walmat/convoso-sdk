import type { ConvosoErrorResponse } from "./index.js";

/**
 * Y/N enum for status boolean flags
 */
export type YesNo = "Y" | "N";

/**
 * Parameters for inserting a new status
 */
export interface StatusesInsertParams extends Record<string, unknown> {
  /**
   * Status Abbreviation, only Alphanumeric characters allowed
   * Must be between 2-6 characters long (required)
   */
  status: string;

  /**
   * Status name (required)
   */
  name: string;

  /**
   * Hex color (optional)
   * Do not include #, valid example: 6711d1
   */
  hex_color?: string;

  /**
   * Final Option (required)
   * Y for Yes or N for No
   */
  final: YesNo;

  /**
   * Reached Option (required)
   * Y for Yes or N for No
   */
  reached: YesNo;

  /**
   * Success Option (required)
   * Y for Yes or N for No
   */
  success: YesNo;

  /**
   * DNC Option (required)
   * Y for Yes or N for No
   */
  dnc: YesNo;

  /**
   * Callback Option (required)
   * Y for Yes or N for No
   */
  callback: YesNo;

  /**
   * Contact Option (required)
   * Y for Yes or N for No
   */
  contact: YesNo;

  /**
   * Voicemail Option (required)
   * Y for Yes or N for No
   */
  voicemail: YesNo;
}

/**
 * Statuses insert success response
 */
export interface StatusesInsertResponseSuccess {
  /** Success status */
  success: true;

  /** HTTP status code */
  code: number;

  /** Response data */
  data: {
    /**
     * Whether this is a new status ("1") or existing
     */
    new: string;

    /**
     * Status abbreviation that was created
     */
    status: string;
  };
}

/**
 * Statuses insert error definitions
 */
export type StatusesInsertError =
  | { code: 6060; text: "Missing Status Description" }
  | {
      code: 6061;
      text: "Missing or Invalid Status Abbreviation, only Alphanumeric characters allowed. Must be between 2-6 characters long.";
    }
  | { code: 6062; text: "Missing or Invalid Final option, Must be Y for Yes or N for No." }
  | { code: 6063; text: "Missing or Invalid Reached option, Must be Y for Yes or N for No." }
  | { code: 6064; text: "Missing or Invalid Success option, Must be Y for Yes or N for No." }
  | { code: 6065; text: "Missing or Invalid DNC option, Must be Y for Yes or N for No." }
  | { code: 6066; text: "Missing or Invalid Callback option, Must be Y for Yes or N for No." }
  | { code: 6067; text: "Missing or Invalid Contact option, Must be Y for Yes or N for No." }
  | { code: 6068; text: "Missing or Invalid Voicemail option, Must be Y for Yes or N for No." }
  | { code: 6078; text: "HEX color defined is invalid, do not include #, valid example: 6711d1." };

/**
 * Statuses insert error response
 */
export type StatusesInsertResponseError = ConvosoErrorResponse<StatusesInsertError>;

/**
 * Statuses insert response (discriminated union)
 */
export type StatusesInsertResponse = StatusesInsertResponseSuccess | StatusesInsertResponseError;

/**
 * Parameters for updating a status
 */
export interface StatusesUpdateParams extends Record<string, unknown> {
  /**
   * Status Abbreviation (required)
   */
  status: string;

  /**
   * Status name (optional)
   */
  name?: string;

  /**
   * Hex color (optional)
   * Do not include #, valid example: 6711d1
   */
  hex_color?: string;

  /**
   * Final Option (optional)
   * Y for Yes or N for No
   */
  final?: YesNo;

  /**
   * Reached Option (optional)
   * Y for Yes or N for No
   */
  reached?: YesNo;

  /**
   * Success Option (optional)
   * Y for Yes or N for No
   */
  success?: YesNo;

  /**
   * DNC Option (optional)
   * Y for Yes or N for No
   */
  dnc?: YesNo;

  /**
   * Callback Option (optional)
   * Y for Yes or N for No
   */
  callback?: YesNo;

  /**
   * Contact Option (optional)
   * Y for Yes or N for No
   */
  contact?: YesNo;

  /**
   * Voicemail Option (optional)
   * Y for Yes or N for No
   */
  voicemail?: YesNo;
}

/**
 * Statuses update success response
 */
export interface StatusesUpdateResponseSuccess {
  /** Success status */
  success: true;

  /** Response data */
  data: {
    /**
     * Status abbreviation that was updated
     */
    status: string;
  };
}

/**
 * Statuses update error definitions
 */
export type StatusesUpdateError =
  | {
      code: 6069;
      text: "Missing or Invalid Status Abbreviation, Only custom statuses can be modified.";
    }
  | {
      code: 6071;
      text: "Final option can not be set to a empty value, please assign a Y for Yes or N for No or dont set parameter.";
    }
  | {
      code: 6072;
      text: "Reached option can not be set to a empty value, please assign a Y for Yes or N for No or dont set parameter.";
    }
  | {
      code: 6073;
      text: "Success option can not be set to a empty value, please assign a Y for Yes or N for No or dont set parameter.";
    }
  | {
      code: 6074;
      text: "DNC option can not be set to a empty value, please assign a Y for Yes or N for No or dont set parameter.";
    }
  | {
      code: 6075;
      text: "Callback option can not be set to a empty value, please assign a Y for Yes or N for No or dont set parameter.";
    }
  | {
      code: 6076;
      text: "Contact option can not be set to a empty value, please assign a Y for Yes or N for No or dont set parameter.";
    }
  | {
      code: 6077;
      text: "Voicemail option can not be set to a empty value, please assign a Y for Yes or N for No or dont set parameter.";
    }
  | { code: 6078; text: "HEX color defined is invalid, do not include #, valid example: 6711d1." };

/**
 * Statuses update error response
 */
export type StatusesUpdateResponseError = ConvosoErrorResponse<StatusesUpdateError>;

/**
 * Statuses update response (discriminated union)
 */
export type StatusesUpdateResponse = StatusesUpdateResponseSuccess | StatusesUpdateResponseError;

/**
 * Parameters for searching statuses
 */
export interface StatusesSearchParams extends Record<string, unknown> {
  /**
   * Search status abbreviation or description (required)
   */
  query: string;
}

/**
 * Status entry data structure
 */
export interface StatusData {
  /**
   * Status abbreviation
   */
  status: string;

  /**
   * Status name
   */
  name: string;

  /**
   * Final option
   */
  final: YesNo;

  /**
   * Reached option
   */
  reached: YesNo;

  /**
   * Success option
   */
  success: YesNo;

  /**
   * DNC option
   */
  dnc: YesNo;

  /**
   * Callback option
   */
  callback: YesNo;

  /**
   * Contact option
   */
  contact: YesNo;

  /**
   * Voicemail option
   */
  voicemail: YesNo;

  /**
   * Workflow disposition event option
   */
  workflow_dispositon_event_option: number;

  /**
   * Whether this is a custom status
   */
  custom_status: YesNo;
}

/**
 * Statuses search success response
 */
export interface StatusesSearchResponseSuccess {
  /** Success status */
  success: true;

  /** Array of status entries */
  data: StatusData[];
}

/**
 * Statuses search response
 * No specific error codes documented for search
 */
export type StatusesSearchResponse = StatusesSearchResponseSuccess;
