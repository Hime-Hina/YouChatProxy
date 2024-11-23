/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */

module.exports = {
  arrowParens: 'always',
  singleQuote: true,
  printWidth: 90,
  semi: true,
  trailingComma: 'all',
  plugins: ['@ianvs/prettier-plugin-sort-imports'],

  // @ianvs/prettier-plugin-sort-imports plugin's options
  // https://github.com/IanVS/prettier-plugin-sort-imports#options
  importOrder: [
    '<TYPES>',
    '<TYPES>^[./~@]',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/(.*)$',
    '^@assets/(.*)$',
    '^@components/(.*)$',
    '^@utils/(.*)$',
    '^[./~]',
    '',
    '^(?!.*[.]css$)[./].*$',
    '.css$',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.3.3',
};
