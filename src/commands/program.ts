import { Command } from "commander";

import { description } from "./constants";
export const program = new Command();

program.name("jsonormalize").description(description);
