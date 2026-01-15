export const requiredArgs = {
  jsonPath: {
    name: "<json-path>",
    description:
      "Path to JSON file with any data (table structure will be inferred)",
  },
  sqlPath: { name: "<sql-path>", description: "Path to .sql file" },
  dbPath: {
    name: "<db-path>",
    description: "Path to the database file or ':memory:' (no file, RAM only)",
  },
} as const satisfies Record<string, { name: string; description: string }>;

export const optionalArgs = Object.fromEntries(
  Object.entries(requiredArgs).map(([key, { name, description }]) => [
    key,
    { name: name.replace(/^<(.*)>$/, `[$1]`), description },
  ]),
) as {
  [K in keyof typeof requiredArgs]: {
    name: (typeof requiredArgs)[K]["name"] extends `<${infer TName}>`
      ? `[${TName}]`
      : (typeof requiredArgs)[K]["name"];
    description: (typeof requiredArgs)[K]["description"];
  };
};

export const commands = {
  sql: {
    name: (prefix: string) => `${prefix}:sql`,
    description:
      "🛠️ Generate SQL for create tables, indexes and seed with data from JSON",
  },
  setup: {
    name: (prefix: string) => `${prefix}:setup`,
    description: "🗄️ Setup tables, indexes and seed with data from JSON",
  },
} as const;
