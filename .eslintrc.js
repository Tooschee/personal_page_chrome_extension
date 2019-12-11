module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "parser": "babel-eslint",
  "extends": ["airbnb", "react-app"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "react/jsx-filename-extension": "off",
    "react/jsx-one-expression-per-line": "off",
    "consistent-return": "off",
    "react/prefer-stateless-function": "off",
    "no-underscore-dangle": "off",
    "react/forbid-prop-types": "warn",
    "no-plusplus": "off",
    "react/no-array-index-key": "warn",
    "array-callback-return": "warn",
    "defaultAssignment": true,
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "import/no-cycle": "warn",
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["src", "assets", "components", "containers", "mockapi", "style", "helpers"]
      }
    }
  }
};
