import { BaseResource } from "./base-resource.js";

/**
 * SMS Opt-Out API resource
 */
export class SmsOptOutResource extends BaseResource {
  protected get basePath(): string {
    return "/sms-opt-out";
  }

  /**
   * Add number to SMS opt-out list
   */
  async add(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/add`,
      body: params,
    });
  }

  /**
   * Remove number from SMS opt-out list
   */
  async remove(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/remove`,
      body: params,
    });
  }

  /**
   * Search SMS opt-out list
   */
  async search(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/search`,
      body: params,
    });
  }
}
