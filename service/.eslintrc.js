module.exports = {
  extends: [
    'prettier',
    'airbnb-typescript/base'],
  plugins: ["prettier"],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    "prettier/prettier": ["error"]
  }
};
