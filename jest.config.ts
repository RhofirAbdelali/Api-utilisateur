import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  verbose: true,
  clearMocks: true,
  resetMocks: true,
  setupFiles: ["dotenv/config"],
};

export default config;
