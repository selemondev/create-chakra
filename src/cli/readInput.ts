import validateProjectName from "../utils/validateAppName";
import chalk from "chalk";
import inquirer from "inquirer";
import path from "path";
import getPackageManager from "../utils/getPackageManager";
import logger from "../utils/logger";
import program from "./program";
import {
  TemplateId,
  supportedTemplateIds,
  UserInput,
  NEXTJS_CONFIG,
  getConfig,
  supportedDependencies,
  Language,
} from "./config";

const DEFAULTS: UserInput = {
  projectName: "chakra-app",
  dependencies: [],
  packageManager: getPackageManager(),
  projectDir: "",
  appConfig: NEXTJS_CONFIG,
};

type PackageManager = "npm" | "yarn" | "pnpm";

async function readInput() {
  const input = { ...DEFAULTS };
  const { template: templateId } = program.opts();

  // Get project name from the first argument or prompt for it
  input.projectName = program.args[0] ?? (await readProjectName());

  // If template id was provided in options, check if it is supported
  // If not, prompt for template id interactively
  if (await checkTemplateSupport(templateId)) {
    const config = getConfig(templateId);

    if (!config) {
      throw new Error(`Unknown template id: ${templateId}`);
    }

    input.appConfig = config;
  } else {
    // We filter out the TS templates, since we select the language in the next step
    const tid = await readTemplateId(
      supportedTemplateIds.filter((id) => !id.includes("ts")),
    );
    console.log("tid", tid);
    const language = await readLanguage();
    const templateIdKey = `${tid}${language === "ts" ? "-ts" : ""}`;
    console.log("templateIdKey", templateIdKey);
    const config = getConfig(templateIdKey);

    if (!config) {
      throw new Error(`Unknown template id: ${templateIdKey}`);
    }

    input.appConfig = config;
  }

  input.dependencies = await readDependencies();
  input.packageManager = await readPackageManager();
  input.projectDir = path.resolve(process.cwd(), input.projectName);

  return input;
}

async function readProjectName() {
  const { projectName } = await inquirer.prompt<Pick<UserInput, "projectName">>(
    {
      name: "projectName",
      type: "input",
      message: "Project name",
      default: DEFAULTS.projectName,
      validate: validateProjectName,
      transformer: (i: string) => {
        return i.trim();
      },
    },
  );

  return projectName;
}

async function readTemplateId(types: TemplateId[]) {
  const { templateId } = await inquirer.prompt<{
    templateId: string;
  }>({
    name: "templateId",
    type: "list",
    message: "App type",
    choices: types.map((t) => ({
      name: getConfig(t)?.displayName,
      value: t,
    })),
    default: "nextjs",
  });

  return templateId;
}

async function readDependencies() {
  const { dependencies } = await inquirer.prompt<
    Pick<UserInput, "dependencies">
  >({
    name: "dependencies",
    type: "checkbox",
    message: "Which dependencies would you like to include?",
    choices: supportedDependencies.map((dependency) => ({
      name: dependency,
      checked: false,
    })),
  });

  return dependencies;
}

async function readLanguage() {
  const { language } = await inquirer.prompt<{ language: Language }>({
    name: "language",
    type: "list",
    message: "What language will your project be written in?",
    choices: [
      { name: "TypeScript", value: "ts", short: "ts" },
      { name: "JavaScript", value: "js", short: "js" },
    ],
    default: "typescript",
  });

  return language;
}

async function readPackageManager() {
  const { packageManager } = await inquirer.prompt<{
    packageManager: PackageManager;
  }>({
    name: "packageManager",
    type: "list",
    message: "What package manager do you prefer?",
    choices: [
      { name: "npm", value: "npm" },
      { name: "yarn", value: "yarn" },
      { name: "pnpm", value: "pnpm" },
    ],
    default: "npm",
  });

  return packageManager;
}

/**
 * Check if the template provided in options is supported
 * @param templateId the id of the template to check i.e. "nextjs", "vanilla-ts", etc.
 * @returns true if the template is supported, false otherwise
 */
async function checkTemplateSupport(templateId: string) {
  const templateSupported = supportedTemplateIds.includes(
    templateId as TemplateId,
  );

  if (templateId && !templateSupported) {
    logger.error(`Unknown template: ${templateId}\n`);
    logger.info(
      `Currently supported templates:\n${chalk.green(
        supportedTemplateIds.join("\n"),
      )}`,
    );
    logger.info(
      `You can skip passing the template and select it interactively.\n`,
    );

    const answer = await inquirer.prompt({
      name: "continue",
      type: "confirm",
      message: "Would you like to continue with interactive mode?",
    });

    if (!answer.continue) {
      process.exit(1);
    }
  }

  return templateSupported;
}

export default readInput;
