import { Command } from "commander";

export const program = new Command();

program
  .name("jsonormalize")
  .description(
    `JSONormalize — Transform any JSON into a relational database schema. Automatically normalizes nested structures, detects relationships, and generates SQLite migrations. Perfect for rapid prototyping, data migrations, and structured data workflows.`,
  );
