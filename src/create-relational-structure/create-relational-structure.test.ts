import { describe, expect, it } from "vitest";

import { createRelationalStructure } from "./create-relational-structure";
import type { RelationalTable } from "./types.ts";

describe("create-relational-structure", () => {
  it("should handle empty input array", () => {
    expect(createRelationalStructure("test", [])).toEqual([
      {
        name: "test",
        fields: [
          {
            isPrimaryKey: true,
            key: "normalize_id",
            type: "integer",
          },
        ],
        data: [],
      },
    ] satisfies RelationalTable[]);
  });

  it("should handle empty arrays", () => {
    expect(
      createRelationalStructure("test", [
        { value: true, items: [] },
        { value: false, items: [] },
      ]),
    ).toEqual([
      {
        name: "test",
        fields: [
          {
            isPrimaryKey: true,
            key: "normalize_id",
            type: "integer",
          },
          {
            key: "value",
            type: "boolean",
          },
        ],
        data: [
          { normalize_id: 0, value: true },
          { normalize_id: 1, value: false },
        ],
      },
      {
        data: [],
        fields: [
          {
            isPrimaryKey: true,
            key: "normalize_id",
            type: "integer",
          },
          {
            reference: {
              key: "normalize_id",
              table: "test",
            },
            key: "normalize_parent_id",
            type: "integer",
          },
        ],
        name: "test_items",
      },
    ] satisfies RelationalTable[]);
  });

  it("should create a simple table with integer values", () => {
    expect(
      createRelationalStructure("test", [
        { value: 1 },
        { value: 2 },
        { value: 3 },
      ]),
    ).toEqual([
      {
        name: "test",
        fields: [
          {
            isPrimaryKey: true,
            key: "normalize_id",
            type: "integer",
          },
          {
            key: "value",
            type: "integer",
          },
        ],
        data: [
          { normalize_id: 0, value: 1 },
          { normalize_id: 1, value: 2 },
          { normalize_id: 2, value: 3 },
        ],
      },
    ] satisfies RelationalTable[]);
  });

  it("should create a table with mixed integer and real values", () => {
    expect(
      createRelationalStructure("test", [
        { value: 1 },
        { value: 2.5 },
        { value: 3 },
      ]),
    ).toEqual([
      {
        name: "test",
        fields: [
          {
            isPrimaryKey: true,
            key: "normalize_id",
            type: "integer",
          },
          {
            key: "value",
            type: "real",
          },
        ],
        data: [
          { normalize_id: 0, value: 1 },
          { normalize_id: 1, value: 2.5 },
          { normalize_id: 2, value: 3 },
        ],
      },
    ] satisfies RelationalTable[]);
  });

  it("should create a table with nullable fields when null values are present", () => {
    expect(
      createRelationalStructure("test", [
        { value: 1 },
        { value: null },
        { value: 3 },
      ]),
    ).toEqual([
      {
        name: "test",
        fields: [
          {
            isPrimaryKey: true,
            key: "normalize_id",
            type: "integer",
          },
          {
            isNullable: true,
            key: "value",
            type: "integer",
          },
        ],
        data: [
          { normalize_id: 0, value: 1 },
          { normalize_id: 1, value: null },
          { normalize_id: 2, value: 3 },
        ],
      },
    ] satisfies RelationalTable[]);
  });

  it("should create nested tables for arrays with foreign key relationships", () => {
    expect(
      createRelationalStructure("test", [
        {
          value: "a",
          items: [
            {
              value: 1,
              elements: [{ value: true }, { value: false }, { value: true }],
            },
            {
              value: 2,
              elements: [{ value: false }, { value: true }, { value: false }],
            },
            {
              value: 3,
              elements: [{ value: true }, { value: false }, { value: true }],
            },
          ],
        },
        {
          value: "b",
          items: [
            {
              value: 4,
              elements: [{ value: false }, { value: true }, { value: false }],
            },
            {
              value: 5,
              elements: [{ value: true }, { value: false }, { value: true }],
            },
            {
              value: 6,
              elements: [{ value: false }, { value: true }, { value: false }],
            },
          ],
        },
      ]),
    ).toEqual([
      {
        name: "test",
        fields: [
          {
            isPrimaryKey: true,
            key: "normalize_id",
            type: "integer",
          },
          {
            key: "value",
            type: "text",
          },
        ],
        data: [
          { normalize_id: 0, value: "a" },
          { normalize_id: 1, value: "b" },
        ],
      },
      {
        name: "test_items",
        fields: [
          {
            isPrimaryKey: true,
            key: "normalize_id",
            type: "integer",
          },
          {
            key: "normalize_parent_id",
            type: "integer",
            reference: { key: "normalize_id", table: "test" },
          },
          {
            key: "value",
            type: "integer",
          },
        ],
        data: [
          { normalize_parent_id: 0, normalize_id: 0, value: 1 },
          { normalize_parent_id: 0, normalize_id: 1, value: 2 },
          { normalize_parent_id: 0, normalize_id: 2, value: 3 },
          { normalize_parent_id: 1, normalize_id: 3, value: 4 },
          { normalize_parent_id: 1, normalize_id: 4, value: 5 },
          { normalize_parent_id: 1, normalize_id: 5, value: 6 },
        ],
      },
      {
        name: "test_items_elements",
        fields: [
          {
            isPrimaryKey: true,
            key: "normalize_id",
            type: "integer",
          },
          {
            key: "normalize_parent_id",
            reference: {
              key: "normalize_id",
              table: "test_items",
            },
            type: "integer",
          },
          {
            key: "value",
            type: "boolean",
          },
        ],
        data: [
          {
            normalize_id: 0,
            normalize_parent_id: 0,
            value: true,
          },
          {
            normalize_id: 1,
            normalize_parent_id: 0,
            value: false,
          },
          {
            normalize_id: 2,
            normalize_parent_id: 0,
            value: true,
          },
          {
            normalize_id: 3,
            normalize_parent_id: 1,
            value: false,
          },
          {
            normalize_id: 4,
            normalize_parent_id: 1,
            value: true,
          },
          {
            normalize_id: 5,
            normalize_parent_id: 1,
            value: false,
          },
          {
            normalize_id: 6,
            normalize_parent_id: 2,
            value: true,
          },
          {
            normalize_id: 7,
            normalize_parent_id: 2,
            value: false,
          },
          {
            normalize_id: 8,
            normalize_parent_id: 2,
            value: true,
          },
          {
            normalize_id: 9,
            normalize_parent_id: 3,
            value: false,
          },
          {
            normalize_id: 10,
            normalize_parent_id: 3,
            value: true,
          },
          {
            normalize_id: 11,
            normalize_parent_id: 3,
            value: false,
          },
          {
            normalize_id: 12,
            normalize_parent_id: 4,
            value: true,
          },
          {
            normalize_id: 13,
            normalize_parent_id: 4,
            value: false,
          },
          {
            normalize_id: 14,
            normalize_parent_id: 4,
            value: true,
          },
          {
            normalize_id: 15,
            normalize_parent_id: 5,
            value: false,
          },
          {
            normalize_id: 16,
            normalize_parent_id: 5,
            value: true,
          },
          {
            normalize_id: 17,
            normalize_parent_id: 5,
            value: false,
          },
        ],
      },
    ] satisfies RelationalTable[]);
  });

  it("should handle deeply nested arrays with multiple levels of relationships", () => {
    expect(
      createRelationalStructure("test", [
        {
          value: "a",
          items: [{ elements: [{ value: 1 }, { value: 2 }, { value: 3 }] }],
        },
      ]),
    ).toEqual([
      {
        name: "test",
        fields: [
          {
            isPrimaryKey: true,
            key: "normalize_id",
            type: "integer",
          },
          {
            key: "value",
            type: "text",
          },
        ],
        data: [{ normalize_id: 0, value: "a" }],
      },
      {
        name: "test_items",
        fields: [
          {
            isPrimaryKey: true,
            key: "normalize_id",
            type: "integer",
          },
          {
            key: "normalize_parent_id",
            type: "integer",
            reference: { key: "normalize_id", table: "test" },
          },
        ],
        data: [{ normalize_parent_id: 0, normalize_id: 0 }],
      },
      {
        name: "test_items_elements",
        fields: [
          {
            isPrimaryKey: true,
            key: "normalize_id",
            type: "integer",
          },
          {
            key: "normalize_parent_id",
            type: "integer",
            reference: { key: "normalize_id", table: "test_items" },
          },
          {
            key: "value",
            type: "integer",
          },
        ],
        data: [
          { normalize_parent_id: 0, normalize_id: 0, value: 1 },
          { normalize_parent_id: 0, normalize_id: 1, value: 2 },
          { normalize_parent_id: 0, normalize_id: 2, value: 3 },
        ],
      },
    ] satisfies RelationalTable[]);
  });
});
