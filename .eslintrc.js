module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'no-param-reassign': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'no-shadow': 0,
    'no-console': 0,
  },
};
