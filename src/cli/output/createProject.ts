import { UserInput } from "../config";
import { spawn } from "child_process";
import chalk from "chalk";
import logger from "../../utils/logger";

/**
 * Create and execute the command to install the project.
 *
 * @param input CLI input
 */
async function createProject(input: UserInput) {
  const { appConfig } = input;
  const command = appConfig.createInstallCommand(input);

  logger.info(
    `\nInstalling project using ${chalk.green(
      input.appConfig.scaffoldingTool,
    )}\n`,
  );

  if (typeof command === "string") {
    const child = spawn(command, {
      stdio: "inherit",
      shell: true,
    });

    await new Promise((resolve, reject) => {
      child.on("error", reject);
      child.on("close", (code) => {
        resolve(code);
      });
    });
  }

  if (typeof command === "function") {
    // @ts-ignore
    await command();
  }

  logger.log(
    `${chalk.bold.green("✔")} Project created using ${chalk.green.bold(
      appConfig.scaffoldingTool,
    )}`,
  );
}

export default createProject;
