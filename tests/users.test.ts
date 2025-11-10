import { beforeEach, describe, expect, it, vi } from "vitest";
import { ConvosoClient } from "../src/index.js";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("UsersResource", () => {
	let client: ConvosoClient;

	beforeEach(() => {
		vi.clearAllMocks();
		client = new ConvosoClient({
			apiKey: "test-api-key",
		});
	});

	describe("getRecordings", () => {
		it("should get user recordings successfully", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: true,
					data: {
						offset: 0,
						limit: 10,
						total: 10,
						entries: [
							{
								recording_id: 8,
								lead_id: 270,
								start_time: "2014-06-19 21:11:36",
								end_time: "",
								seconds: null,
								url: "convoso_8183376356_8_1403237496-all.wav",
							},
						],
					},
				}),
			});

			const result = await client.users.getRecordings({
				user: "agent@example.com",
			});

			expect(result.success).toBe(true);
			if (result.success && result.data) {
				expect(result.data.total).toBe(10);
				expect(result.data.entries).toHaveLength(1);
				expect(result.data.entries[0]?.recording_id).toBe(8);
				expect(result.data.entries[0]?.lead_id).toBe(270);
			}

			const callUrl = mockFetch.mock.calls[0]?.[0] as string;
			expect(callUrl).toContain("/users/recordings");
			expect(callUrl).toContain("user=agent%40example.com");
		});

		it("should filter recordings by date range", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: true,
					data: {
						offset: 0,
						limit: 50,
						total: 5,
						entries: [],
					},
				}),
			});

			await client.users.getRecordings({
				user: "agent@example.com",
				start_time: "2014-06-19 00:00:00",
				end_time: "2014-06-19 23:59:59",
				limit: 50,
			});

			const callUrl = mockFetch.mock.calls[0]?.[0] as string;
			expect(callUrl).toContain("start_time=2014-06-19+00%3A00%3A00");
			expect(callUrl).toContain("end_time=2014-06-19+23%3A59%3A59");
		});

		it("should handle pagination", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: true,
					data: {
						offset: 100,
						limit: 50,
						total: 500,
						entries: [],
					},
				}),
			});

			await client.users.getRecordings({
				user: "agent@example.com",
				offset: 100,
				limit: 50,
			});

			const callUrl = mockFetch.mock.calls[0]?.[0] as string;
			expect(callUrl).toContain("offset=100");
			expect(callUrl).toContain("limit=50");
		});

		it("should handle error 6005: missing users", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: false,
					code: 6005,
					text: "Missing users",
				}),
			});

			const result = await client.users.getRecordings({
				user: "",
			});

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.code).toBe(6005);
			}
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

			const result = await client.users.getRecordings({
				user: "agent@example.com",
				offset: 100000,
			});

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.code).toBe(7231);
			}
		});
	});

	describe("search", () => {
		it("should search users successfully", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: true,
					data: {
						offset: 0,
						limit: "2",
						total: "641",
						results: {
							"11004055": {
								id: 1104055,
								acl_access_profile: 1,
								email: "add_user@example",
								first_name: "add user",
								last_name: "add user",
								user_level: 1,
								queue_override: "USE_CAMPAIGN",
								allow_queue_selection: "1",
								allow_callbacks: "1",
								callback_types_allowed: "1",
								allow_transfers: "1",
								default_blended_selection: "0",
								alter_custdata_override: "Y",
								status: "Y",
								local_gmt: "-8.00",
								allow_blended_campaign: "1",
								notification: "0",
								created_at: "2016-11-17T10:54:21-0800",
								connection_type: "BROWSER",
								extension: [313777],
								last_login: "2017-10-12 10:09:30",
							},
							"11005758": {
								id: 1105758,
								acl_access_profile: 1,
								email: "11111111111111@gmail.com",
								first_name: "3333333",
								last_name: "4444444",
								user_level: 1,
								queue_override: "USE_CAMPAIGN",
								allow_queue_selection: "1",
								allow_callbacks: "1",
								callback_types_allowed: "1",
								allow_transfers: "1",
								default_blended_selection: "0",
								alter_custdata_override: "Y",
								status: "Y",
								local_gmt: "-8.00",
								allow_blended_campaign: "1",
								notification: "0",
								created_at: "2017-03-28T09:42:28-0700",
								connection_type: "BROWSER",
								extension: [404377],
								last_login: null,
							},
						},
					},
				}),
			});

			const result = await client.users.search({
				limit: 2,
			});

			expect(result.success).toBe(true);
			if (result.success && result.data) {
				expect(result.data.total).toBe("641");
				expect(result.data.limit).toBe("2");
				expect(typeof result.data.results).toBe("object");
				expect(result.data.results["11004055"]).toBeDefined();
				expect(result.data.results["11004055"]?.id).toBe(1104055);
				expect(result.data.results["11004055"]?.email).toBe("add_user@example");
			}

			const callUrl = mockFetch.mock.calls[0]?.[0] as string;
			expect(callUrl).toContain("/users/search");
		});

		it("should search by email", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: true,
					data: {
						offset: 0,
						limit: "100",
						total: "1",
						results: {},
					},
				}),
			});

			await client.users.search({
				user: "john@example.com",
			});

			const callUrl = mockFetch.mock.calls[0]?.[0] as string;
			expect(callUrl).toContain("user=john%40example.com");
		});

		it("should search by partial name", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: true,
					data: {
						offset: 0,
						limit: "50",
						total: "10",
						results: {},
					},
				}),
			});

			await client.users.search({
				user: "John",
				limit: 50,
			});

			const callUrl = mockFetch.mock.calls[0]?.[0] as string;
			expect(callUrl).toContain("user=John");
			expect(callUrl).toContain("limit=50");
		});

		it("should handle pagination", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: true,
					data: {
						offset: 100,
						limit: "100",
						total: "500",
						results: {},
					},
				}),
			});

			await client.users.search({
				offset: 100,
				limit: 100,
			});

			const callUrl = mockFetch.mock.calls[0]?.[0] as string;
			expect(callUrl).toContain("offset=100");
			expect(callUrl).toContain("limit=100");
		});

		it("should handle error 6005: missing users", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: false,
					code: 6005,
					text: "Missing users",
				}),
			});

			const result = await client.users.search();

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.code).toBe(6005);
			}
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

			const result = await client.users.search({
				offset: 100000,
			});

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.code).toBe(7231);
			}
		});
	});
});
