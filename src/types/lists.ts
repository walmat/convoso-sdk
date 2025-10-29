import type { ConvosoErrorResponse } from "./index.js";

/**
 * Parameters for inserting a new list
 */
export interface ListsInsertParams extends Record<string, unknown> {
  /**
   * List's name, 10-30 characters long
   * Acceptable symbols: a-z A-Z 0-9 : - _ space
   */
  name: string;

  /**
   * Campaign's ID
   */
  campaign_id: string;

  /**
   * List's description, 0-255 characters long
   */
  description?: string;

  /**
   * List's status
   */
  status?: boolean;
}

/**
 * Lists insert success response
 */
export interface ListsInsertResponseSuccess {
  /** Success status */
  success: true;

  /** Response data */
  data: {
    /**
     * ID of the created list
     */
    list_id: string;
  };
}

/**
 * Lists insert error definitions
 */
export type ListsInsertError =
  | { code: 6003; text: "The List requires a name" }
  | { code: 6004; text: "Unknown Campaign ID" }
  | { code: 6046; text: "The List name should be at least 10 characters long" }
  | { code: 6081; text: "The list name should be unique" };

/**
 * Lists insert error response
 */
export type ListsInsertResponseError = ConvosoErrorResponse<ListsInsertError>;

/**
 * Lists insert response (discriminated union)
 */
export type ListsInsertResponse = ListsInsertResponseSuccess | ListsInsertResponseError;

/**
 * Parameters for updating a list
 */
export interface ListsUpdateParams extends Record<string, unknown> {
  /**
   * List's ID
   */
  list_id: number;

  /**
   * List's name, 10-30 characters long
   * Acceptable symbols: a-z A-Z 0-9 : - _ space
   */
  name?: string;

  /**
   * Campaign's ID
   */
  campaign_id?: string;

  /**
   * List's status
   */
  status?: boolean;
}

/**
 * Lists update success response
 */
export interface ListsUpdateResponseSuccess {
  /** Success status */
  success: true;

  /** Response data */
  data: {
    /**
     * ID of the updated list
     */
    list_id: string;
  };
}

/**
 * Lists update error definitions
 */
export type ListsUpdateError =
  | { code: 6002; text: "No such List" }
  | { code: 6004; text: "Unknown Campaign ID" }
  | { code: 6046; text: "The List name should be at least 10 characters long" }
  | { code: 6081; text: "The list name should be unique" };

/**
 * Lists update error response
 */
export type ListsUpdateResponseError = ConvosoErrorResponse<ListsUpdateError>;

/**
 * Lists update response (discriminated union)
 */
export type ListsUpdateResponse = ListsUpdateResponseSuccess | ListsUpdateResponseError;

/**
 * Parameters for deleting a list
 */
export interface ListsDeleteParams extends Record<string, unknown> {
  /**
   * List's ID
   */
  list_id: number;
}

/**
 * Lists delete success response
 */
export interface ListsDeleteResponseSuccess {
  /** Success status */
  success: true;
}

/**
 * Lists delete error definitions
 */
export type ListsDeleteError =
  | { code: 6002; text: "No such List" }
  | { code: 102; text: "List deletion in progress" };

/**
 * Lists delete error response
 */
export type ListsDeleteResponseError = ConvosoErrorResponse<ListsDeleteError>;

/**
 * Lists delete response (discriminated union)
 */
export type ListsDeleteResponse = ListsDeleteResponseSuccess | ListsDeleteResponseError;

/**
 * Parameters for searching lists
 */
export interface ListsSearchParams extends Record<string, unknown> {
  /**
   * List's Status
   */
  status: string;

  /**
   * List's Id
   */
  id?: string;

  /**
   * Campaign's ID
   */
  campaign_id?: string;
}

/**
 * Date object returned in list search results
 */
export interface ListDateTime {
  date: string;
  timezone_type: number;
  timezone: string;
}

/**
 * Individual list item in search results
 */
export interface ListItem {
  /**
   * List ID
   */
  id: number;

  /**
   * Campaign ID
   */
  campaign_id: string;

  /**
   * List status (Y/N)
   */
  status: string;

  /**
   * Last called timestamp
   */
  last_called_at: ListDateTime;
}

/**
 * Lists search success response
 */
export interface ListsSearchResponseSuccess {
  /** Success status */
  success: true;

  /** Response data */
  data: ListItem[];
}

/**
 * Lists search error definitions
 */
export type ListsSearchError = { code: 6002; text: "No such List" };

/**
 * Lists search error response
 */
export type ListsSearchResponseError = ConvosoErrorResponse<ListsSearchError>;

/**
 * Lists search response (discriminated union)
 */
export type ListsSearchResponse = ListsSearchResponseSuccess | ListsSearchResponseError;
