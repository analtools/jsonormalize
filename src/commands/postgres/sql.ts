import * as fs from "node:fs";
import { EOL } from "node:os";

import { createMigrations } from "../../postgres";
import { commands, requiredArgs } from "../constants";
import { prepare } from "../prepare";
import { program } from "../program";

program
  .command(commands.sql.name("postgres"))
  .description(commands.sql.description)
  .argument(requiredArgs.jsonPath.name, requiredArgs.jsonPath.description)
  .argument(requiredArgs.sqlPath.name, requiredArgs.sqlPath.description)
  .action(sql);

export async function sql(jsonPath: string, sqlPath: string) {
  const { data, prefix } = await prepare(jsonPath);

  const { initialMigration, dataMigration } = createMigrations({
    prefix,
    data,
  });

  fs.writeFileSync(sqlPath, `${initialMigration}${EOL}${EOL}${dataMigration}`);
}
