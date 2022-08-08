import path from "path";
import { fileURLToPath } from "url";

let __filename: any;

try {
  __filename = fileURLToPath(import.meta.url);
} catch (error) {
  throw error;
}

const distPath = path.dirname(__filename);

export const PKG_ROOT = path.join(distPath, "../");
export const APP_NAME = "create-chakra";

export const COMMON_TEMPLATES_ROOT = path.join(PKG_ROOT, "templates/common");
