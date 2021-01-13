module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    indent: [
      'error',
      2,
    ],
    'no-console': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': 0,
    'no-param-reassign': 0,
  },
};
