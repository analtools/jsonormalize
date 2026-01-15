import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";

import fetch from "node-fetch";

import { isURL, snakeCase } from "../utils";

const readFile = promisify(fs.readFile);

async function getRawData(jsonPath: string): Promise<unknown> {
  if (isURL(jsonPath)) {
    const file = await fetch(jsonPath);
    return file.json();
  } else {
    const file = (await readFile(jsonPath)).toString();
    return JSON.parse(file);
  }
}

export async function prepare(jsonPath: string) {
  const data = await getRawData(jsonPath);

  const jsonPathNameWithoutExt = path.basename(
    jsonPath,
    path.extname(jsonPath),
  );

  const prefix = snakeCase(jsonPathNameWithoutExt);

  return { data, prefix };
}
