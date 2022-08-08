import execAsync from "./execAsync";
import { PackageManager } from "./getPackageManager";

interface Options {
  packageManager: PackageManager;
  dev: boolean;
  projectDir: string;
  packages: string[];
}

async function installPackages(options: Options) {
  const { packageManager, dev, projectDir, packages } = options;

  if (!packages.length) {
    return;
  }

  const installCommand = packageManager === "npm" ? "install" : "add";
  const cmd = `${
    packageManager as string
  } ${installCommand} ${packages.join(" ")}`;

  await execAsync(cmd, { cwd: projectDir });
}

export default installPackages;
