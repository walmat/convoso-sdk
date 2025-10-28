import { describe, expect, it } from "vitest";
import { ConvosoClient } from "../src/index.js";

describe("ConvosoClient", () => {
  it("should create a client instance", () => {
    const client = new ConvosoClient({
      apiKey: "test-key",
    });

    expect(client).toBeDefined();
    expect(client.http).toBeDefined();
  });

  it("should use default configuration values", () => {
    const client = new ConvosoClient({
      apiKey: "test-key",
    });

    expect(client).toBeDefined();
  });

  it("should accept custom configuration", () => {
    const client = new ConvosoClient({
      apiKey: "test-key",
      baseUrl: "https://custom.api.com",
      timeout: 5000,
      maxRetries: 5,
    });

    expect(client).toBeDefined();
  });
});
