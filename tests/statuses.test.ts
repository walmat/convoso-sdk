import { beforeEach, describe, expect, it, vi } from "vitest";
import { ConvosoClient } from "../src/index.js";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("StatusesResource", () => {
	let client: ConvosoClient;

	beforeEach(() => {
		vi.clearAllMocks();
		client = new ConvosoClient({
			apiKey: "test-api-key",
		});
	});

	describe("insert", () => {
		it("should insert status successfully", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: true,
					code: 200,
					data: {
						new: "1",
						status: "QUALI",
					},
				}),
			});

			const result = await client.statuses.insert({
				status: "QUALI",
				name: "Qualified Lead",
				final: "N",
				reached: "Y",
				success: "Y",
				dnc: "N",
				callback: "N",
				contact: "Y",
				voicemail: "N",
			});

			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data.status).toBe("QUALI");
				expect(result.data.new).toBe("1");
			}

			const callUrl = mockFetch.mock.calls[0]?.[0] as string;
			expect(callUrl).toContain("/statuses/insert");
		});

		it("should normalize hex color by stripping # prefix", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: true,
					code: 200,
					data: { new: "1", status: "HOT" },
				}),
			});

			await client.statuses.insert({
				status: "HOT",
				name: "Hot Lead",
				hex_color: "#ff0000",
				final: "N",
				reached: "Y",
				success: "Y",
				dnc: "N",
				callback: "Y",
				contact: "Y",
				voicemail: "N",
			});

			const callUrl = mockFetch.mock.calls[0]?.[0] as string;
			// Hex color should not have # in URL
			expect(callUrl).toContain("hex_color=ff0000");
			expect(callUrl).not.toContain("hex_color=%23");
		});

		it("should accept hex color without # prefix", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: true,
					code: 200,
					data: { new: "1", status: "COLD" },
				}),
			});

			await client.statuses.insert({
				status: "COLD",
				name: "Cold Lead",
				hex_color: "0000ff",
				final: "N",
				reached: "N",
				success: "N",
				dnc: "N",
				callback: "N",
				contact: "N",
				voicemail: "N",
			});

			const callUrl = mockFetch.mock.calls[0]?.[0] as string;
			expect(callUrl).toContain("hex_color=0000ff");
		});

		it("should handle error 6060: missing status description", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: false,
					code: 6060,
					text: "Missing Status Description",
				}),
			});

			const result = await client.statuses.insert({
				status: "TEST",
				name: "",
				final: "N",
				reached: "N",
				success: "N",
				dnc: "N",
				callback: "N",
				contact: "N",
				voicemail: "N",
			});

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.code).toBe(6060);
			}
		});

		it("should handle error 6061: invalid status abbreviation", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: false,
					code: 6061,
					text: "Missing or Invalid Status Abbreviation, only Alphanumeric characters allowed. Must be between 2-6 characters long.",
				}),
			});

			const result = await client.statuses.insert({
				status: "A",
				name: "Test Status",
				final: "N",
				reached: "N",
				success: "N",
				dnc: "N",
				callback: "N",
				contact: "N",
				voicemail: "N",
			});

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.code).toBe(6061);
			}
		});

		it("should handle error 6078: invalid hex color", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: false,
					code: 6078,
					text: "HEX color defined is invalid, do not include #, valid example: 6711d1.",
				}),
			});

			const result = await client.statuses.insert({
				status: "TEST",
				name: "Test Status",
				hex_color: "invalid",
				final: "N",
				reached: "N",
				success: "N",
				dnc: "N",
				callback: "N",
				contact: "N",
				voicemail: "N",
			});

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.code).toBe(6078);
			}
		});
	});

	describe("update", () => {
		it("should update status successfully", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: true,
					data: { status: "QUALI" },
				}),
			});

			const result = await client.statuses.update({
				status: "QUALI",
				name: "Super Qualified Lead",
			});

			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data.status).toBe("QUALI");
			}

			const callUrl = mockFetch.mock.calls[0]?.[0] as string;
			expect(callUrl).toContain("/statuses/update");
		});

		it("should normalize hex color on update", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: true,
					data: { status: "QUALI" },
				}),
			});

			await client.statuses.update({
				status: "QUALI",
				hex_color: "#6711d1",
			});

			const callUrl = mockFetch.mock.calls[0]?.[0] as string;
			expect(callUrl).toContain("hex_color=6711d1");
			expect(callUrl).not.toContain("hex_color=%23");
		});

		it("should handle error 6069: invalid status abbreviation", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: false,
					code: 6069,
					text: "Missing or Invalid Status Abbreviation, Only custom statuses can be modified.",
				}),
			});

			const result = await client.statuses.update({
				status: "NEW",
				name: "System Status",
			});

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.code).toBe(6069);
			}
		});

		it("should handle error 6071: final option cannot be empty", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: false,
					code: 6071,
					text: "Final option can not be set to a empty value, please assign a Y for Yes or N for No or dont set parameter.",
				}),
			});

			const result = await client.statuses.update({
				status: "QUALI",
				final: "Y",
			});

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.code).toBe(6071);
			}
		});
	});

	describe("search", () => {
		it("should search statuses successfully", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: true,
					data: [
						{
							status: "NEW",
							name: "New Lead",
							final: "N",
							reached: "N",
							success: "N",
							dnc: "N",
							callback: "N",
							contact: "N",
							voicemail: "N",
							workflow_dispositon_event_option: 1,
							custom_status: "N",
						},
						{
							status: "TST66",
							name: "Test Status 66",
							final: "N",
							reached: "N",
							success: "N",
							dnc: "N",
							callback: "N",
							contact: "Y",
							voicemail: "N",
							workflow_dispositon_event_option: 1,
							custom_status: "Y",
						},
					],
				}),
			});

			const result = await client.statuses.search({
				query: "Lead",
			});

			expect(result.success).toBe(true);
			if (result.success) {
				expect(Array.isArray(result.data)).toBe(true);
				expect(result.data).toHaveLength(2);
				expect(result.data[0]?.status).toBe("NEW");
				expect(result.data[1]?.status).toBe("TST66");
				expect(result.data[1]?.custom_status).toBe("Y");
			}
		});

		it("should search by abbreviation", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: true,
					data: [],
				}),
			});

			await client.statuses.search({
				query: "QUALI",
			});

			const callUrl = mockFetch.mock.calls[0]?.[0] as string;
			expect(callUrl).toContain("query=QUALI");
		});

		it("should return empty array when no matches found", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					success: true,
					data: [],
				}),
			});

			const result = await client.statuses.search({
				query: "NONEXISTENT",
			});

			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).toHaveLength(0);
			}
		});
	});
});
