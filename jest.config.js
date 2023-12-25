/** @type {import('jest').Config} */
module.exports = {
  projects: [
    {
      displayName: "UNIT",
      testMatch: ["<rootDir>/src/**/*.test.ts"],
      transform: {
        "^.+\\.(t|j)sx?$": "@swc/jest",
      },
    },
    {
      displayName: "INTEGRATION",
      globalSetup: "<rootDir>/tests/setup.ts",
      globalTeardown: "<rootDir>/tests/teardown.ts",
      testMatch: ["<rootDir>/tests/**/*.test.ts"],
      transform: {
        "^.+\\.(t|j)sx?$": "@swc/jest",
      },
    },
  ],
};
