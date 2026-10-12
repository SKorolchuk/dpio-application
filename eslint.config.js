import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import angular from "angular-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
    {
        ignores: ["dist/**", "coverage/**", "e2e-results/**", "node_modules/**"],
    },
    {
        files: ["**/*.ts"],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...tseslint.configs.stylistic,
            ...angular.configs.tsRecommended,
        ],
        processor: angular.processInlineTemplates,
        rules: {
            quotes: ["error", "double"],
            "no-var": "error",
            "prefer-const": "error",
            eqeqeq: ["error", "always", { null: "ignore" }],
            "no-eval": "error",
            "no-debugger": "error",
            "no-bitwise": "error",
            radix: "error",

            "no-console": ["error", { allow: ["log", "warn", "error"] }],

            "@angular-eslint/no-output-on-prefix": "error",
            "@angular-eslint/no-input-rename": "error",
            "@angular-eslint/no-output-rename": "error",
            "@angular-eslint/use-lifecycle-interface": "error",
            "@angular-eslint/use-pipe-transform-interface": "error",
            "@angular-eslint/component-class-suffix": "error",
            "@angular-eslint/directive-class-suffix": "error",

            "@angular-eslint/component-selector": [
                "error",
                {
                    type: "element",
                    prefix: "app",
                    style: "kebab-case",
                },
            ],
            "@angular-eslint/directive-selector": [
                "error",
                {
                    type: "attribute",
                    prefix: "app",
                    style: "camelCase",
                },
            ],
        },
    },
    {
        files: ["**/*.html"],
        extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
        rules: {},
    },
    {
        files: ["e2e/**/*.ts", "apps/**/*e2e/**/*.ts"],
        rules: {
            quotes: ["error", "single", { avoidEscape: true }],
        },
    },
    eslintConfigPrettier,
);
