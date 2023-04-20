module.exports = {
    parser: "babel-eslint",
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true
      }
    },
    env: {
      browser: true,
      es6: true
    },
    extends: [
      "eslint:recommended",
      "plugin:vue/recommended"
    ],
    plugins: [
      "vue"
    ],
    settings: {
      "import/resolver": {
        "babel-module": {}
      }
    }
  }
  