import { executeCheck } from "../lib/gates.js";

export function checkCommand(requested = "default", flags = {}) {
  executeCheck(requested, flags);
}
