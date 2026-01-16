import { describe, expect, it } from "vitest";

import { setupTables } from "./setup-tables";

describe("sqlite", () => {
  it("should handle empty input array", async () => {
    await expect(
      setupTables({ prefix: "test", data: [] }),
    ).resolves.toBeUndefined();
  });

  it("should handle empty arrays", async () => {
    await expect(
      setupTables({
        prefix: "test",
        data: [
          { value: "a", items: [] },
          { value: "b", items: [] },
        ],
      }),
    ).resolves.toBeUndefined();
  });

  it("should create a simple table with integer values", async () => {
    await expect(
      setupTables({
        prefix: "test",
        data: [{ value: 1 }, { value: 2 }, { value: 3 }],
      }),
    ).resolves.toBeUndefined();
  });

  it("should create a table with mixed integer and real values", async () => {
    await expect(
      setupTables({
        prefix: "test",
        data: [{ value: 1 }, { value: 2.5 }, { value: 3 }],
      }),
    ).resolves.toBeUndefined();
  });

  it("should create a table with nullable fields when null values are present", async () => {
    await expect(
      setupTables({
        prefix: "test",
        data: [{ value: 1 }, { value: null }, { value: 3 }],
      }),
    ).resolves.toBeUndefined();
  });

  it("should create nested tables for arrays with foreign key relationships", async () => {
    await expect(
      setupTables({
        prefix: "test",
        data: [
          { value: "a", items: [{ value: 1 }, { value: 2 }, { value: 3 }] },
          { value: "b", items: [{ value: 4 }, { value: 5 }, { value: 6 }] },
        ],
      }),
    ).resolves.toBeUndefined();
  });

  it("should handle deeply nested arrays with multiple levels of relationships", async () => {
    await expect(
      setupTables({
        prefix: "test",
        data: [
          {
            value: "a",
            items: [{ elements: [{ value: true }, { value: false }] }],
          },
        ],
      }),
    ).resolves.toBeUndefined();
  });

  it("should generate migration for objects with different property names", async () => {
    await expect(
      setupTables({
        prefix: "test",
        data: [{ a: "a" }, { b: "b" }],
      }),
    ).resolves.toBeUndefined();
  });
});
