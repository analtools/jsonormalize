import { PGlite } from "@electric-sql/pglite";
import { Client, type ClientConfig } from "pg";

import { createMigrations } from "./create-migrations";

export async function setupTables({
  config,
  path,
  prefix,
  data,
}: {
  config?: ClientConfig;
  path?: string;
  prefix: string;
  data: unknown;
}) {
  const { initialMigration, dataMigration } = createMigrations({
    prefix,
    data,
  });

  if (config) {
    const db = new Client(config);

    await db.connect();

    await db.query(initialMigration);
    await db.query(dataMigration);

    await db.end();
  } else {
    const db = new PGlite(path);

    await db.exec(initialMigration);
    await db.exec(dataMigration);

    await db.close();
  }
}
