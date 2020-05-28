module.exports = {
  plugins: ['react', 'styled-components-a11y'],
  extends: ['eslint-config-airbnb', 'prettier', 'prettier/react', 'plugin:styled-components-a11y/recommended'],
  env: {
    es6: true,
    browser: true,
  },
  rules: {
    'react/jsx-filename-extension': 0,
  },
};
