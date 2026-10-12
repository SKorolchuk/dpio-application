import { pathsToModuleNameMapper } from "ts-jest";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tsconfig = JSON.parse(readFileSync(join(__dirname, "tsconfig.json"), "utf8"));
const compilerOptions = tsconfig.compilerOptions || {};

export default {
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
    coverageReporters: ["html", "text", "cobertura"],
    coverageDirectory: "coverage/test-report",
    transform: {
        "^.+\\.(ts|js|html)$": [
            "jest-preset-angular",
            {
                tsconfig: "<rootDir>/tsconfig.spec.json",
                stringifyContentPathRegex: "\\.(html|svg)$",
                processWithEsbuild: [],
            },
        ],
    },
    testPathIgnorePatterns: ["/node_modules/", "/dist/", "<rootDir>/e2e/", "<rootDir>/apps/e2e/"],
    transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
        prefix: "<rootDir>/",
    }),
};
