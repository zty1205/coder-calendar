module.exports = {
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  proseWrap: 'never',
  bracketSpacing: true,
  trailingComma: 'none',
  printWidth: 120,
  htmlWhitespaceSensitivity: 'ignore',
  overrides: [
    {
      files: '*.wxml',
      options: {
        parser: 'html'
      }
    },
    {
      files: '*.wxss',
      options: {
        parser: 'css'
      }
    }
  ]
};
