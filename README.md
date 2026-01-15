# JSONormalize

[![GitHub stars](https://img.shields.io/github/stars/analtools/jsonormalize?style=for-the-badge&logo=github)](https://github.com/analtools/jsonormalize/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/analtools/jsonormalize?style=for-the-badge&logo=github)](https://github.com/analtools/jsonormalize/network)
[![GitHub issues](https://img.shields.io/github/issues/analtools/jsonormalize?style=for-the-badge&logo=github)](https://github.com/analtools/jsonormalize/issues)
[![GitHub license](https://img.shields.io/github/license/analtools/jsonormalize?style=for-the-badge)](https://github.com/analtools/jsonormalize/blob/main/LICENSE)
[![Test Coverage](https://raw.githubusercontent.com/analtools/jsonormalize/gh-pages/badge.svg)](https://analtools.github.io/jsonormalize/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Drizzle](https://img.shields.io/badge/Drizzle-1E88E5?style=for-the-badge&logo=drizzle&logoColor=white)](https://orm.drizzle.team/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![GitHub last commit](https://img.shields.io/github/last-commit/analtools/jsonormalize?style=for-the-badge&logo=git)](https://github.com/analtools/jsonormalize/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/analtools/jsonormalize?style=for-the-badge&logo=github)](https://github.com/analtools/jsonormalize)

## 🚀 Description

**JSONormalize** is a powerful toolkit that transforms arbitrary JSON data structures into fully functional relational database schemas. It automates the normalization process of denormalized JSON data into properly structured relational database tables.

## 🔄 Planned Database Support

Currently supports **SQLite** with plans to expand to PostgreSQL, MySQL, and other databases in future releases.

✅ SQLite (current)

⏳ PostgreSQL (coming soon)

⏳ MySQL (planned)

⏳ Other databases (future releases)

## 🎯 Core Features

📊 Schema Generation: Convert any JSON structure into normalized SQL schemas

🗄️ Database Creation: Generate SQLite database files or SQL scripts

🔧 Data Normalization: Automatically identify and extract relationships from nested JSON

📈 Future Support: SQLite first, with PostgreSQL and other databases planned

## 📂 Example Structure

Check out the examples/ directory for ready-to-use JSON samples:

- [`examples/simple/`](https://github.com/analtools/jsonormalize/tree/main/examples/simple/) - Basic data structures

- [`examples/complex/`](https://github.com/analtools/jsonormalize/tree/main/examples/complex/) - Real-world scenarios

- [`examples/edge-cases/`](https://github.com/analtools/jsonormalize/tree/main/examples/edge-cases/) - Special data patterns

## 📦 Installation

```sh
npm install jsonormalize
# or
yarn add jsonormalize
# or
pnpm add jsonormalize
```

## 🚀 Quick Start

### Download an example JSON file

````bash
```sh
curl -o example.json https://raw.githubusercontent.com/analtools/jsonormalize/main/examples/simple/users.json
````

### Generate SQLite migration

```sh
npx jsonormalize sqlite:setup ./example.json ./demo.sqlite3
```

### Or directly from URL (requires fetch support in your CLI)

```sh
npx jsonormalize sqlite:setup https://raw.githubusercontent.com/analtools/jsonormalize/main/examples/simple/users.json ./demo.db
```

### Using local JSON file

```sh
npx jsonormalize sqlite:setup ./data.json ./app.sqlite3
```

## ❓ Help

### CLI

```
Usage: jsonormalize [options] [command]

JSONormalize — Transform any JSON into a relational database schema. Automatically normalizes nested structures, detects relationships, and generates SQLite
migrations. Perfect for rapid prototyping, data migrations, and structured data workflows.

Options:
  -h, --help                                      display help for command

Commands:
  postgres:setup [options] <json-path> [db-path]  🗄️ Setup tables, indexes and seed with data from JSON
  postgres:sql <json-path> <sql-path>             🛠️ Generate SQL for create tables, indexes and seed with data from JSON
  sqlite:setup <json-path> [db-path]              🗄️ Setup tables, indexes and seed with data from JSON
  sqlite:sql <json-path> <sql-path>               🛠️ Generate SQL for create tables, indexes and seed with data from JSON
  help [command]                                  display help for command
```

### Command "jsonormalize postgres:setup"

```
Usage: jsonormalize postgres:setup [options] <json-path> [db-path]

🗄️ Setup tables, indexes and seed with data from JSON

Arguments:
  json-path                                                                Path to JSON file with any data (table structure will be inferred)
  db-path                                                                  Path to the database file or ':memory:' (no file, RAM only)

Options:
  --user <user>                                                            default process.env.PGUSER || process.env.USER
  --password <password>                                                    default process.env.PGPASSWORD
  --host <host>                                                            default process.env.PGHOST
  --port <port>                                                            default process.env.PGPORT
  --database <database>                                                    default process.env.PGDATABASE || user
  --connection-string <connectionString>                                   e.g. postgres://user:password@host:5432/database
  --ssl <ssl>                                                              passed directly to node.TLSSocket, supports all tls.connect options
  --statement-timeout <statementTimeout>                                   number of milliseconds before a statement in query will time out, default is no
                                                                           timeout
  --query-timeout <queryTimeout>                                           number of milliseconds before a query call will timeout, default is no timeout
  --lock-timeout <lockTimeout>                                             number of milliseconds a query is allowed to be en lock state before it's cancelled
                                                                           due to lock timeout
  --application-name <applicationName>                                     The name of the application that created this Client instance
  --connection-timeout-millis <connectionTimeoutMillis>                    number of milliseconds to wait for connection, default is no timeout
  --keep-alive-initial-delay-millis <keepAliveInitialDelayMillis>          set the initial delay before the first keepalive probe is sent on an idle socket
  --idle-in-transaction-session-timeout <idleInTransactionSessionTimeout>  number of milliseconds before terminating any session with an open idle transaction,
                                                                           default is no timeout
  --client-encoding <clientEncoding>                                       specifies the character set encoding that the database uses for sending data to the
                                                                           client
  --fallback-application-name <fallbackApplicationName>                    provide an application name to use if application_name is not set
  --options <options>                                                      command-line options to be sent to the server
  -h, --help                                                               display help for command
```
