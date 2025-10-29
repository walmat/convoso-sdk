import { beforeEach, describe, expect, it } from "vitest";
import type { HttpClient } from "../src/client/http-client.js";
import { BaseResource } from "../src/resources/base-resource.js";

// Create a concrete test implementation of BaseResource
class TestResource extends BaseResource {
  protected get basePath(): string {
    return "/test";
  }

  // Expose protected methods for testing
  public testNormalizeParams<T extends Record<string, unknown>>(params: T) {
    return this.normalizeParams(params);
  }

  public testValidateOffset(offset?: number, max?: number) {
    return this.validateOffset(offset, max);
  }

  public testValidateLimit(limit?: number, max?: number, defaultLimit?: number) {
    return this.validateLimit(limit, max, defaultLimit);
  }

  public testApplyPaginationValidation(
    params?: Record<string, unknown>,
    options?: {
      offsetMax?: number;
      limitMax?: number;
      limitDefault?: number;
    },
  ) {
    return this.applyPaginationValidation(params, options);
  }
}

describe("BaseResource", () => {
  let resource: TestResource;

  beforeEach(() => {
    // Create a mock HttpClient
    const mockClient = {} as HttpClient;
    resource = new TestResource(mockClient);
  });

  describe("normalizeParams", () => {
    it("should convert array of numbers to comma-separated string", () => {
      const result = resource.testNormalizeParams({
        campaign_id: [102, 104, 106],
      });
      expect(result).toEqual({ campaign_id: "102,104,106" });
    });

    it("should convert array of strings to comma-separated string", () => {
      const result = resource.testNormalizeParams({
        statuses: ["active", "paused", "completed"],
      });
      expect(result).toEqual({ statuses: "active,paused,completed" });
    });

    it("should convert single-element array to string", () => {
      const result = resource.testNormalizeParams({
        campaign_id: [102],
      });
      expect(result).toEqual({ campaign_id: "102" });
    });

    it("should convert empty array to empty string", () => {
      const result = resource.testNormalizeParams({
        campaign_id: [],
      });
      expect(result).toEqual({ campaign_id: "" });
    });

    it("should preserve string values", () => {
      const result = resource.testNormalizeParams({
        email: "test@example.com",
        name: "John Doe",
      });
      expect(result).toEqual({ email: "test@example.com", name: "John Doe" });
    });

    it("should preserve number values", () => {
      const result = resource.testNormalizeParams({
        offset: 0,
        limit: 1000,
        campaign_id: 123,
      });
      expect(result).toEqual({ offset: 0, limit: 1000, campaign_id: 123 });
    });

    it("should preserve boolean values", () => {
      const result = resource.testNormalizeParams({
        active: true,
        deleted: false,
      });
      expect(result).toEqual({ active: true, deleted: false });
    });

    it("should preserve undefined values", () => {
      const result = resource.testNormalizeParams({
        // biome-ignore lint/style/useNamingConvention: testing undefined
        optional_param: undefined,
      });
      expect(result).toEqual({ optional_param: undefined });
    });

    it("should handle mixed types", () => {
      const result = resource.testNormalizeParams({
        campaign_id: [102, 104],
        user_id: 123,
        email: "test@example.com",
        active: true,
        // biome-ignore lint/style/useNamingConvention: testing undefined
        optional_param: undefined,
      });
      expect(result).toEqual({
        campaign_id: "102,104",
        user_id: 123,
        email: "test@example.com",
        active: true,
        optional_param: undefined,
      });
    });

    it("should skip null values", () => {
      const result = resource.testNormalizeParams({
        // biome-ignore lint/style/useNamingConvention: testing null
        null_param: null,
        valid: "test",
      });
      expect(result).toEqual({ valid: "test" });
    });

    it("should skip object values", () => {
      const result = resource.testNormalizeParams({
        nested: { foo: "bar" },
        valid: "test",
      });
      expect(result).toEqual({ valid: "test" });
    });

    it("should handle empty object", () => {
      const result = resource.testNormalizeParams({});
      expect(result).toEqual({});
    });

    it("should convert array of mixed types", () => {
      const result = resource.testNormalizeParams({
        mixed: [1, "two", 3],
      });
      expect(result).toEqual({ mixed: "1,two,3" });
    });
  });

  describe("validateOffset", () => {
    it("should return 0 for undefined offset", () => {
      expect(resource.testValidateOffset(undefined)).toBe(0);
    });

    it("should return 0 for null offset", () => {
      // @ts-expect-error - testing null handling
      expect(resource.testValidateOffset(null)).toBe(0);
    });

    it("should return 0 for negative offset", () => {
      expect(resource.testValidateOffset(-10)).toBe(0);
      expect(resource.testValidateOffset(-1)).toBe(0);
      expect(resource.testValidateOffset(-1000)).toBe(0);
    });

    it("should return offset as-is for valid values", () => {
      expect(resource.testValidateOffset(0)).toBe(0);
      expect(resource.testValidateOffset(100)).toBe(100);
      expect(resource.testValidateOffset(1000)).toBe(1000);
      expect(resource.testValidateOffset(25000)).toBe(25000);
    });

    it("should clamp to default max (50000)", () => {
      expect(resource.testValidateOffset(50000)).toBe(50000);
      expect(resource.testValidateOffset(50001)).toBe(50000);
      expect(resource.testValidateOffset(100000)).toBe(50000);
    });

    it("should clamp to custom max", () => {
      expect(resource.testValidateOffset(100000, 100000)).toBe(100000);
      expect(resource.testValidateOffset(150000, 100000)).toBe(100000);
    });

    it("should handle edge cases with custom max", () => {
      expect(resource.testValidateOffset(-10, 100000)).toBe(0);
      expect(resource.testValidateOffset(0, 100000)).toBe(0);
      expect(resource.testValidateOffset(50000, 100000)).toBe(50000);
    });
  });

  describe("validateLimit", () => {
    it("should return default (1000) for undefined limit", () => {
      expect(resource.testValidateLimit(undefined)).toBe(1000);
    });

    it("should return default (1000) for null limit", () => {
      // @ts-expect-error - testing null handling
      expect(resource.testValidateLimit(null)).toBe(1000);
    });

    it("should clamp 0 to minimum (1)", () => {
      expect(resource.testValidateLimit(0)).toBe(1);
    });

    it("should clamp negative to minimum (1)", () => {
      expect(resource.testValidateLimit(-10)).toBe(1);
      expect(resource.testValidateLimit(-1)).toBe(1);
    });

    it("should return limit as-is for valid values", () => {
      expect(resource.testValidateLimit(1)).toBe(1);
      expect(resource.testValidateLimit(100)).toBe(100);
      expect(resource.testValidateLimit(500)).toBe(500);
      expect(resource.testValidateLimit(1000)).toBe(1000);
    });

    it("should clamp to default max (1000)", () => {
      expect(resource.testValidateLimit(1001)).toBe(1000);
      expect(resource.testValidateLimit(5000)).toBe(1000);
    });

    it("should clamp to custom max", () => {
      expect(resource.testValidateLimit(2000, 2000)).toBe(2000);
      expect(resource.testValidateLimit(3000, 2000)).toBe(2000);
      expect(resource.testValidateLimit(5000, 5000)).toBe(5000);
    });

    it("should use custom default limit", () => {
      expect(resource.testValidateLimit(undefined, 1000, 20)).toBe(20);
      expect(resource.testValidateLimit(undefined, 5000, 100)).toBe(100);
    });

    it("should handle custom max and default together", () => {
      expect(resource.testValidateLimit(undefined, 5000, 20)).toBe(20);
      expect(resource.testValidateLimit(100, 5000, 20)).toBe(100);
      expect(resource.testValidateLimit(6000, 5000, 20)).toBe(5000);
    });

    it("should clamp negative to 1 even with custom defaults", () => {
      expect(resource.testValidateLimit(-10, 5000, 20)).toBe(1);
      expect(resource.testValidateLimit(0, 2000, 50)).toBe(1);
    });
  });

  describe("applyPaginationValidation", () => {
    it("should return empty object for undefined params", () => {
      expect(resource.testApplyPaginationValidation(undefined)).toEqual({});
    });

    it("should validate offset with standard limits", () => {
      const result = resource.testApplyPaginationValidation({
        offset: -10,
      });
      expect(result).toEqual({ offset: 0 });
    });

    it("should validate limit with standard limits", () => {
      const result = resource.testApplyPaginationValidation({
        limit: 0,
      });
      expect(result).toEqual({ limit: 1 });
    });

    it("should validate both offset and limit with standard limits", () => {
      const result = resource.testApplyPaginationValidation({
        offset: -10,
        limit: 5000,
      });
      expect(result).toEqual({ offset: 0, limit: 1000 });
    });

    it("should preserve other parameters", () => {
      const result = resource.testApplyPaginationValidation({
        offset: 100,
        limit: 500,
        campaign_id: "123",
        active: true,
      });
      expect(result).toEqual({
        offset: 100,
        limit: 500,
        campaign_id: "123",
        active: true,
      });
    });

    it("should use custom offset max", () => {
      const result = resource.testApplyPaginationValidation(
        { offset: 75000 },
        { offsetMax: 100000 },
      );
      expect(result).toEqual({ offset: 75000 });
    });

    it("should use custom limit max", () => {
      const result = resource.testApplyPaginationValidation({ limit: 2000 }, { limitMax: 5000 });
      expect(result).toEqual({ limit: 2000 });
    });

    it("should use custom limit default", () => {
      const result = resource.testApplyPaginationValidation(
        { limit: undefined },
        { limitDefault: 20 },
      );
      expect(result).toEqual({ limit: undefined });
    });

    it("should apply all custom options together", () => {
      const result = resource.testApplyPaginationValidation(
        { offset: 75000, limit: 3000 },
        { offsetMax: 100000, limitMax: 5000, limitDefault: 20 },
      );
      expect(result).toEqual({ offset: 75000, limit: 3000 });
    });

    it("should handle DNC limits (offset max 100000)", () => {
      const result = resource.testApplyPaginationValidation(
        { offset: 75000, limit: 500 },
        { offsetMax: 100000 },
      );
      expect(result).toEqual({ offset: 75000, limit: 500 });
    });

    it("should handle Callbacks limits (limit max 5000, default 20)", () => {
      const result = resource.testApplyPaginationValidation(
        { offset: 100, limit: 3000 },
        { limitMax: 5000, limitDefault: 20 },
      );
      expect(result).toEqual({ offset: 100, limit: 3000 });
    });

    it("should handle Leads search limits (limit max 2000)", () => {
      const result = resource.testApplyPaginationValidation(
        { offset: 1000, limit: 1500 },
        { limitMax: 2000 },
      );
      expect(result).toEqual({ offset: 1000, limit: 1500 });
    });

    it("should ignore non-number offset values", () => {
      const result = resource.testApplyPaginationValidation({
        offset: "100",
        limit: 500,
      });
      expect(result).toEqual({ offset: "100", limit: 500 });
    });

    it("should ignore non-number limit values", () => {
      const result = resource.testApplyPaginationValidation({
        offset: 100,
        limit: "500",
      });
      expect(result).toEqual({ offset: 100, limit: "500" });
    });

    it("should handle params with no offset or limit", () => {
      const result = resource.testApplyPaginationValidation({
        campaign_id: "123",
        active: true,
      });
      expect(result).toEqual({ campaign_id: "123", active: true });
    });

    it("should handle empty params object", () => {
      const result = resource.testApplyPaginationValidation({});
      expect(result).toEqual({});
    });
  });
});
