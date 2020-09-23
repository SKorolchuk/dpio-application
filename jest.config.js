const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");

module.exports = {
    preset: "jest-preset-angular",
    roots: [
        "<rootDir>/",
        "<rootDir>/apps/dpio-application/src/",
        "<rootDir>/libs/auth/src/",
        "<rootDir>/libs/core/src/",
        "<rootDir>/libs/shared/src/",
    ],
    testMatch: ["**/+(*.)+(spec).+(ts)"],
    setupFilesAfterEnv: ["<rootDir>/jest/test.ts"],
    collectCoverage: true,
    coverageReporters: ["html"],
    coverageDirectory: "coverage/my-app",
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
        prefix: "<rootDir>/",
    }),
};
