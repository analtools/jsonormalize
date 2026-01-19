import * as fs from "node:fs";
import { EOL } from "node:os";

import { createMigrations } from "../../sqlite";
import { commands, options, requiredArgs } from "../constants";
import { prepare } from "../prepare";
import { program } from "../program";

program
  .command(commands.sql.name("sqlite"))
  .description(commands.sql.description)
  .argument(requiredArgs.jsonPath.name, requiredArgs.jsonPath.description)
  .argument(requiredArgs.sqlPath.name, requiredArgs.sqlPath.description)
  .option(options.schema.name, options.schema.description)
  .action((...args: Parameters<typeof parseArgs>) =>
    writeSqlScriptToFile(...parseArgs(...args)),
  );

function parseArgs(
  jsonPath: string,
  sqlPath: string,
  { schema: schemaName }: { schema?: string } = {},
): Parameters<typeof writeSqlScriptToFile> {
  return [
    {
      jsonPath,
      sqlPath,
      schemaName,
    },
  ];
}

export async function getSqlScript({
  jsonPath,
  schemaName,
}: {
  jsonPath: string;
  schemaName?: string | undefined;
}) {
  const { data, prefix } = await prepare(jsonPath);

  const { initialMigration, dataMigration } = createMigrations({
    prefix,
    data,
    schemaName,
  });

  return `${initialMigration}${EOL}${EOL}${dataMigration}`;
}

export async function writeSqlScriptToFile({
  jsonPath,
  sqlPath,
  schemaName,
}: {
  jsonPath: string;
  sqlPath: string;
  schemaName?: string | undefined;
}) {
  const sqlScript = await getSqlScript({ jsonPath, schemaName });

  fs.writeFileSync(sqlPath, sqlScript);
}
