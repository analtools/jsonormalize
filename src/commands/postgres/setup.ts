import type { ClientConfig } from "pg";

import { setupTables } from "../../postgres";
import { commands, optionalArgs, requiredArgs } from "../constants";
import { prepare } from "../prepare";
import { program } from "../program";

program
  .command(commands.setup.name("postgres"))
  .description(commands.setup.description)
  .argument(requiredArgs.jsonPath.name, requiredArgs.jsonPath.description)
  .argument(optionalArgs.dbPath.name, optionalArgs.dbPath.description)
  .option("--user <user>", "default process.env.PGUSER || process.env.USER")
  .option("--password <password>", "default process.env.PGPASSWORD")
  .option("--host <host>", "default process.env.PGHOST")
  .option("--port <port>", "default process.env.PGPORT")
  .option("--database <database>", "default process.env.PGDATABASE || user")
  .option(
    "--connection-string <connectionString>",
    "e.g. postgres://user:password@host:5432/database",
  )
  .option(
    "--ssl <ssl>",
    "passed directly to node.TLSSocket, supports all tls.connect options",
  )
  .option(
    "--statement-timeout <statementTimeout>",
    "number of milliseconds before a statement in query will time out, default is no timeout",
  )
  .option(
    "--query-timeout <queryTimeout>",
    "number of milliseconds before a query call will timeout, default is no timeout",
  )
  .option(
    "--lock-timeout <lockTimeout>",
    "number of milliseconds a query is allowed to be en lock state before it's cancelled due to lock timeout",
  )
  .option(
    "--application-name <applicationName>",
    "The name of the application that created this Client instance",
  )
  .option(
    "--connection-timeout-millis <connectionTimeoutMillis>",
    "number of milliseconds to wait for connection, default is no timeout",
  )
  .option(
    "--keep-alive-initial-delay-millis <keepAliveInitialDelayMillis>",
    "set the initial delay before the first keepalive probe is sent on an idle socket",
  )
  .option(
    "--idle-in-transaction-session-timeout <idleInTransactionSessionTimeout>",
    "number of milliseconds before terminating any session with an open idle transaction, default is no timeout",
  )
  .option(
    "--client-encoding <clientEncoding>",
    "specifies the character set encoding that the database uses for sending data to the client",
  )
  .option(
    "--fallback-application-name <fallbackApplicationName>",
    "provide an application name to use if application_name is not set",
  )
  .option(
    "--options <options>",
    "command-line options to be sent to the server",
  )
  .action(setup);

function getNumberOption(value: string | undefined): number | undefined {
  return value === undefined ? undefined : Number(value);
}

function getSslOption(value: any): ClientConfig["ssl"] {
  try {
    return JSON.parse(value);
  } catch {
    return value == "true" ? true : undefined;
  }
}

export async function setup(
  jsonPath: string,
  dbPath: string | undefined,
  options: {
    user?: string;
    password?: string;
    host?: string;
    port?: string;
    database?: string;
    connectionString?: string;
    ssl?: string;
    statementTimeout?: string;
    queryTimeout?: string;
    lockTimeout?: string;
    applicationName?: string;
    connectionTimeoutMillis?: string;
    keepAliveInitialDelayMillis?: string;
    idleInTransactionSessionTimeout?: string;
    clientEncoding?: string;
    fallbackApplicationName?: string;
    options?: string;
  } = {},
) {
  const config: ClientConfig | undefined =
    dbPath === undefined && Object.keys(options).length
      ? {
          user: options.user,
          password: options.password,
          host: options.host,
          port: getNumberOption(options.port),
          database: options.database,
          connectionString: options.connectionString,
          statement_timeout: getNumberOption(options.statementTimeout),
          ssl: getSslOption(options.ssl),
          query_timeout: getNumberOption(options.queryTimeout),
          lock_timeout: getNumberOption(options.lockTimeout),
          application_name: options.applicationName,
          connectionTimeoutMillis: getNumberOption(
            options.connectionTimeoutMillis,
          ),
          keepAliveInitialDelayMillis: getNumberOption(
            options.keepAliveInitialDelayMillis,
          ),
          idle_in_transaction_session_timeout: getNumberOption(
            options.idleInTransactionSessionTimeout,
          ),
          client_encoding: options.clientEncoding,
          fallback_application_name: options.fallbackApplicationName,
          options: options.options,
        }
      : undefined;

  const { data, prefix } = await prepare(jsonPath);

  await setupTables({
    config,
    path: dbPath,
    data,
    prefix,
  });
}
