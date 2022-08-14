import fs from "fs-extra";
import ora from "ora";
import path from "path";
import { COMMON_TEMPLATES_ROOT } from "../../constants";
import installPackages from "../../utils/installPackages";
import { UserInput } from "../config";

/**
 * Install dependencies for the project.
 *
 * @param input CLI input
 * @param projectDir Path to the project directory
 */
export default async function installDependencies(input: UserInput) {
  const { projectDir, packageManager, appConfig } = input;
  const { templateId } = appConfig;

  const devDependencies = input.dependencies.filter(
    (d: string) => dependenciesMap[d] === "dev",
  );
  const dependencies = input.dependencies.filter(
    (d: string) => dependenciesMap[d] === "dependencies",
  );

  const template = templateId.includes("vue") ? "vue" : "react";

  const packages: string[] | null = template === "react" ? [
    "@chakra-ui/react",
    "@emotion/react",
    "@emotion/styled",
    "framer-motion",
  ] : [
    "@chakra-ui/vue-next",
    "@vueuse/shared",
    "@emotion/css",
    "@chakra-ui/vue-system",
  ];

  const spinner = ora(`Installing dependencies`).start();

  await installPackages({
    dev: true,
    projectDir,
    packageManager,
    packages: devDependencies,
  });

  await installPackages({
    dev: false,
    projectDir,
    packageManager,
    packages: [...packages, ...dependencies],
  });

  spinner.succeed(`Dependencies installed`);

  // If prettier is in dependencies create prettier config and prettier ignore files
  if (devDependencies.includes("prettier")) {
    const rc = path.join(COMMON_TEMPLATES_ROOT, ".prettierrc");
    const ignore = path.join(COMMON_TEMPLATES_ROOT, ".prettierignore");

    spinner.start(`Creating .prettierrc and .prettierignore`).start();
    await fs.copy(rc, path.join(projectDir, ".prettierrc"));
    await fs.copy(ignore, path.join(projectDir, ".prettierignore"));
    spinner.succeed(`.prettierrc and .prettierignore created`);
  }
}

const dependenciesMap: Record<string, "dev" | "dependencies"> = {
  prettier: "dev",
  clsx: "dependencies",
};
