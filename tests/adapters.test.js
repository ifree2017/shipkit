#!/usr/bin/env node
import { spawnSync } from "node:child_process";
const result = spawnSync(process.execPath, ["tests/run-tests.js", "adapters"], { stdio: "inherit" });
process.exit(result.status ?? 1);
