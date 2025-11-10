import { beforeEach, describe, expect, it, vi } from "vitest";
import { ConvosoClient } from "../src/index.js";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("RevenueResource", () => {
	let client: ConvosoClient;

	beforeEach(() => {
		vi.clearAllMocks();
		client = new ConvosoClient({
			apiKey: "test-api-key",
		});
	});

	describe("update", () => {
		it("should update revenue successfully", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: true,
					data: { call_log_id: "100125" },
				}),
			});

			const result = await client.revenue.update({
				call_log_id: "100125",
				revenue: 199.99,
			});

			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data.call_log_id).toBe("100125");
			}

			const callUrl = mockFetch.mock.calls[0]?.[0] as string;
			expect(callUrl).toContain("/revenue/update");
			expect(callUrl).toContain("revenue=199.99");
		});

		it("should update with return flag only", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: true,
					data: { call_log_id: "100125" },
				}),
			});

			await client.revenue.update({
				call_log_id: "100125",
				return: 1,
			});

			const callUrl = mockFetch.mock.calls[0]?.[0] as string;
			expect(callUrl).toContain("return=1");
		});

		it("should update with both revenue and return", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: true,
					data: { call_log_id: "100125" },
				}),
			});

			await client.revenue.update({
				call_log_id: "100125",
				revenue: 149.99,
				return: 0,
			});

			const callUrl = mockFetch.mock.calls[0]?.[0] as string;
			expect(callUrl).toContain("revenue=149.99");
			expect(callUrl).toContain("return=0");
		});

		it("should handle error 6032: missing call log ID", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: false,
					code: 6032,
					text: "Missing Call Log ID",
				}),
			});

			const result = await client.revenue.update({
				call_log_id: "",
				revenue: 100,
			});

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.code).toBe(6032);
			}
		});

		it("should handle error 6033: no such call log", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: false,
					code: 6033,
					text: "No such Call Log",
				}),
			});

			const result = await client.revenue.update({
				call_log_id: "999999",
				revenue: 100,
			});

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.code).toBe(6033);
			}
		});

		it("should handle error 6036: revenue or return required", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: false,
					code: 6036,
					text: "Either Revenue or Return need to have value",
				}),
			});

			const result = await client.revenue.update({
				call_log_id: "100125",
			});

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.code).toBe(6036);
			}
		});
	});
});
