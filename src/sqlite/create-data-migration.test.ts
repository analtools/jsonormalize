import { describe, expect, it } from "vitest";

import { createRelationalStructure } from "../create-relational-structure";
import { normalize } from "../normalize";
import { createDataMigration } from "./create-data-migration";

describe("sqlite/create-data-migration", () => {
  it("should handle empty input array", () => {
    expect(
      createDataMigration({ tables: createRelationalStructure("test", []) }),
    ).toMatchSnapshot();
  });

  it("should handle empty arrays", () => {
    expect(
      createDataMigration({
        tables: createRelationalStructure(
          "test",
          normalize([
            { value: "a", items: [] },
            { value: "b", items: [] },
          ]),
        ),
      }),
    ).toMatchSnapshot();
  });

  it("should create a simple table with integer values", () => {
    expect(
      createDataMigration({
        tables: createRelationalStructure("test", normalize([1, 2, 3])),
      }),
    ).toMatchSnapshot();
  });

  it("should create a table with mixed integer and real values", () => {
    expect(
      createDataMigration({
        tables: createRelationalStructure("test", [
          { item: 1 },
          { item: 2.5 },
          { item: 3 },
        ]),
      }),
    ).toMatchSnapshot();
  });

  it("should create a table with nullable fields when null values are present", () => {
    expect(
      createDataMigration({
        tables: createRelationalStructure("test", normalize([1, null, 3])),
      }),
    ).toMatchSnapshot();
  });

  it("should create nested tables for arrays with foreign key relationships", () => {
    expect(
      createDataMigration({
        tables: createRelationalStructure(
          "test",
          normalize([
            { value: "a", items: [1, 2, 3] },
            { value: "b", items: [4, 5, 6] },
          ]),
        ),
      }),
    ).toMatchSnapshot();
  });

  it("should handle deeply nested arrays with multiple levels of relationships", () => {
    expect(
      createDataMigration({
        tables: createRelationalStructure(
          "test",
          normalize([
            {
              value: "a",
              items: [{ elements: [true, false] }],
            },
          ]),
        ),
      }),
    ).toMatchSnapshot();
  });

  it("should generate migration for objects with different property names", () => {
    expect(
      createDataMigration({
        tables: createRelationalStructure(
          "test",
          normalize([{ a: "a" }, { b: "b" }]),
        ),
      }),
    ).toMatchSnapshot();
  });
});
