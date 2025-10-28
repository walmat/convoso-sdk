import type { ConvosoClientConfig } from "../types/index.js";
import { HttpClient } from "./http-client.js";
import { AgentMonitorResource } from "../resources/agent-monitor.js";
import { AgentPerformanceResource } from "../resources/agent-performance.js";
import { AgentProductivityResource } from "../resources/agent-productivity.js";
import { CallLogsResource } from "../resources/call-logs.js";
import { CallbacksResource } from "../resources/callbacks.js";
import { CampaignsResource } from "../resources/campaigns.js";
import { DncResource } from "../resources/dnc.js";
import { LeadPostResource } from "../resources/lead-post.js";
import { LeadValidationResource } from "../resources/lead-validation.js";
import { LeadsResource } from "../resources/leads.js";
import { ListsResource } from "../resources/lists.js";
import { RevenueResource } from "../resources/revenue.js";
import { SmsOptOutResource } from "../resources/sms-opt-out.js";
import { StatusesResource } from "../resources/statuses.js";
import { UserActivityResource } from "../resources/user-activity.js";
import { UsersResource } from "../resources/users.js";

/**
 * Main Convoso SDK Client
 *
 * @example
 * ```typescript
 * const client = new ConvosoClient({
 *   apiKey: 'your-api-key',
 * });
 * ```
 */
export class ConvosoClient {
  private readonly httpClient: HttpClient;

  constructor(config: ConvosoClientConfig) {
    this.httpClient = new HttpClient(config);
  }

  /**
   * Get the underlying HTTP client
   * @internal
   */
  get http(): HttpClient {
    return this.httpClient;
  }

  // Resource accessors
  get agentMonitor() {
    return new AgentMonitorResource(this.httpClient);
  }

  get agentPerformance() {
    return new AgentPerformanceResource(this.httpClient);
  }

  get agentProductivity() {
    return new AgentProductivityResource(this.httpClient);
  }

  get callLogs() {
    return new CallLogsResource(this.httpClient);
  }

  get callbacks() {
    return new CallbacksResource(this.httpClient);
  }

  get campaigns() {
    return new CampaignsResource(this.httpClient);
  }

  get dnc() {
    return new DncResource(this.httpClient);
  }

  get leadPost() {
    return new LeadPostResource(this.httpClient);
  }

  get leadValidation() {
    return new LeadValidationResource(this.httpClient);
  }

  get leads() {
    return new LeadsResource(this.httpClient);
  }

  get lists() {
    return new ListsResource(this.httpClient);
  }

  get revenue() {
    return new RevenueResource(this.httpClient);
  }

  get smsOptOut() {
    return new SmsOptOutResource(this.httpClient);
  }

  get statuses() {
    return new StatusesResource(this.httpClient);
  }

  get userActivity() {
    return new UserActivityResource(this.httpClient);
  }

  get users() {
    return new UsersResource(this.httpClient);
  }
}
