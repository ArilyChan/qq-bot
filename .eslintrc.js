
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
  }
}

/*
module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
    }
};
*/