import { beforeEach, describe, expect, it, vi } from "vitest";
import { ConvosoClient } from "../src/index.js";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("ListsResource", () => {
  let client: ConvosoClient;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new ConvosoClient({
      apiKey: "test-api-key",
    });
  });

  describe("insert", () => {
    it("should insert list successfully", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
          data: { list_id: "17257" },
        }),
      });

      const result = await client.lists.insert({
        name: "Test List Name 2025",
        campaign_id: "64",
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.list_id).toBe("17257");
      }

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const callUrl = mockFetch.mock.calls[0]?.[0] as string;
      expect(callUrl).toContain("/lists/insert");
      expect(callUrl).toContain("auth_token=test-api-key");
    });

    it("should include optional parameters", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
          data: { list_id: "17257" },
        }),
      });

      await client.lists.insert({
        name: "Test List Name 2025",
        campaign_id: "64",
        description: "Test description",
        status: true,
      });

      const callUrl = mockFetch.mock.calls[0]?.[0] as string;
      expect(callUrl).toContain("description=Test+description");
      expect(callUrl).toContain("status=true");
    });

    it("should handle error 6003: missing name", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: false,
          code: 6003,
          text: "The List requires a name",
        }),
      });

      const result = await client.lists.insert({
        name: "Test",
        campaign_id: "64",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe(6003);
        expect(result.text).toBe("The List requires a name");
      }
    });

    it("should handle error 6004: unknown campaign ID", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: false,
          code: 6004,
          text: "Unknown Campaign ID",
        }),
      });

      const result = await client.lists.insert({
        name: "Test List Name 2025",
        campaign_id: "999999",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe(6004);
      }
    });

    it("should handle error 6046: name too short", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: false,
          code: 6046,
          text: "The List name should be at least 10 characters long",
        }),
      });

      const result = await client.lists.insert({
        name: "Short",
        campaign_id: "64",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe(6046);
      }
    });

    it("should handle error 6081: duplicate name", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: false,
          code: 6081,
          text: "The list name should be unique",
        }),
      });

      const result = await client.lists.insert({
        name: "Existing List Name",
        campaign_id: "64",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe(6081);
      }
    });
  });

  describe("update", () => {
    it("should update list successfully", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
          data: { list_id: "17257" },
        }),
      });

      const result = await client.lists.update({
        list_id: 17257,
        name: "Updated List Name",
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.list_id).toBe("17257");
      }

      const callUrl = mockFetch.mock.calls[0]?.[0] as string;
      expect(callUrl).toContain("/lists/update");
    });

    it("should handle error 6002: no such list", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: false,
          code: 6002,
          text: "No such List",
        }),
      });

      const result = await client.lists.update({
        list_id: 999999,
        name: "Updated List Name",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe(6002);
      }
    });
  });

  describe("delete", () => {
    it("should delete list successfully", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
        }),
      });

      const result = await client.lists.delete({
        list_id: 17257,
      });

      expect(result.success).toBe(true);

      const callUrl = mockFetch.mock.calls[0]?.[0] as string;
      expect(callUrl).toContain("/lists/delete");
    });

    it("should handle error 6002: no such list", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: false,
          code: 6002,
          text: "No such List",
        }),
      });

      const result = await client.lists.delete({
        list_id: 999999,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe(6002);
      }
    });

    it("should handle error 102: deletion in progress", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: false,
          code: 102,
          text: "List deletion in progress",
        }),
      });

      const result = await client.lists.delete({
        list_id: 17257,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe(102);
      }
    });
  });

  describe("search", () => {
    it("should search lists successfully with results", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
          data: [
            {
              id: 48,
              campaign_id: "64",
              status: "Y",
              last_called_at: {
                date: "2016-03-01 16:51:33.000000",
                timezone_type: 3,
                timezone: "America/Los_Angeles",
              },
            },
          ],
        }),
      });

      const result = await client.lists.search({
        status: "Y",
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data).toHaveLength(1);
        expect(result.data[0]?.id).toBe(48);
        expect(result.data[0]?.campaign_id).toBe("64");
        expect(result.data[0]?.status).toBe("Y");
      }
    });

    it("should search with campaign_id filter", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
          data: [],
        }),
      });

      await client.lists.search({
        status: "Y",
        campaign_id: "64",
      });

      const callUrl = mockFetch.mock.calls[0]?.[0] as string;
      expect(callUrl).toContain("campaign_id=64");
    });

    it("should handle error 6002: no such list", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: false,
          code: 6002,
          text: "No such List",
        }),
      });

      const result = await client.lists.search({
        status: "Y",
        id: "999999",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe(6002);
      }
    });
  });
});
