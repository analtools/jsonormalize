import { setupTables } from "../../sqlite";
import { prepare } from "../prepare";
import { program } from "../program";

program
  .command("sqlite:setup")
  .description("🗄️ Setup tables, indexes and seed with data from JSON")
  .argument(
    "<json-path>",
    "Path to JSON file with any data (table structure will be inferred)",
  )
  .argument(
    "<db-path>",
    "Path to SQLite database file or ':memory:' (no file, RAM only)",
  )
  .action(setup);

export async function setup(jsonPath: string, dbPath: string) {
  const { data, prefix } = await prepare(jsonPath);

  setupTables({
    path: dbPath,
    data,
    prefix,
  });
}
