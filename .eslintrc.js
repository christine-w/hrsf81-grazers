/**
 * These rules enforce the Airbnb Javascript Style Guide
 *
 * Visit this repo for more information:
 *   https://github.com/airbnb/javascript
 */

module.exports = {
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true
  },
  rules: {
    "comma-dangle": 0,
  }
};
