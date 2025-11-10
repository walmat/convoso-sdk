import { beforeEach, describe, expect, it, vi } from "vitest";
import { ConvosoClient } from "../src/index.js";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("SmsOptOutResource", () => {
  let client: ConvosoClient;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new ConvosoClient({
      apiKey: "test-api-key",
    });
  });

  describe("insert", () => {
    it("should insert SMS opt-out successfully", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
        }),
      });

      const result = await client.smsOptOut.insert({
        phone_number: "8185551212",
        phone_code: "1",
        campaign_id: "0",
      });

      expect(result.success).toBe(true);

      const callUrl = mockFetch.mock.calls[0]?.[0] as string;
      expect(callUrl).toContain("/sms-opt-out/insert");
    });

    it("should include optional reason and purpose", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
        }),
      });

      await client.smsOptOut.insert({
        phone_number: "8185551212",
        phone_code: "1",
        campaign_id: "0",
        reason: "DNC",
        purpose: "TELEMKT",
      });

      const callUrl = mockFetch.mock.calls[0]?.[0] as string;
      expect(callUrl).toContain("reason=DNC");
      expect(callUrl).toContain("purpose=TELEMKT");
    });

    it("should handle error 6006: invalid campaign ID", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: false,
          code: 6006,
          text: "Invalid Campaign ID",
        }),
      });

      const result = await client.smsOptOut.insert({
        phone_number: "8185551212",
        phone_code: "1",
        campaign_id: "invalid",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe(6006);
      }
    });

    it("should handle error 6007: invalid phone number", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: false,
          code: 6007,
          text: "Invalid Phone Number",
        }),
      });

      const result = await client.smsOptOut.insert({
        phone_number: "invalid",
        phone_code: "1",
        campaign_id: "0",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe(6007);
      }
    });

    it("should handle error 6008: phone number already exists", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: false,
          code: 6008,
          text: "The phone number already exists",
        }),
      });

      const result = await client.smsOptOut.insert({
        phone_number: "8185551212",
        phone_code: "1",
        campaign_id: "0",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe(6008);
      }
    });
  });

  describe("update", () => {
    it("should update SMS opt-out successfully", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
          data: { id: "12345" },
        }),
      });

      const result = await client.smsOptOut.update({
        id: 12345,
        reason: "DNC",
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe("12345");
      }

      const callUrl = mockFetch.mock.calls[0]?.[0] as string;
      expect(callUrl).toContain("/sms-opt-out/update");
    });

    it("should handle clearing fields with -BLANK-", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
          data: { id: "12345" },
        }),
      });

      await client.smsOptOut.update({
        id: 12345,
        reason: "-BLANK-",
      });

      const callUrl = mockFetch.mock.calls[0]?.[0] as string;
      expect(callUrl).toContain("reason=-BLANK-");
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

      const result = await client.smsOptOut.update({
        id: 12345,
        campaign_id: 999999,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe(6004);
      }
    });

    it("should handle error 6056: missing or invalid ID", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: false,
          code: 6056,
          text: "Missing or Invalid value for ID",
        }),
      });

      const result = await client.smsOptOut.update({
        id: 0,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe(6056);
      }
    });

    it("should handle error 6059: duplicate combination", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: false,
          code: 6059,
          text: "This combination of Phone number, Campaign ID, and Phone Code already exists.",
        }),
      });

      const result = await client.smsOptOut.update({
        id: 12345,
        phone_number: "8185551212",
        phone_code: "1",
        campaign_id: 0,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe(6059);
      }
    });
  });

  describe("search", () => {
    it("should search SMS opt-outs successfully", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
          data: {
            offset: 0,
            limit: 1,
            total: 1,
            entries: [
              {
                id: "2776852",
                phone_number: "8185551212",
                campaign_id: "0",
                reason: "SMS Opt-Out reason",
                Purpose: "SMS Opt-Out Purpose",
                insert_date: "2019-11-22 17:10:11",
                phone_code: "1",
                campaign_uid: "",
                campaign_name: "",
              },
            ],
          },
        }),
      });

      const result = await client.smsOptOut.search({
        campaign_id: 0,
      });

      expect(result.success).toBe(true);
      if (result.success && result.data) {
        expect(result.data.total).toBe(1);
        expect(result.data.entries).toHaveLength(1);
        expect(result.data.entries[0]?.id).toBe("2776852");
        expect(result.data.entries[0]?.phone_number).toBe("8185551212");
      }
    });

    it("should search with Reason and Purpose filters", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
          data: {
            offset: 0,
            limit: 100,
            total: 0,
            entries: [],
          },
        }),
      });

      await client.smsOptOut.search({
        Reason: "DNC",
        Purpose: "TELEMKT",
      });

      const callUrl = mockFetch.mock.calls[0]?.[0] as string;
      expect(callUrl).toContain("Reason=DNC");
      expect(callUrl).toContain("Purpose=TELEMKT");
    });

    it("should respect pagination with max offset 100000", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
          data: {
            offset: 50000,
            limit: 1000,
            total: 100000,
            entries: [],
          },
        }),
      });

      await client.smsOptOut.search({
        offset: 50000,
        limit: 1000,
      });

      const callUrl = mockFetch.mock.calls[0]?.[0] as string;
      expect(callUrl).toContain("offset=50000");
      expect(callUrl).toContain("limit=1000");
    });

    it("should handle error 7231: invalid offset value", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: false,
          code: 7231,
          text: "Invalid offset value",
        }),
      });

      const result = await client.smsOptOut.search({
        offset: 200000,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe(7231);
      }
    });
  });
});
