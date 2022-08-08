import ora from "ora";
import { COMMON_TEMPLATES_ROOT } from "../../constants";
import { UserInput } from "../config";

/**
 * Install all Chakra dependencies, create config files and copy templates.
 *
 * @param input CLI input
 */
async function installChakra(input: UserInput) {
  if (input.appConfig.skipChakraInstall) {
    return;
  }

  await copyChakraTemplate(input);
  await deleteFiles(input);
}

async function copyChakraTemplate(input: UserInput) {
  const { appConfig } = input;
  const spinner = ora(`Copying Chakra template`).start();

  await appConfig.copyTemplate(input);
  spinner.succeed(`Added Chakra template`);
}

async function deleteFiles(input: UserInput) {
  const spinner = ora(`Deleting unneeded files`).start();

  await input.appConfig.deleteFiles?.(input);
  spinner.succeed("Deleted unneeded files");
}

export default installChakra;
