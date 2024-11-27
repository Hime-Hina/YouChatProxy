import js from '@eslint/js';
import json from '@eslint/json';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default [
  {
    ignores: [
      '**/node_modules/',
      '**/dist/',
      '**/public/',
      'browser_profiles/',
      '**/LICENSE',
    ],
  },
  {
    plugins: {
      json,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },

  {
    files: ['**/*.cjs', '**/*.mjs'],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: js.configs.recommended.rules,
  },

  // lint JSON files
  {
    files: ['**/*.json'],
    ignores: ['package-lock.json'],
    language: 'json/json',
    ...json.configs.recommended,
  },
  // lint JSONC files
  {
    files: ['**/*.jsonc'],
    language: 'json/jsonc',
    ...json.configs.recommended,
  },
  // lint JSON5 files
  {
    files: ['**/*.json5'],
    language: 'json/json5',
    ...json.configs.recommended,
  },

  eslintPluginPrettierRecommended,
];
