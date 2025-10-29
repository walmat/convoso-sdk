import { describe, expect, it, vi } from "vitest";
import {
	buildUrl,
	calculateBackoff,
	isRetryableError,
	sleep,
} from "../src/utils/index.js";

describe("buildUrl", () => {
	it("should build basic URL with auth token", () => {
		const url = buildUrl("https://api.example.com", "test-key", "/leads");
		expect(url).toBe("https://api.example.com/leads?auth_token=test-key");
	});

	it("should normalize trailing slash from baseUrl", () => {
		const url = buildUrl("https://api.example.com/", "test-key", "/leads");
		expect(url).toBe("https://api.example.com/leads?auth_token=test-key");
	});

	it("should normalize leading slash from path", () => {
		const url = buildUrl("https://api.example.com", "test-key", "leads");
		expect(url).toBe("https://api.example.com/leads?auth_token=test-key");
	});

	it("should normalize both trailing and leading slashes", () => {
		const url = buildUrl("https://api.example.com/", "test-key", "leads");
		expect(url).toBe("https://api.example.com/leads?auth_token=test-key");
	});

	it("should append query parameters", () => {
		const url = buildUrl("https://api.example.com", "test-key", "/leads", {
			campaign_id: "123",
			limit: 100,
		});
		expect(url).toContain("auth_token=test-key");
		expect(url).toContain("campaign_id=123");
		expect(url).toContain("limit=100");
	});

	it("should convert number query params to strings", () => {
		const url = buildUrl("https://api.example.com", "test-key", "/leads", {
			offset: 0,
			limit: 1000,
		});
		expect(url).toContain("offset=0");
		expect(url).toContain("limit=1000");
	});

	it("should convert boolean query params to strings", () => {
		const url = buildUrl("https://api.example.com", "test-key", "/leads", {
			active: true,
			deleted: false,
		});
		expect(url).toContain("active=true");
		expect(url).toContain("deleted=false");
	});

	it("should skip undefined query parameters", () => {
		const url = buildUrl("https://api.example.com", "test-key", "/leads", {
			campaign_id: "123",
			// biome-ignore lint/style/useNamingConvention: testing undefined value
			undefined_param: undefined,
			limit: 100,
		});
		expect(url).toContain("campaign_id=123");
		expect(url).toContain("limit=100");
		expect(url).not.toContain("undefined_param");
	});

	it("should handle empty query object", () => {
		const url = buildUrl("https://api.example.com", "test-key", "/leads", {});
		expect(url).toBe("https://api.example.com/leads?auth_token=test-key");
	});

	it("should handle no query parameters", () => {
		const url = buildUrl("https://api.example.com", "test-key", "/leads");
		expect(url).toBe("https://api.example.com/leads?auth_token=test-key");
	});

	it("should URL-encode special characters in query params", () => {
		const url = buildUrl("https://api.example.com", "test-key", "/leads", {
			email: "user@example.com",
			name: "John Doe",
		});
		expect(url).toContain("email=user%40example.com");
		expect(url).toContain("name=John+Doe");
	});

	it("should handle empty string values in query params", () => {
		const url = buildUrl("https://api.example.com", "test-key", "/leads", {
			search: "",
		});
		expect(url).toContain("search=");
	});
});

describe("sleep", () => {
	it("should resolve after specified milliseconds", async () => {
		const start = Date.now();
		await sleep(100);
		const elapsed = Date.now() - start;
		// Allow some tolerance for timing
		expect(elapsed).toBeGreaterThanOrEqual(90);
		expect(elapsed).toBeLessThan(200);
	});

	it("should resolve immediately for 0ms", async () => {
		const start = Date.now();
		await sleep(0);
		const elapsed = Date.now() - start;
		expect(elapsed).toBeLessThan(50);
	});

	it("should return a Promise", () => {
		const result = sleep(10);
		expect(result).toBeInstanceOf(Promise);
	});

	it("should work with setTimeout mock", async () => {
		vi.useFakeTimers();
		const promise = sleep(1000);
		vi.advanceTimersByTime(1000);
		await promise;
		vi.useRealTimers();
	});
});

