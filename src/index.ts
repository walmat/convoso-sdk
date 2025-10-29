// Main client
export { ConvosoClient } from "./client/convoso-client.js";

// Errors and Types
export {
  ConvosoApiError,
  type ConvosoClientConfig,
  type ConvosoErrorDef,
  type ConvosoErrorResponse,
  type RequestOptions,
} from "./types/index.js";

// Utilities
export { normalizeHexColor } from "./utils/hex-color.js";

// Resources
export { BaseResource } from "./resources/base-resource.js";
export { AgentMonitorResource } from "./resources/agent-monitor.js";
export { AgentPerformanceResource } from "./resources/agent-performance.js";
export { AgentProductivityResource } from "./resources/agent-productivity.js";
export { CallLogsResource } from "./resources/call-logs.js";
export { CallbacksResource } from "./resources/callbacks.js";
export { CampaignsResource } from "./resources/campaigns.js";
export type {
  CampaignStatus,
  CampaignStatusToggle,
  CampaignStatusParams,
  CampaignStatusResponse,
  CampaignStatusResponseSuccess,
  CampaignStatusResponseError,
  CampaignStatusError,
  CampaignDate,
  CampaignData,
  CampaignSearchResponse,
} from "./types/campaigns.js";
export { DncResource } from "./resources/dnc.js";
export type {
  DncInsertParams,
  DncInsertResponse,
  DncInsertResponseSuccess,
  DncInsertResponseError,
  DncInsertError,
  DncUpdateParams,
  DncUpdateResponse,
  DncUpdateResponseSuccess,
  DncUpdateResponseError,
  DncUpdateError,
  DncDeleteParams,
  DncDeleteResponse,
  DncDeleteResponseSuccess,
  DncDeleteResponseError,
  DncDeleteError,
  DncSearchParams,
  DncSearchResponse,
  DncSearchResponseSuccess,
  DncSearchResponseError,
  DncSearchError,
  DncData,
} from "./types/dnc.js";
export { LeadPostResource } from "./resources/lead-post.js";
export type {
  LeadPostInsertParams,
  LeadPostInsertResponse,
  LeadPostInsertResponseSuccess,
  LeadPostInsertResponseError,
} from "./types/lead-post.js";
export { LeadValidationResource } from "./resources/lead-validation.js";
export type {
  LeadValidationSearchParams,
  LeadValidationSearchResponse,
  LeadValidationSearchResponseSuccess,
  LeadValidationSearchResponseError,
} from "./types/lead-validation.js";
export { LeadsResource } from "./resources/leads.js";
export type {
  LeadsInsertParams,
  LeadsInsertResponse,
  LeadsInsertResponseSuccess,
  LeadsInsertResponseError,
  LeadsInsertError,
  LeadsUpdateParams,
  LeadsUpdateResponse,
  LeadsUpdateResponseSuccess,
  LeadsUpdateResponseError,
  LeadsUpdateError,
  LeadsDeleteParams,
  LeadsDeleteResponse,
  LeadsDeleteResponseSuccess,
  LeadsDeleteResponseError,
  LeadsDeleteError,
  LeadsSearchParams,
  LeadsSearchResponse,
  LeadsSearchResponseSuccess,
  LeadsSearchResponseError,
  LeadsSearchError,
  LeadData,
  LeadRecordingsParams,
  LeadRecordingsResponse,
  LeadRecordingsResponseSuccess,
  LeadRecordingsResponseError,
  LeadRecordingsError,
  LeadRecordingData,
} from "./types/leads.js";
export { ListsResource } from "./resources/lists.js";
export type {
  ListsInsertParams,
  ListsInsertResponse,
  ListsInsertResponseSuccess,
  ListsInsertResponseError,
  ListsInsertError,
  ListsUpdateParams,
  ListsUpdateResponse,
  ListsUpdateResponseSuccess,
  ListsUpdateResponseError,
  ListsUpdateError,
  ListsDeleteParams,
  ListsDeleteResponse,
  ListsDeleteResponseSuccess,
  ListsDeleteResponseError,
  ListsDeleteError,
  ListsSearchParams,
  ListsSearchResponse,
  ListsSearchResponseSuccess,
  ListsSearchResponseError,
  ListsSearchError,
  ListItem,
  ListDateTime,
} from "./types/lists.js";
export { RevenueResource } from "./resources/revenue.js";
export type {
  RevenueUpdateParams,
  RevenueUpdateResponse,
  RevenueUpdateResponseSuccess,
  RevenueUpdateResponseError,
  RevenueUpdateError,
} from "./types/revenue.js";
export { SmsOptOutResource } from "./resources/sms-opt-out.js";
export type {
  SmsOptOutInsertParams,
  SmsOptOutInsertResponse,
  SmsOptOutInsertResponseSuccess,
  SmsOptOutInsertResponseError,
  SmsOptOutInsertError,
  SmsOptOutUpdateParams,
  SmsOptOutUpdateResponse,
  SmsOptOutUpdateResponseSuccess,
  SmsOptOutUpdateResponseError,
  SmsOptOutUpdateError,
  SmsOptOutSearchParams,
  SmsOptOutSearchResponse,
  SmsOptOutSearchResponseSuccess,
  SmsOptOutSearchResponseError,
  SmsOptOutSearchError,
  SmsOptOutData,
  SmsOptOutPurpose,
  SmsOptOutReason,
} from "./types/sms-opt-out.js";
export { StatusesResource } from "./resources/statuses.js";
export type {
  StatusesInsertParams,
  StatusesInsertResponse,
  StatusesInsertResponseSuccess,
  StatusesInsertResponseError,
  StatusesInsertError,
  StatusesUpdateParams,
  StatusesUpdateResponse,
  StatusesUpdateResponseSuccess,
  StatusesUpdateResponseError,
  StatusesUpdateError,
  StatusesSearchParams,
  StatusesSearchResponse,
  StatusesSearchResponseSuccess,
  StatusData,
  YesNo,
} from "./types/statuses.js";
export { UserActivityResource } from "./resources/user-activity.js";
export type {
  UserActivitySearchParams,
  UserActivitySearchResponse,
  UserActivitySearchResponseSuccess,
} from "./types/user-activity.js";
export { UsersResource } from "./resources/users.js";
export type {
  UsersRecordingsParams,
  UsersRecordingsResponse,
  UsersRecordingsResponseSuccess,
  UsersRecordingsResponseError,
  UsersRecordingsError,
  UserRecordingData,
  UsersSearchParams,
  UsersSearchResponse,
  UsersSearchResponseSuccess,
  UsersSearchResponseError,
  UsersSearchError,
  UserData,
} from "./types/users.js";

