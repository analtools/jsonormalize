import { createRelationalStructure } from "../create-relational-structure";
import { normalize } from "../normalize";
import { createDataMigration } from "./create-data-migration";
import { createInitialMigration } from "./create-initial-migration";

export function createMigrations({
  prefix,
  data,
  schemaName,
}: {
  prefix: string;
  data: unknown;
  schemaName?: string | undefined;
}) {
  const tables = createRelationalStructure(prefix, normalize(data));

  return {
    initialMigration: createInitialMigration({ tables, schemaName }),
    dataMigration: createDataMigration({ tables, schemaName }),
  };
}
