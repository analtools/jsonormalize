# JSONormalize

[![GitHub stars](https://img.shields.io/github/stars/MrCheater/jsonormalize?style=for-the-badge&logo=github)](https://github.com/MrCheater/jsonormalize/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/MrCheater/jsonormalize?style=for-the-badge&logo=github)](https://github.com/MrCheater/jsonormalize/network)
[![GitHub issues](https://img.shields.io/github/issues/MrCheater/jsonormalize?style=for-the-badge&logo=github)](https://github.com/MrCheater/jsonormalize/issues)
[![GitHub license](https://img.shields.io/github/license/MrCheater/jsonormalize?style=for-the-badge)](https://github.com/MrCheater/jsonormalize/blob/main/LICENSE)
[![Test Coverage](https://raw.githubusercontent.com/MrCheater/jsonormalize/gh-pages/badge.svg)](https://mrcheater.github.io/jsonormalize/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Drizzle](https://img.shields.io/badge/Drizzle-1E88E5?style=for-the-badge&logo=drizzle&logoColor=white)](https://orm.drizzle.team/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![GitHub last commit](https://img.shields.io/github/last-commit/MrCheater/jsonormalize?style=for-the-badge&logo=git)](https://github.com/MrCheater/jsonormalize/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/MrCheater/jsonormalize?style=for-the-badge&logo=github)](https://github.com/MrCheater/jsonormalize)

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

- [`examples/simple/`](https://github.com/MrCheater/jsonormalize/tree/main/examples/simple/) - Basic data structures

- [`examples/complex/`](https://github.com/MrCheater/jsonormalize/tree/main/examples/complex/) - Real-world scenarios

- [`examples/edge-cases/`](https://github.com/MrCheater/jsonormalize/tree/main/examples/edge-cases/) - Special data patterns

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
curl -o example.json https://raw.githubusercontent.com/MrCheater/jsonormalize/main/examples/simple/users.json
````

### Generate SQLite migration

```sh
npx jsonormalize sqlite:setup ./example.json ./demo.sqlite3
```

### Or directly from URL (requires fetch support in your CLI)

```sh
npx jsonormalize sqlite:setup https://raw.githubusercontent.com/MrCheater/jsonormalize/main/examples/simple/users.json ./demo.db
```

### Using local JSON file

```sh
npx jsonormalize sqlite:setup ./data.json ./app.sqlite3
```

## ❓ Help

```
Usage: jsonormalize [options] [command]

JSONormalize — Transform any JSON into a relational database schema. Automatically normalizes nested structures, detects relationships, and generates SQLite
migrations. Perfect for rapid prototyping, data migrations, and structured data workflows.

Options:
  -h, --help                          display help for command

Commands:
  sqlite:setup <json-path> <db-path>  🗄️ Setup tables, indexes and seed with data from JSON
  sqlite:sql <json-path> <sql-path>   🛠️ Generate SQL for create tables, indexes and seed with data from JSON
  help [command]                      display help for command
```
