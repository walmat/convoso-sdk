// Main client
export { ConvosoClient } from "./client/convoso-client.js";

// Errors
export { ConvosoApiError } from "./client/http-client.js";

// Types
export type {
  ApiError,
  ApiResponse,
  ConvosoClientConfig,
  RequestOptions,
} from "./types/index.js";

// Resources
export { BaseResource } from "./resources/base-resource.js";
export { AgentMonitorResource } from "./resources/agent-monitor.js";
export { AgentPerformanceResource } from "./resources/agent-performance.js";
export { AgentProductivityResource } from "./resources/agent-productivity.js";
export { CallLogsResource } from "./resources/call-logs.js";
export { CallbacksResource } from "./resources/callbacks.js";
export { CampaignsResource } from "./resources/campaigns.js";
export { DncResource } from "./resources/dnc.js";
export { LeadPostResource } from "./resources/lead-post.js";
export { LeadValidationResource } from "./resources/lead-validation.js";
export { LeadsResource } from "./resources/leads.js";
export { ListsResource } from "./resources/lists.js";
export { RevenueResource } from "./resources/revenue.js";
export { SmsOptOutResource } from "./resources/sms-opt-out.js";
export { StatusesResource } from "./resources/statuses.js";
export { UserActivityResource } from "./resources/user-activity.js";
export { UsersResource } from "./resources/users.js";

// Resource Types
export type {
  AgentMonitorSearchParams,
  AgentMonitorSearchResponse,
  AgentMonitorData,
  AgentStatus,
  AgentMonitorLogoutParams,
  AgentMonitorLogoutResponse,
} from "./types/agent-monitor.js";
export type {
  AgentPerformanceSearchParams,
  AgentPerformanceSearchResponse,
  AgentPerformanceMetrics,
} from "./types/agent-performance.js";
export type {
  AgentProductivitySearchParams,
  AgentProductivitySearchResponse,
  AgentProductivityData,
} from "./types/agent-productivity.js";
export type {
  CallType,
  CallLogOrder,
  CallLogsSearchParams,
  CallLogsSearchResponse,
  CallLogsGetResponse,
  CallLogData,
} from "./types/call-logs.js";
