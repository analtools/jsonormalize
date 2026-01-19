import { setupTables } from "../../sqlite";
import { commands, optionalArgs, options, requiredArgs } from "../constants";
import { prepare } from "../prepare";
import { program } from "../program";

program
  .command(commands.setup.name("sqlite"))
  .description(commands.setup.description)
  .argument(requiredArgs.jsonPath.name, requiredArgs.jsonPath.description)
  .argument(optionalArgs.dbPath.name, optionalArgs.dbPath.description)
  .option(options.schema.name, options.schema.description)
  .action((...args: Parameters<typeof parseArgs>) =>
    setup(...parseArgs(...args)),
  );

function parseArgs(
  jsonPath: string,
  dbPath: string | undefined,
  options: {
    schema?: string;
  } = {},
): Parameters<typeof setup> {
  const schemaName = options.schema;

  return [{ jsonPath, dbPath, schemaName }];
}

export async function setup({
  jsonPath,
  dbPath,
  schemaName,
}: {
  jsonPath: string;
  dbPath?: string | undefined;
  schemaName?: string | string;
}) {
  const { data, prefix } = await prepare(jsonPath);

  await setupTables({
    path: dbPath,
    data,
    prefix,
    schemaName,
  });
}
