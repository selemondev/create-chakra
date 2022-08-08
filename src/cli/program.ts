import { Command } from "commander";
import { APP_NAME } from "../constants";
import getVersion from "../utils/getVersion";

const program = new Command().name(APP_NAME);

program
  .description("A CLI for quickly creating applications based on Chakra UI")
  .argument("[app]", "The name of the application")
  .option("--template <templateId>", "The template to use")
  .version(getVersion())
  .parse(process.argv);

export default program;
