import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { ConvosoClient } from "../src/index.js";
import { AgentMonitorResource } from "../src/resources/agent-monitor.js";
import { HttpClient, ConvosoApiError } from "../src/client/http-client.js";
import type {
  AgentMonitorSearchResponse,
  AgentMonitorLogoutResponse,
  AgentMonitorData,
} from "../src/types/agent-monitor.js";

describe("AgentMonitorResource", () => {
  let client: ConvosoClient;
  let agentMonitor: AgentMonitorResource;
  let mockRequest: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    client = new ConvosoClient({
      apiKey: "test-api-key",
    });
    agentMonitor = client.agentMonitor;

    // Mock the HTTP client's request method
    mockRequest = vi.fn();
    // @ts-ignore - Accessing private property for testing
    client.http.request = mockRequest;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Initialization", () => {
    it("should be instantiated from client", () => {
      expect(agentMonitor).toBeInstanceOf(AgentMonitorResource);
    });

    it("should have correct basePath", () => {
      // @ts-ignore - Accessing protected property for testing
      expect(agentMonitor.basePath).toBe("/agent-monitor");
    });
  });

  describe("search()", () => {
    const mockSearchResponse: AgentMonitorSearchResponse = {
      success: true,
      message: "Agents retrieved successfully",
      data: [
        {
          user_id: 1002034,
          username: "agent1",
          first_name: "John",
          last_name: "Doe",
          email: "john.doe@example.com",
          campaign_id: 102,
          campaign_name: "Test Campaign",
          queue_id: 203,
          queue_name: "Test Queue",
          status: {
            status: "Available",
            status_time: "2024-01-15T10:30:00Z",
            duration: 300,
          },
          skill_options: ["CA", "TX"],
          login_time: "2024-01-15T09:00:00Z",
          login_duration: 5400,
        },
        {
          user_id: 1030483,
          username: "agent2",
          first_name: "Jane",
          last_name: "Smith",
          email: "jane.smith@example.com",
          campaign_id: 104,
          campaign_name: "Another Campaign",
          queue_id: 204,
          queue_name: "Another Queue",
          status: {
            status: "On Call",
            status_time: "2024-01-15T10:25:00Z",
            duration: 600,
          },
          skill_options: ["NY", "FL"],
          login_time: "2024-01-15T08:30:00Z",
          login_duration: 7200,
          current_call: {
            call_id: "call-123",
            phone_number: "+15551234567",
            call_start_time: "2024-01-15T10:25:00Z",
            call_duration: 600,
          },
        },
      ],
      total: 2,
    };

    it("should search all agents with no parameters", async () => {
      mockRequest.mockResolvedValue(mockSearchResponse);

      const result = await agentMonitor.search();

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/search",
        query: {},
      });
      expect(result).toEqual(mockSearchResponse);
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
    });

    it("should search with single campaign_id", async () => {
      mockRequest.mockResolvedValue(mockSearchResponse);

      await agentMonitor.search({ campaign_id: 102 });

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/search",
        query: { campaign_id: 102 },
      });
    });

    it("should search with multiple campaign_ids as array", async () => {
      mockRequest.mockResolvedValue(mockSearchResponse);

      await agentMonitor.search({ campaign_id: [102, 104] });

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/search",
        query: { campaign_id: "102,104" },
      });
    });

    it("should search with single user_id", async () => {
      mockRequest.mockResolvedValue(mockSearchResponse);

      await agentMonitor.search({ user_id: 1002034 });

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/search",
        query: { user_id: 1002034 },
      });
    });

    it("should search with multiple user_ids as array", async () => {
      mockRequest.mockResolvedValue(mockSearchResponse);

      await agentMonitor.search({ user_id: [1002034, 1030483] });

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/search",
        query: { user_id: "1002034,1030483" },
      });
    });

    it("should search with single queue_id", async () => {
      mockRequest.mockResolvedValue(mockSearchResponse);

      await agentMonitor.search({ queue_id: 203 });

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/search",
        query: { queue_id: 203 },
      });
    });

    it("should search with multiple queue_ids as array", async () => {
      mockRequest.mockResolvedValue(mockSearchResponse);

      await agentMonitor.search({ queue_id: [203, 204] });

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/search",
        query: { queue_id: "203,204" },
      });
    });

    it("should search with single skill option", async () => {
      mockRequest.mockResolvedValue(mockSearchResponse);

      await agentMonitor.search({ filter_by_skill_options: "CA" });

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/search",
        query: { filter_by_skill_options: "CA" },
      });
    });

    it("should search with multiple skill options as array", async () => {
      mockRequest.mockResolvedValue(mockSearchResponse);

      await agentMonitor.search({ filter_by_skill_options: ["CA", "TX", "NY"] });

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/search",
        query: { filter_by_skill_options: "CA,TX,NY" },
      });
    });

    it("should search with combined filters", async () => {
      mockRequest.mockResolvedValue(mockSearchResponse);

      await agentMonitor.search({
        campaign_id: [102, 104],
        queue_id: 203,
        user_id: [1002034, 1030483],
        filter_by_skill_options: ["CA", "TX"],
      });

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/search",
        query: {
          campaign_id: "102,104",
          queue_id: 203,
          user_id: "1002034,1030483",
          filter_by_skill_options: "CA,TX",
        },
      });
    });

    it("should handle empty results", async () => {
      const emptyResponse: AgentMonitorSearchResponse = {
        success: true,
        message: "No agents found",
        data: [],
        total: 0,
      };
      mockRequest.mockResolvedValue(emptyResponse);

      const result = await agentMonitor.search({ campaign_id: 999 });

      expect(result.data).toHaveLength(0);
      expect(result.total).toBe(0);
    });

    it("should return agents with all optional fields", async () => {
      mockRequest.mockResolvedValue(mockSearchResponse);

      const result = await agentMonitor.search();
      const agent = result.data?.[0];

      expect(agent).toHaveProperty("user_id");
      expect(agent).toHaveProperty("username");
      expect(agent).toHaveProperty("first_name");
      expect(agent).toHaveProperty("last_name");
      expect(agent).toHaveProperty("email");
      expect(agent).toHaveProperty("campaign_id");
      expect(agent).toHaveProperty("campaign_name");
      expect(agent).toHaveProperty("queue_id");
      expect(agent).toHaveProperty("queue_name");
      expect(agent).toHaveProperty("status");
      expect(agent).toHaveProperty("skill_options");
      expect(agent).toHaveProperty("login_time");
      expect(agent).toHaveProperty("login_duration");
    });

    it("should return agent with current call information", async () => {
      mockRequest.mockResolvedValue(mockSearchResponse);

      const result = await agentMonitor.search();
      const agentWithCall = result.data?.[1];

      expect(agentWithCall?.current_call).toBeDefined();
      expect(agentWithCall?.current_call?.call_id).toBe("call-123");
      expect(agentWithCall?.current_call?.phone_number).toBe("+15551234567");
      expect(agentWithCall?.current_call?.call_start_time).toBeDefined();
      expect(agentWithCall?.current_call?.call_duration).toBe(600);
    });

    it("should return agent status information", async () => {
      mockRequest.mockResolvedValue(mockSearchResponse);

      const result = await agentMonitor.search();
      const agent = result.data?.[0];

      expect(agent?.status).toBeDefined();
      expect(agent?.status?.status).toBe("Available");
      expect(agent?.status?.status_time).toBeDefined();
      expect(agent?.status?.duration).toBe(300);
    });

    it("should handle agents with missing optional fields", async () => {
      const minimalAgent: AgentMonitorData = {
        user_id: 1002034,
        username: "agent1",
      };
      const minimalResponse: AgentMonitorSearchResponse = {
        success: true,
        data: [minimalAgent],
        total: 1,
      };
      mockRequest.mockResolvedValue(minimalResponse);

      const result = await agentMonitor.search();
      const agent = result.data?.[0];

      expect(agent?.user_id).toBe(1002034);
      expect(agent?.username).toBe("agent1");
      expect(agent?.email).toBeUndefined();
      expect(agent?.current_call).toBeUndefined();
    });

    it("should handle API error responses", async () => {
      const apiError = new ConvosoApiError(
        "Invalid campaign ID",
        400,
        "INVALID_PARAM",
      );
      mockRequest.mockRejectedValue(apiError);

      await expect(agentMonitor.search({ campaign_id: -1 })).rejects.toThrow(
        "Invalid campaign ID",
      );
    });

    it("should handle network errors", async () => {
      const networkError = new ConvosoApiError(
        "Network request failed",
        undefined,
        "NETWORK_ERROR",
      );
      mockRequest.mockRejectedValue(networkError);

      await expect(agentMonitor.search()).rejects.toThrow(
        "Network request failed",
      );
    });

    it("should handle timeout errors", async () => {
      const timeoutError = new ConvosoApiError(
        "Request timeout",
        undefined,
        "TIMEOUT",
      );
      mockRequest.mockRejectedValue(timeoutError);

      await expect(agentMonitor.search()).rejects.toThrow("Request timeout");
    });
  });

  describe("logout()", () => {
    const mockLogoutResponse: AgentMonitorLogoutResponse = {
      success: true,
      message: "Agents logged out successfully",
      count: 2,
      logged_out_users: [1002034, 1030483],
    };

    it("should logout with single user_id", async () => {
      mockRequest.mockResolvedValue(mockLogoutResponse);

      const result = await agentMonitor.logout({ user_id: 1002034 });

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/logout",
        query: { user_id: 1002034 },
      });
      expect(result).toEqual(mockLogoutResponse);
      expect(result.success).toBe(true);
    });

    it("should logout with multiple user_ids as array", async () => {
      mockRequest.mockResolvedValue(mockLogoutResponse);

      await agentMonitor.logout({ user_id: [1002034, 1030483] });

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/logout",
        query: { user_id: "1002034,1030483" },
      });
    });

    it("should logout with campaign_id", async () => {
      mockRequest.mockResolvedValue(mockLogoutResponse);

      await agentMonitor.logout({ campaign_id: 102 });

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/logout",
        query: { campaign_id: 102 },
      });
    });

    it("should logout with multiple campaign_ids as array", async () => {
      mockRequest.mockResolvedValue(mockLogoutResponse);

      await agentMonitor.logout({ campaign_id: [102, 104] });

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/logout",
        query: { campaign_id: "102,104" },
      });
    });

    it("should logout with queue_id", async () => {
      mockRequest.mockResolvedValue(mockLogoutResponse);

      await agentMonitor.logout({ queue_id: 203 });

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/logout",
        query: { queue_id: 203 },
      });
    });

    it("should logout with multiple queue_ids as array", async () => {
      mockRequest.mockResolvedValue(mockLogoutResponse);

      await agentMonitor.logout({ queue_id: [203, 204] });

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/logout",
        query: { queue_id: "203,204" },
      });
    });

    it("should logout with force flag", async () => {
      mockRequest.mockResolvedValue(mockLogoutResponse);

      await agentMonitor.logout({ user_id: 1002034, force: true });

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/logout",
        query: { user_id: 1002034, force: true },
      });
    });

    it("should logout without force flag", async () => {
      mockRequest.mockResolvedValue(mockLogoutResponse);

      await agentMonitor.logout({ user_id: 1002034, force: false });

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/logout",
        query: { user_id: 1002034, force: false },
      });
    });

    it("should logout with combined parameters", async () => {
      mockRequest.mockResolvedValue(mockLogoutResponse);

      await agentMonitor.logout({
        user_id: [1002034, 1030483],
        campaign_id: 102,
        queue_id: [203, 204],
        force: true,
      });

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/logout",
        query: {
          user_id: "1002034,1030483",
          campaign_id: 102,
          queue_id: "203,204",
          force: true,
        },
      });
    });

    it("should logout with no parameters", async () => {
      mockRequest.mockResolvedValue(mockLogoutResponse);

      await agentMonitor.logout();

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/logout",
        query: {},
      });
    });

    it("should return count of logged out users", async () => {
      mockRequest.mockResolvedValue(mockLogoutResponse);

      const result = await agentMonitor.logout({ user_id: [1002034, 1030483] });

      expect(result.count).toBe(2);
      expect(result.logged_out_users).toEqual([1002034, 1030483]);
    });

    it("should handle no users logged out", async () => {
      const emptyResponse: AgentMonitorLogoutResponse = {
        success: true,
        message: "No agents found to logout",
        count: 0,
        logged_out_users: [],
      };
      mockRequest.mockResolvedValue(emptyResponse);

      const result = await agentMonitor.logout({ user_id: 999999 });

      expect(result.count).toBe(0);
      expect(result.logged_out_users).toHaveLength(0);
    });

    it("should handle API error responses", async () => {
      const apiError = new ConvosoApiError(
        "User not found",
        404,
        "USER_NOT_FOUND",
      );
      mockRequest.mockRejectedValue(apiError);

      await expect(agentMonitor.logout({ user_id: -1 })).rejects.toThrow(
        "User not found",
      );
    });

    it("should handle permission errors", async () => {
      const permissionError = new ConvosoApiError(
        "Insufficient permissions",
        403,
        "FORBIDDEN",
      );
      mockRequest.mockRejectedValue(permissionError);

      await expect(agentMonitor.logout({ user_id: 1002034 })).rejects.toThrow(
        "Insufficient permissions",
      );
    });

    it("should handle network errors", async () => {
      const networkError = new ConvosoApiError(
        "Network request failed",
        undefined,
        "NETWORK_ERROR",
      );
      mockRequest.mockRejectedValue(networkError);

      await expect(agentMonitor.logout({ user_id: 1002034 })).rejects.toThrow(
        "Network request failed",
      );
    });

    it("should handle timeout errors", async () => {
      const timeoutError = new ConvosoApiError(
        "Request timeout",
        undefined,
        "TIMEOUT",
      );
      mockRequest.mockRejectedValue(timeoutError);

      await expect(agentMonitor.logout({ user_id: 1002034 })).rejects.toThrow(
        "Request timeout",
      );
    });
  });

  describe("Parameter Normalization", () => {
    it("should normalize empty arrays", async () => {
      mockRequest.mockResolvedValue({ success: true, data: [], total: 0 });

      await agentMonitor.search({ campaign_id: [] });

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/search",
        query: { campaign_id: "" },
      });
    });

    it("should handle single element arrays", async () => {
      mockRequest.mockResolvedValue({ success: true, data: [], total: 0 });

      await agentMonitor.search({ campaign_id: [102] });

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/search",
        query: { campaign_id: "102" },
      });
    });

    it("should normalize large arrays", async () => {
      mockRequest.mockResolvedValue({ success: true, data: [], total: 0 });
      const campaigns = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110];

      await agentMonitor.search({ campaign_id: campaigns });

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/search",
        query: { campaign_id: "101,102,103,104,105,106,107,108,109,110" },
      });
    });

    it("should preserve other parameter types", async () => {
      mockRequest.mockResolvedValue({ success: true, data: [], total: 0 });

      await agentMonitor.logout({
        user_id: 1002034,
        force: true,
      });

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/logout",
        query: {
          user_id: 1002034,
          force: true,
        },
      });
    });
  });

  describe("Integration with Client", () => {
    it("should be accessible from client instance", () => {
      const client = new ConvosoClient({ apiKey: "test-key" });
      expect(client.agentMonitor).toBeDefined();
      expect(client.agentMonitor).toBeInstanceOf(AgentMonitorResource);
    });

    it("should use client's HTTP client", () => {
      const client = new ConvosoClient({ apiKey: "test-key" });
      const agentMonitor = client.agentMonitor;

      // @ts-ignore - Accessing private property for testing
      expect(agentMonitor.client).toBe(client.http);
    });

    it("should respect client configuration", async () => {
      const customClient = new ConvosoClient({
        apiKey: "custom-key",
        baseUrl: "https://custom.api.com",
        timeout: 5000,
        maxRetries: 5,
      });

      expect(customClient.agentMonitor).toBeDefined();
    });
  });

  describe("Edge Cases", () => {
    it("should handle undefined parameters", async () => {
      mockRequest.mockResolvedValue({ success: true, data: [], total: 0 });

      await agentMonitor.search(undefined);

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/search",
        query: {},
      });
    });

    it("should handle null values in parameters", async () => {
      mockRequest.mockResolvedValue({ success: true, data: [], total: 0 });

      await agentMonitor.search({
        // @ts-ignore - Testing runtime behavior
        campaign_id: null,
      });

      expect(mockRequest).toHaveBeenCalled();
    });

    it("should handle mixed types in parameters", async () => {
      mockRequest.mockResolvedValue({ success: true, data: [], total: 0 });

      await agentMonitor.search({
        campaign_id: [102, 104],
        user_id: 1002034,
        filter_by_skill_options: "CA",
      });

      expect(mockRequest).toHaveBeenCalledWith({
        path: "/agent-monitor/search",
        query: {
          campaign_id: "102,104",
          user_id: 1002034,
          filter_by_skill_options: "CA",
        },
      });
    });

    it("should handle response with missing optional fields", async () => {
      const minimalResponse = {
        success: true,
      };
      mockRequest.mockResolvedValue(minimalResponse);

      const result = await agentMonitor.search();

      expect(result.success).toBe(true);
      expect(result.data).toBeUndefined();
      expect(result.total).toBeUndefined();
    });

    it("should handle malformed response gracefully", async () => {
      mockRequest.mockResolvedValue({});

      const result = await agentMonitor.search();

      expect(result).toEqual({});
    });
  });

  describe("Error Handling", () => {
    it("should propagate authentication errors", async () => {
      const authError = new ConvosoApiError(
        "Invalid API key",
        401,
        "UNAUTHORIZED",
      );
      mockRequest.mockRejectedValue(authError);

      await expect(agentMonitor.search()).rejects.toThrow("Invalid API key");
      await expect(agentMonitor.search()).rejects.toThrow(ConvosoApiError);
    });

    it("should propagate rate limit errors", async () => {
      const rateLimitError = new ConvosoApiError(
        "Rate limit exceeded",
        429,
        "RATE_LIMIT",
      );
      mockRequest.mockRejectedValue(rateLimitError);

      await expect(agentMonitor.search()).rejects.toThrow(
        "Rate limit exceeded",
      );
    });

    it("should propagate server errors", async () => {
      const serverError = new ConvosoApiError(
        "Internal server error",
        500,
        "INTERNAL_ERROR",
      );
      mockRequest.mockRejectedValue(serverError);

      await expect(agentMonitor.search()).rejects.toThrow(
        "Internal server error",
      );
    });

    it("should handle error with details", async () => {
      const errorWithDetails = new ConvosoApiError(
        "Validation failed",
        400,
        "VALIDATION_ERROR",
        { field: "campaign_id", issue: "must be a positive number" },
      );
      mockRequest.mockRejectedValue(errorWithDetails);

      await expect(agentMonitor.search()).rejects.toThrow("Validation failed");
    });
  });

  describe("Real-world Usage Scenarios", () => {
    it("should search for all available agents", async () => {
      const availableAgents: AgentMonitorSearchResponse = {
        success: true,
        data: [
          {
            user_id: 1001,
            username: "agent1",
            status: { status: "Available", duration: 120 },
          },
          {
            user_id: 1002,
            username: "agent2",
            status: { status: "Available", duration: 300 },
          },
        ],
        total: 2,
      };
      mockRequest.mockResolvedValue(availableAgents);

      const result = await agentMonitor.search();

      expect(result.data?.every((agent) => agent.status?.status === "Available")).toBe(true);
    });

    it("should find agents on active calls", async () => {
      const agentsOnCall: AgentMonitorSearchResponse = {
        success: true,
        data: [
          {
            user_id: 1001,
            username: "agent1",
            status: { status: "On Call" },
            current_call: {
              call_id: "call-1",
              phone_number: "+15551234567",
              call_duration: 180,
            },
          },
        ],
        total: 1,
      };
      mockRequest.mockResolvedValue(agentsOnCall);

      const result = await agentMonitor.search();

      expect(result.data?.[0]?.current_call).toBeDefined();
      expect(result.data?.[0]?.status?.status).toBe("On Call");
    });

    it("should logout agents from specific campaign before maintenance", async () => {
      const logoutResponse: AgentMonitorLogoutResponse = {
        success: true,
        message: "Campaign agents logged out for maintenance",
        count: 5,
        logged_out_users: [1001, 1002, 1003, 1004, 1005],
      };
      mockRequest.mockResolvedValue(logoutResponse);

      const result = await agentMonitor.logout({
        campaign_id: 102,
        force: true,
      });

      expect(result.count).toBe(5);
      expect(result.logged_out_users).toHaveLength(5);
    });

    it("should search agents by skill and logout if needed", async () => {
      const searchResponse: AgentMonitorSearchResponse = {
        success: true,
        data: [
          { user_id: 1001, skill_options: ["CA", "TX"] },
          { user_id: 1002, skill_options: ["CA", "NY"] },
        ],
        total: 2,
      };
      mockRequest.mockResolvedValueOnce(searchResponse);

      const logoutResponse: AgentMonitorLogoutResponse = {
        success: true,
        count: 2,
        logged_out_users: [1001, 1002],
      };
      mockRequest.mockResolvedValueOnce(logoutResponse);

      // First, search for agents with specific skills
      const searchResult = await agentMonitor.search({
        filter_by_skill_options: ["CA"],
      });

      // Then logout those agents
      const userIds = searchResult.data?.map((agent) => agent.user_id!);
      const logoutResult = await agentMonitor.logout({ user_id: userIds });

      expect(logoutResult.count).toBe(2);
    });
  });

  describe("Type Safety", () => {
    it("should accept valid search parameters", async () => {
      mockRequest.mockResolvedValue({ success: true });

      // All these should compile and run without errors
      await agentMonitor.search();
      await agentMonitor.search({});
      await agentMonitor.search({ campaign_id: 102 });
      await agentMonitor.search({ campaign_id: [102, 104] });
      await agentMonitor.search({ user_id: 1002034 });
      await agentMonitor.search({ user_id: [1002034] });
      await agentMonitor.search({ queue_id: 203 });
      await agentMonitor.search({ queue_id: [203, 204] });
      await agentMonitor.search({ filter_by_skill_options: "CA" });
      await agentMonitor.search({ filter_by_skill_options: ["CA", "TX"] });
    });

    it("should accept valid logout parameters", async () => {
      mockRequest.mockResolvedValue({ success: true });

      // All these should compile and run without errors
      await agentMonitor.logout();
      await agentMonitor.logout({});
      await agentMonitor.logout({ user_id: 1002034 });
      await agentMonitor.logout({ user_id: [1002034] });
      await agentMonitor.logout({ campaign_id: 102 });
      await agentMonitor.logout({ campaign_id: [102, 104] });
      await agentMonitor.logout({ queue_id: 203 });
      await agentMonitor.logout({ queue_id: [203, 204] });
      await agentMonitor.logout({ force: true });
      await agentMonitor.logout({ force: false });
    });

    it("should return properly typed responses", async () => {
      const response: AgentMonitorSearchResponse = {
        success: true,
        data: [],
        total: 0,
      };
      mockRequest.mockResolvedValue(response);

      const result = await agentMonitor.search();

      // TypeScript should recognize these properties
      expect(typeof result.success).toBe("boolean");
      expect(Array.isArray(result.data)).toBe(true);
      expect(typeof result.total).toBe("number");
    });
  });
});
