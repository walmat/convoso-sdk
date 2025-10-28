import { BaseResource } from "./base-resource.js";

/**
 * Lead Validation API resource
 */
export class LeadValidationResource extends BaseResource {
  protected get basePath(): string {
    return "/lead-validation";
  }

  /**
   * Validate a lead
   */
  async validate(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: this.basePath,
      body: params,
    });
  }

  /**
   * Get validation rules
   */
  async getRules(params?: Record<string, unknown>) {
    return this.client.request({
      method: "POST",
      path: `${this.basePath}/rules`,
      body: params,
    });
  }
}
