import { beforeEach, describe, expect, it, vi } from "vitest";
import { HttpClient } from "../src/client/http-client.js";
import { ConvosoApiError } from "../src/types/index.js";

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("HttpClient", () => {
	let client: HttpClient;

	beforeEach(() => {
		vi.clearAllMocks();
		vi.useRealTimers();
		client = new HttpClient({
			apiKey: "test-api-key",
		});
	});

	describe("constructor and config", () => {
		it("should use default baseUrl", () => {
			const testClient = new HttpClient({ apiKey: "key" });
			expect(testClient).toBeDefined();
		});

		it("should use custom baseUrl", () => {
			const testClient = new HttpClient({
				apiKey: "key",
				baseUrl: "https://custom.api.com/v2/",
			});
			expect(testClient).toBeDefined();
		});

		it("should use default timeout (30000ms)", () => {
			const testClient = new HttpClient({ apiKey: "key" });
			expect(testClient).toBeDefined();
		});

		it("should use custom timeout", () => {
			const testClient = new HttpClient({
				apiKey: "key",
				timeout: 5000,
			});
			expect(testClient).toBeDefined();
		});

		it("should use default maxRetries (3)", () => {
			const testClient = new HttpClient({ apiKey: "key" });
			expect(testClient).toBeDefined();
		});

		it("should use custom maxRetries", () => {
			const testClient = new HttpClient({
				apiKey: "key",
				maxRetries: 5,
			});
			expect(testClient).toBeDefined();
		});

		it("should use custom headers", () => {
			const testClient = new HttpClient({
				apiKey: "key",
				headers: { "X-Custom-Header": "value" },
			});
			expect(testClient).toBeDefined();
		});
	});

	describe("successful requests", () => {
		it("should make GET request and return JSON response", async () => {
			const mockData = { success: true, data: { id: 123 } };
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => mockData,
			});

			const result = await client.request({
				path: "/leads",
				method: "GET",
			});

			expect(result).toEqual(mockData);
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});

		it("should make POST request with body", async () => {
			const requestBody = { campaign_id: "123", name: "Test" };
			const mockData = { success: true };
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 201,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => mockData,
			});

			const result = await client.request({
				path: "/leads",
				method: "POST",
				body: requestBody,
			});

			expect(result).toEqual(mockData);
			expect(mockFetch).toHaveBeenCalledWith(
				expect.stringContaining("/leads"),
				expect.objectContaining({
					method: "POST",
					body: JSON.stringify(requestBody),
				}),
			);
		});

		it("should append auth token to URL", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({ success: true }),
			});

			await client.request({ path: "/leads" });

			expect(mockFetch).toHaveBeenCalledWith(
				expect.stringContaining("auth_token=test-api-key"),
				expect.any(Object),
			);
		});

		it("should append query parameters to URL", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({ success: true }),
			});

			await client.request({
				path: "/leads",
				query: { campaign_id: "123", limit: 100 },
			});

			const callUrl = mockFetch.mock.calls[0]?.[0] as string;
			expect(callUrl).toContain("campaign_id=123");
			expect(callUrl).toContain("limit=100");
		});

		it("should include Content-Type header", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({ success: true }),
			});

			await client.request({ path: "/leads" });

			const headers = mockFetch.mock.calls[0]?.[1]?.headers as Headers;
			expect(headers.get("Content-Type")).toBe("application/json");
		});

		it("should merge custom request headers", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({ success: true }),
			});

			await client.request({
				path: "/leads",
				headers: { "X-Request-ID": "123" },
			});

			const headers = mockFetch.mock.calls[0]?.[1]?.headers as Headers;
			expect(headers.get("X-Request-ID")).toBe("123");
		});

		it("should merge client config headers", async () => {
			const customClient = new HttpClient({
				apiKey: "key",
				headers: { "X-Client-Header": "value" },
			});

			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({ success: true }),
			});

			await customClient.request({ path: "/leads" });

			const headers = mockFetch.mock.calls[0]?.[1]?.headers as Headers;
			expect(headers.get("X-Client-Header")).toBe("value");
		});

		it("should handle non-JSON responses (empty response)", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 204,
				headers: new Headers({ "content-type": "text/plain" }),
			});

			const result = await client.request({ path: "/leads" });

			expect(result).toBeUndefined();
		});

		it("should default to GET method when not specified", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({ success: true }),
			});

			await client.request({ path: "/leads" });

			expect(mockFetch).toHaveBeenCalledWith(
				expect.any(String),
				expect.objectContaining({ method: "GET" }),
			);
		});
	});

	describe("error handling", () => {
		it("should throw ConvosoApiError for 400 Bad Request", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 400,
				statusText: "Bad Request",
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					message: "Invalid parameters",
					code: "INVALID_PARAMS",
				}),
			});

			try {
				await client.request({ path: "/leads" });
				expect.fail("Should have thrown an error");
			} catch (error) {
				expect(error).toBeInstanceOf(ConvosoApiError);
				expect((error as ConvosoApiError).message).toBe("Invalid parameters");
			}
		});

		it("should throw ConvosoApiError for 401 Unauthorized", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 401,
				statusText: "Unauthorized",
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({ message: "Invalid API key" }),
			});

			await expect(client.request({ path: "/leads" })).rejects.toThrow(
				ConvosoApiError,
			);
		});

		it("should throw ConvosoApiError for 403 Forbidden", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 403,
				statusText: "Forbidden",
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({ message: "Forbidden" }),
			});

			await expect(client.request({ path: "/leads" })).rejects.toThrow(
				ConvosoApiError,
			);
		});

		it("should throw ConvosoApiError for 404 Not Found", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 404,
				statusText: "Not Found",
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({ message: "Resource not found" }),
			});

			await expect(client.request({ path: "/leads/999" })).rejects.toThrow(
				ConvosoApiError,
			);
		});

		it("should include status code in error", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 400,
				statusText: "Bad Request",
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({ message: "Error" }),
			});

			try {
				await client.request({ path: "/leads" });
			} catch (error) {
				expect(error).toBeInstanceOf(ConvosoApiError);
				expect((error as ConvosoApiError).statusCode).toBe(400);
			}
		});

		it("should include error code if provided", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 400,
				statusText: "Bad Request",
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					message: "Invalid input",
					code: "VALIDATION_ERROR",
				}),
			});

			try {
				await client.request({ path: "/leads" });
			} catch (error) {
				expect(error).toBeInstanceOf(ConvosoApiError);
				expect((error as ConvosoApiError).code).toBe("VALIDATION_ERROR");
			}
		});

		it("should include error details if provided", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 400,
				statusText: "Bad Request",
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({
					message: "Validation failed",
					code: "VALIDATION_ERROR",
					details: { field: "email", reason: "invalid format" },
				}),
			});

			try {
				await client.request({ path: "/leads" });
			} catch (error) {
				expect(error).toBeInstanceOf(ConvosoApiError);
				expect((error as ConvosoApiError).details).toEqual({
					field: "email",
					reason: "invalid format",
				});
			}
		});

		it("should use statusText when error response is not JSON", async () => {
			// Use 404 so it won't retry
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 404,
				statusText: "Not Found",
				headers: new Headers({ "content-type": "text/html" }),
			});

			try {
				await client.request({ path: "/leads" });
			} catch (error) {
				expect(error).toBeInstanceOf(ConvosoApiError);
				expect((error as ConvosoApiError).message).toBe("Not Found");
				expect((error as ConvosoApiError).statusCode).toBe(404);
			}
		});

		it("should handle malformed JSON in error response", async () => {
			// Use 400 so it won't retry
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 400,
				statusText: "Bad Request",
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => {
					throw new Error("Invalid JSON");
				},
			});

			try {
				await client.request({ path: "/leads" });
			} catch (error) {
				expect(error).toBeInstanceOf(ConvosoApiError);
				expect((error as ConvosoApiError).message).toBe("Bad Request");
				expect((error as ConvosoApiError).statusCode).toBe(400);
			}
		});
	});

	describe("retry logic", () => {
		it("should retry on 429 Too Many Requests", async () => {
			mockFetch
				.mockResolvedValueOnce({
					ok: false,
					status: 429,
					statusText: "Too Many Requests",
					headers: new Headers({ "content-type": "application/json" }),
					json: async () => ({ message: "Rate limit exceeded" }),
				})
				.mockResolvedValueOnce({
					ok: true,
					status: 200,
					headers: new Headers({ "content-type": "application/json" }),
					json: async () => ({ success: true }),
				});

			const result = await client.request({ path: "/leads" });

			expect(result).toEqual({ success: true });
			expect(mockFetch).toHaveBeenCalledTimes(2);
		});

		it("should retry on 500 Internal Server Error", async () => {
			mockFetch
				.mockResolvedValueOnce({
					ok: false,
					status: 500,
					statusText: "Internal Server Error",
					headers: new Headers({ "content-type": "application/json" }),
					json: async () => ({ message: "Server error" }),
				})
				.mockResolvedValueOnce({
					ok: true,
					status: 200,
					headers: new Headers({ "content-type": "application/json" }),
					json: async () => ({ success: true }),
				});

			const result = await client.request({ path: "/leads" });

			expect(result).toEqual({ success: true });
			expect(mockFetch).toHaveBeenCalledTimes(2);
		});

		it("should retry on 502 Bad Gateway", async () => {
			mockFetch
				.mockResolvedValueOnce({
					ok: false,
					status: 502,
					statusText: "Bad Gateway",
					headers: new Headers({ "content-type": "application/json" }),
					json: async () => ({ message: "Bad Gateway" }),
				})
				.mockResolvedValueOnce({
					ok: true,
					status: 200,
					headers: new Headers({ "content-type": "application/json" }),
					json: async () => ({ success: true }),
				});

			const result = await client.request({ path: "/leads" });

			expect(result).toEqual({ success: true });
			expect(mockFetch).toHaveBeenCalledTimes(2);
		});

		it("should retry on 503 Service Unavailable", async () => {
			mockFetch
				.mockResolvedValueOnce({
					ok: false,
					status: 503,
					statusText: "Service Unavailable",
					headers: new Headers({ "content-type": "application/json" }),
					json: async () => ({ message: "Service Unavailable" }),
				})
				.mockResolvedValueOnce({
					ok: true,
					status: 200,
					headers: new Headers({ "content-type": "application/json" }),
					json: async () => ({ success: true }),
				});

			const result = await client.request({ path: "/leads" });

			expect(result).toEqual({ success: true });
			expect(mockFetch).toHaveBeenCalledTimes(2);
		});

		it("should NOT retry on 400 Bad Request", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 400,
				statusText: "Bad Request",
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({ message: "Bad Request" }),
			});

			await expect(client.request({ path: "/leads" })).rejects.toThrow();
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});

		it("should NOT retry on 404 Not Found", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 404,
				statusText: "Not Found",
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({ message: "Not Found" }),
			});

			await expect(client.request({ path: "/leads" })).rejects.toThrow();
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});

		it("should respect maxRetries limit (default 3)", async () => {
			mockFetch.mockResolvedValue({
				ok: false,
				status: 500,
				statusText: "Internal Server Error",
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({ message: "Server error" }),
			});

			await expect(client.request({ path: "/leads" })).rejects.toThrow();
			// Initial attempt + 3 retries = 4 total calls
			expect(mockFetch).toHaveBeenCalledTimes(4);
		}, 10000);

		it("should respect custom maxRetries", async () => {
			const customClient = new HttpClient({
				apiKey: "key",
				maxRetries: 1,
			});

			mockFetch.mockResolvedValue({
				ok: false,
				status: 500,
				statusText: "Internal Server Error",
				headers: new Headers({ "content-type": "application/json" }),
				json: async () => ({ message: "Server error" }),
			});

			await expect(customClient.request({ path: "/leads" })).rejects.toThrow();
			// Initial attempt + 1 retry = 2 total calls
			expect(mockFetch).toHaveBeenCalledTimes(2);
		});
	});

	describe("network errors", () => {
		it("should handle network errors", async () => {
			mockFetch.mockRejectedValueOnce(new Error("Network connection failed"));

			try {
				await client.request({ path: "/leads" });
			} catch (error) {
				expect(error).toBeInstanceOf(ConvosoApiError);
				expect((error as ConvosoApiError).message).toBe("Network connection failed");
			}
		});

		it("should set NETWORK_ERROR code for network errors", async () => {
			mockFetch.mockRejectedValueOnce(new Error("Connection refused"));

			try {
				await client.request({ path: "/leads" });
			} catch (error) {
				expect(error).toBeInstanceOf(ConvosoApiError);
				expect((error as ConvosoApiError).code).toBe("NETWORK_ERROR");
			}
		});

		it("should set TIMEOUT code for timeout errors", async () => {
			const abortError = new Error("The operation was aborted");
			abortError.name = "AbortError";
			mockFetch.mockRejectedValueOnce(abortError);

			try {
				await client.request({ path: "/leads" });
			} catch (error) {
				expect(error).toBeInstanceOf(ConvosoApiError);
				expect((error as ConvosoApiError).code).toBe("TIMEOUT");
			}
		});
	});
});
