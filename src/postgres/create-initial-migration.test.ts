import { describe, expect, it } from "vitest";

import { createRelationalStructure } from "../create-relational-structure";
import { normalize } from "../normalize";
import { createInitialMigration } from "./create-initial-migration";

describe("postgres/create-initial-migration", () => {
  it("should handle with schemaName", () => {
    expect(
      createInitialMigration({
        tables: createRelationalStructure(
          "test",
          normalize([
            { value: "a", items: [{ value: "a.1" }, { value: "a.2" }] },
            { value: "b", items: [{ value: "b.1" }] },
          ]),
        ),
        schemaName: "schema_test",
      }),
    ).toMatchSnapshot();
  });
});
