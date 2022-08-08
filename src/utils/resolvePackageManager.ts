import { PackageManager } from "./getPackageManager";

// The --yes is to automatically accept latest version prompt
// We use npx to install the latest version of scaffolding tools
function resolvePacakgeManager(packageManager: PackageManager) {
  return packageManager === "npm" ? "npx --yes" : packageManager;
}
export default resolvePacakgeManager;
