import { beforeEach, describe, expect, it, vi } from "vitest";
import { ConvosoClient } from "../src/index.js";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("UserActivityResource", () => {
  let client: ConvosoClient;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new ConvosoClient({
      apiKey: "test-api-key",
    });
  });

  describe("search", () => {
    it("should get all user activity without filters", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
          data: {
            available_agents: 7,
            logged_in_agents: 34,
          },
        }),
      });

      const result = await client.userActivity.search();

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.available_agents).toBe(7);
        expect(result.data.logged_in_agents).toBe(34);
      }

      const callUrl = mockFetch.mock.calls[0]?.[0] as string;
      expect(callUrl).toContain("/user-activity/search");
    });

    it("should filter by single campaign_id", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
          data: {
            available_agents: 3,
            logged_in_agents: 12,
          },
        }),
      });

      await client.userActivity.search({
        campaign_id: 102,
      });

      const callUrl = mockFetch.mock.calls[0]?.[0] as string;
      expect(callUrl).toContain("campaign_id=102");
    });

    it("should filter by multiple campaign_ids as array", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
          data: {
            available_agents: 5,
            logged_in_agents: 20,
          },
        }),
      });

      await client.userActivity.search({
        campaign_id: [102, 104],
      });

      const callUrl = mockFetch.mock.calls[0]?.[0] as string;
      // Arrays should be converted to comma-separated values
      expect(callUrl).toContain("campaign_id=102%2C104");
    });

    it("should filter by queue_id", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
          data: {
            available_agents: 2,
            logged_in_agents: 8,
          },
        }),
      });

      await client.userActivity.search({
        queue_id: [203, 204],
      });

      const callUrl = mockFetch.mock.calls[0]?.[0] as string;
      expect(callUrl).toContain("queue_id=203%2C204");
    });

    it("should filter by user_id", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
          data: {
            available_agents: 1,
            logged_in_agents: 2,
          },
        }),
      });

      await client.userActivity.search({
        user_id: [1002034, 1030483],
      });

      const callUrl = mockFetch.mock.calls[0]?.[0] as string;
      expect(callUrl).toContain("user_id=1002034%2C1030483");
    });

    it("should filter by skill options", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
          data: {
            available_agents: 4,
            logged_in_agents: 15,
          },
        }),
      });

      await client.userActivity.search({
        filter_by_skill_options: ["CA", "TX", "NY"],
      });

      const callUrl = mockFetch.mock.calls[0]?.[0] as string;
      expect(callUrl).toContain("filter_by_skill_options=CA%2CTX%2CNY");
    });

    it("should combine multiple filters", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
          data: {
            available_agents: 2,
            logged_in_agents: 6,
          },
        }),
      });

      await client.userActivity.search({
        campaign_id: [102, 104],
        queue_id: 203,
        filter_by_skill_options: "CA",
      });

      const callUrl = mockFetch.mock.calls[0]?.[0] as string;
      expect(callUrl).toContain("campaign_id=102%2C104");
      expect(callUrl).toContain("queue_id=203");
      expect(callUrl).toContain("filter_by_skill_options=CA");
    });
  });
});
