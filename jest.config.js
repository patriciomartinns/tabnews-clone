const nextJest = require("next/jest");
const dotenv = require("dotenv");

dotenv.config({
  path: ".env.development",
});

const createJestConfig = nextJest({
  dir: ".",
});

/** @type {import('jest').Config} */
const config = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 600000,
});

module.exports = config;