describe("calculateBackoff", () => {
	it("should calculate exponential backoff for attempt 0", () => {
		expect(calculateBackoff(0)).toBe(1000); // 1000 * 2^0 = 1000
	});

	it("should calculate exponential backoff for attempt 1", () => {
		expect(calculateBackoff(1)).toBe(2000); // 1000 * 2^1 = 2000
	});

	it("should calculate exponential backoff for attempt 2", () => {
		expect(calculateBackoff(2)).toBe(4000); // 1000 * 2^2 = 4000
	});

	it("should calculate exponential backoff for attempt 3", () => {
		expect(calculateBackoff(3)).toBe(8000); // 1000 * 2^3 = 8000
	});

	it("should calculate exponential backoff for attempt 4", () => {
		expect(calculateBackoff(4)).toBe(16000); // 1000 * 2^4 = 16000
	});

	it("should cap at 30000ms for high attempts", () => {
		expect(calculateBackoff(5)).toBe(30000); // 1000 * 2^5 = 32000, but capped at 30000
		expect(calculateBackoff(6)).toBe(30000); // 1000 * 2^6 = 64000, but capped at 30000
		expect(calculateBackoff(10)).toBe(30000); // Very high attempt, still capped
	});

	it("should use custom base delay", () => {
		expect(calculateBackoff(0, 500)).toBe(500); // 500 * 2^0 = 500
		expect(calculateBackoff(1, 500)).toBe(1000); // 500 * 2^1 = 1000
		expect(calculateBackoff(2, 500)).toBe(2000); // 500 * 2^2 = 2000
	});

	it("should cap custom base delay at 30000ms", () => {
		expect(calculateBackoff(7, 500)).toBe(30000); // 500 * 2^7 = 64000, but capped
	});

	it("should handle baseDelay of 0", () => {
		expect(calculateBackoff(0, 0)).toBe(0);
		expect(calculateBackoff(1, 0)).toBe(0);
		expect(calculateBackoff(5, 0)).toBe(0);
	});

	it("should handle very large base delays", () => {
		expect(calculateBackoff(0, 50000)).toBe(30000); // Immediately capped
		expect(calculateBackoff(1, 50000)).toBe(30000);
	});
});

describe("isRetryableError", () => {
	it("should return true for 429 (Too Many Requests)", () => {
		expect(isRetryableError(429)).toBe(true);
	});

	it("should return true for 500 (Internal Server Error)", () => {
		expect(isRetryableError(500)).toBe(true);
	});

	it("should return true for 502 (Bad Gateway)", () => {
		expect(isRetryableError(502)).toBe(true);
	});

	it("should return true for 503 (Service Unavailable)", () => {
		expect(isRetryableError(503)).toBe(true);
	});

	it("should return true for 504 (Gateway Timeout)", () => {
		expect(isRetryableError(504)).toBe(true);
	});

	it("should return true for other 5xx errors", () => {
		expect(isRetryableError(599)).toBe(true);
	});

	it("should return false for 400 (Bad Request)", () => {
		expect(isRetryableError(400)).toBe(false);
	});

	it("should return false for 401 (Unauthorized)", () => {
		expect(isRetryableError(401)).toBe(false);
	});

	it("should return false for 403 (Forbidden)", () => {
		expect(isRetryableError(403)).toBe(false);
	});

	it("should return false for 404 (Not Found)", () => {
		expect(isRetryableError(404)).toBe(false);
	});

	it("should return false for other 4xx errors", () => {
		expect(isRetryableError(422)).toBe(false);
	});

	it("should return false for 2xx success codes", () => {
		expect(isRetryableError(200)).toBe(false);
		expect(isRetryableError(201)).toBe(false);
		expect(isRetryableError(204)).toBe(false);
	});

	it("should return false for 3xx redirect codes", () => {
		expect(isRetryableError(301)).toBe(false);
		expect(isRetryableError(302)).toBe(false);
	});

	it("should return false for undefined status code", () => {
		expect(isRetryableError(undefined)).toBe(false);
	});

	it("should return false for no status code", () => {
		expect(isRetryableError()).toBe(false);
	});
});