// Resource Types
export type {
  AgentMonitorSearchParams,
  AgentMonitorSearchResponse,
  AgentMonitorData,
  AgentStatus,
  AgentMonitorLogoutParams,
  AgentMonitorLogoutResponse,
  AgentMonitorLogoutResponseSuccess,
  AgentMonitorLogoutResponseError,
  AgentMonitorLogoutError,
} from "./types/agent-monitor.js";
export type {
  AgentPerformanceSearchParams,
  AgentPerformanceSearchResponse,
  AgentPerformanceSearchResponseSuccess,
  AgentPerformanceSearchResponseError,
  AgentPerformanceSearchError,
  AgentPerformanceMetrics,
} from "./types/agent-performance.js";
export type {
  AgentProductivitySearchParams,
  AgentProductivitySearchResponse,
  AgentProductivitySearchResponseSuccess,
  AgentProductivitySearchResponseError,
  AgentProductivitySearchError,
  AgentProductivityData,
} from "./types/agent-productivity.js";
export type {
  CallType,
  CallLogOrder,
  CallLogsSearchParams,
  CallLogsSearchResponse,
  CallLogsSearchResponseSuccess,
  CallLogsSearchResponseError,
  CallLogsSearchError,
  CallLogsUpdateParams,
  CallLogsUpdateResponse,
  CallLogsUpdateResponseSuccess,
  CallLogsUpdateResponseError,
  CallLogsUpdateError,
  CallLogData,
} from "./types/call-logs.js";
export type {
  CallbackRecipient,
  CallbackStage,
  CallbackInsertParams,
  CallbackInsertResponse,
  CallbackInsertResponseSuccess,
  CallbackInsertResponseError,
  CallbackInsertError,
  CallbackUpdateParams,
  CallbackUpdateResponse,
  CallbackUpdateResponseSuccess,
  CallbackUpdateResponseError,
  CallbackUpdateError,
  CallbackDeleteParams,
  CallbackDeleteResponse,
  CallbackDeleteResponseSuccess,
  CallbackDeleteResponseError,
  CallbackDeleteError,
  CallbackSearchParams,
  CallbackSearchResponse,
  CallbackSearchResponseSuccess,
  CallbackSearchResponseError,
  CallbackSearchError,
  CallbackData,
} from "./types/callbacks.js";
