/** @type {import("eslint").Linter.Config} */

module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2024: true,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['**/*.cjs', '**/*.mjs'],
      env: {
        node: true,
      },
    },
    {
      files: ['**/*.json'],
      extends: ['plugin:json/recommended'],
      rules: {
        'json/*': ['error', { allowComments: true }],
      },
    },
  ],
};
