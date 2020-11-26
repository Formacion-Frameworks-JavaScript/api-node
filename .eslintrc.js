module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: [
    "airbnb-base"
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    quotes: ["error", "double"],
    "no-console": "off",
    "comma-dangle": "off",
    "arrow-parens": "off",
    "no-unused-vars": "off",
    "no-else-return": "off",
    "no-plusplus": "off",
    "prefer-destructuring": "off",
    "no-use-before-define": "off",
    "no-restricted-syntax": "off",
    "no-shadow": "off",
    "no-underscore-dangle": "off",
    "func-names": "off",
    "max-len": "off",
    "consistent-return": "off",
    "space-before-function-paren": "off",
    "no-param-reassign": "off",
    "no-restricted-globals": "off"
  }
};