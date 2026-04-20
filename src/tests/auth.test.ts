import { describe, expect, it } from "vitest";
import { getAPIKey } from "../api/auth.js";

describe("getAPIKey", () => {
  it("should not return any api key when auth header is not present", () => {
    const header = {};
    const apiKey = getAPIKey(header);
    expect(apiKey).toBe(null);
  });
  it("should not return any api key when auth header is incorrect", () => {
    const headers = [
      {
        authorization: "ApiKeyKey",
      },
      {
        authorization: "ApiKey",
      },
    ];
    for (const header of headers) {
      const apiKey = getAPIKey(header);
      expect(apiKey).toBe(null);
    }
  });
  it("should return api key when auth header is correct", () => {
    const key = "Key";
    const header = {
      authorization: `ApiKey ${key}`,
    };
    const apiKey = getAPIKey(header);
    expect(apiKey).toBe(key);
  });
});
