import { EOL } from "node:os";

import type { RelationalTable } from "../create-relational-structure";
import { getFullTableName } from "../utils";
import { escapeValue } from "./escape-value";

export function createDataMigration({
  tables,
  schemaName,
}: {
  tables: RelationalTable[];
  schemaName?: string | undefined;
}): string {
  return tables
    .filter((table) => table.data.length > 0)
    .map((table) => {
      const keys = table.fields.map(({ key }) => key);
      return [
        `INSERT INTO ${getFullTableName({ tableName: table.name, schemaName })} (${keys.join(", ")}) VALUES`,
        `${table.data
          .map((row) => {
            const values = keys.map((key) => row[key]);
            return `  (${values.map((value) => escapeValue(value)).join(", ")})`;
          })
          .join(`,${EOL}`)};`,
      ].join(EOL);
    })
    .join(`${EOL}${EOL}`);
}
