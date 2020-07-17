module.exports = {
  extends: ['airbnb-typescript/base', 'prettier/@typescript-eslint'],
  plugins: ['prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'prettier/prettier': ['error'],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/naming-convention': ['off'],
  },
}
