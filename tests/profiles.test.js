#!/usr/bin/env node
import { spawnSync } from "node:child_process";
const result = spawnSync(process.execPath, ["tests/run-tests.js", "profiles"], { stdio: "inherit" });
process.exit(result.status ?? 1);
