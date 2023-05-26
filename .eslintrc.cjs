module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    jsxPragma: "React",
    ecmaFeatures: {
      jsx: true
    }
  },
  globals: {
    AMap: false,
    AMapUI: false
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react/jsx-runtime"
    // "plugin:react-hooks/recommended"// 与vite自动引入配合有问题,舍弃
  ],
  overrides: [
    {
      files: ["**/*.tsx"],
      // react默认使用prop-types来检查类型
      // 如果使用了typescript，就把这个关掉，
      // 不然会报一些没有意义的错误
      rules: {
        "react/prop-types": "off",
        "react/jsx-no-undef": "off"
      }
    }
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      { endOfLine: "auto", trailingComma: "none" }
    ],
    // 不允许不必要的分号 https://eslint.org/docs/latest/rules/no-extra-semi#rule-details
    "no-extra-semi": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-empty-function": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }
    ],
    "space-before-function-paren": "off",
    "react/display-name": "off"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
