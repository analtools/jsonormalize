import { Database } from "sqlite3";
import { promisify } from "util";

import { createMigrations } from "./create-migrations";

export async function setupTables({
  path = ":memory:",
  prefix,
  data,
}: {
  path?: string;
  prefix: string;
  data: unknown;
  schemaName?: string | undefined;
}) {
  const { initialMigration, dataMigration } = createMigrations({
    prefix,
    data,
  });

  const db = new Database(path);

  const exec = promisify(db.exec).bind(db);
  const close = promisify(db.close).bind(db);

  await exec(initialMigration);

  await exec(dataMigration);

  await close();
}
