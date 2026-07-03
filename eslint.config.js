// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
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
      // Angular-specific
      "@angular-eslint/directive-selector": [
        "error",
        { type: "attribute", prefix: "app", style: "camelCase" }
      ],
      "@angular-eslint/component-selector": [
        "error",
        { type: "element", prefix: "app", style: "kebab-case" }
      ],
      "@angular-eslint/prefer-on-push-component-change-detection": "error",
      "@angular-eslint/prefer-standalone": "error",
      "@angular-eslint/no-lifecycle-call": "error",
      "@angular-eslint/use-component-view-encapsulation": "warn",

      // TypeScript strict rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" }
      ],
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/no-inferrable-types": "warn",
      "@typescript-eslint/prefer-readonly": "off",

      // General best practices
      "no-console": ["error", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-var": "error",
      "eqeqeq": ["error", "always"],
      "no-duplicate-imports": "error",
      "no-template-curly-in-string": "warn",
      "no-throw-literal": "error",
      "no-unused-expressions": "off",
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error"
    }
  },
  {
    files: ["**/*.spec.ts"],
    rules: {
      // Relaxed rules for test files
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
      "@typescript-eslint/consistent-type-imports": "off"
    }
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility
    ],
    rules: {
      // Accessibility
      "@angular-eslint/template/click-events-have-key-events": "warn",
      "@angular-eslint/template/interactive-supports-focus": "warn",
      "@angular-eslint/template/alt-text": "error",
      "@angular-eslint/template/label-has-associated-control": "warn",
      "@angular-eslint/template/valid-aria": "error",
      "@angular-eslint/template/table-scope": "error",

      // Template best practices
      "@angular-eslint/template/no-negated-async": "error",
      "@angular-eslint/template/no-duplicate-attributes": "error",
      "@angular-eslint/template/conditional-complexity": ["warn", { maxComplexity: 3 }]
    }
  }
);
