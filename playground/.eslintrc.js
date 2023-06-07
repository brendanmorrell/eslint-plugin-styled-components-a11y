module.exports = {
  plugins: ['react', 'styled-components-a11y'],
  extends: ['eslint-config-airbnb', 'prettier', 'prettier/react', 'plugin:styled-components-a11y/recommended'],
  parserOptions: {
    "ecmaVersion": 2020,
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  env: {
    es6: true,
    browser: true,
  },
  settings: {
    "jsx-a11y": {
      components: {
        ImgComponent: 'img',
      },
    },
  },
  rules: {
    'react/jsx-filename-extension': 0,
  },
};
