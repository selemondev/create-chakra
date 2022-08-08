#!/usr/bin/env node
import inquirer from "inquirer";
import readInput from "./cli/readInput";
import getPackageManager from "./utils/getPackageManager";
import logger from "./utils/logger";
import chalk from "chalk";
import fs from "fs-extra";
import installDependencies from "./cli/output/installDependencies";
import figlet from "figlet";
import createProject from "./cli/output/createProject.js";

async function main() {
  logger.info("\n");
  logger.higlight(
    figlet.textSync("create chakra", {
      font: "Mini",
    }),
  );

  logger.info(`\n${chalk.bold("Welcome to create-chakra!")}`);
  logger.success("The easiest way to create a Chakra project\n");

  const input = await readInput();
  const { projectDir, projectName } = input;
  const pkgManager = getPackageManager();

  logger.info(`\nUsing: ${chalk.cyan.bold(pkgManager)}\n`);

  if (fs.existsSync(projectDir)) {
    // Ask to overwrite
    const answer = await inquirer.prompt({
      name: "overwrite",
      type: "confirm",
      message: `${chalk.yellow.bold(`Directory already exists. Overwrite?`)}`,
    });

    if (!answer.overwrite) {
      logger.error("Aborting...");
      process.exit(1);
    }

    fs.removeSync(projectDir);
  }

  await createProject(input);
  await installDependencies(input);

  logger.info(`\nProject created in ${chalk.green.bold(projectDir)}\n`);
  logger.info(`${chalk.cyan.bold(`cd ${projectName}`)}`);
  logger.info(
    `${chalk.cyan.bold(
      `${getPackageManager()} ${
        getPackageManager() === "npm" ? "run" : ""
      } dev`,
    )}\n`,
  );
  logger.log("Happy hacking!");

  process.exit(0);
}

main().catch((e) => {
  logger.error(`\n${e}\n`);
  process.exit(1);
});
