import path from "node:path";
import { fileURLToPath } from "node:url";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const ROOT = path.resolve(__dirname, "..");
export const GATES_DIR = path.join(ROOT, "gates");
