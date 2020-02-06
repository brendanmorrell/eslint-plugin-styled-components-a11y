module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint-config-airbnb",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/react",
    "plugin:cypress/recommended"
  ],
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true
  },
  settings: {
    "import/resolver": {
      alias: [["test-utils", "./test/test-utils.js"]],
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    },
    "import/ignore": ["node_modules"]
  },
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  rules: {
    "my-eslint-rules/click-events-have-key-events": "warn",
    "my-eslint-rules/another": "warn",
    "no-nested-ternary": 0,
    "react-hooks/rules-of-hooks": "error",
    "react/prop-types": 0,
    "no-underscore-dangle": 0,
    "no-param-reassign": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "no-param-reassign": 0,
    "react/prop-types": 0,
    // strict: [2, 'never'],
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/react-in-jsx-scope": 2,
    "react/jsx-filename-extension": 0,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never"
      }
    ],
    "class-methods-use-this": 0,
    "import/no-unresolved": [2, { caseSensitive: false }],
    "jsx-a11y/label-has-for": [
      2,
      {
        components: ["Label"],
        required: {
          every: ["nesting", "id"]
        },
        allowChildren: true
      }
    ],
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        labelAttributes: ["label"],
        controlComponents: ["Field"],
        depth: 3
      }
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        peerDependencies: true
      }
    ]
  },
  globals: {
    cy: true,
    context: true
  }
};
