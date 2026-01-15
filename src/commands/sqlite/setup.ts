import { setupTables } from "../../sqlite";
import { commands, optionalArgs, requiredArgs } from "../constants";
import { prepare } from "../prepare";
import { program } from "../program";

program
  .command(commands.setup.name("sqlite"))
  .description(commands.setup.description)
  .argument(requiredArgs.jsonPath.name, requiredArgs.jsonPath.description)
  .argument(optionalArgs.dbPath.name, optionalArgs.dbPath.description)
  .action(setup);

export async function setup(jsonPath: string, dbPath: string) {
  const { data, prefix } = await prepare(jsonPath);

  setupTables({
    path: dbPath,
    data,
    prefix,
  });
}
