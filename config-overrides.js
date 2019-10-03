/* eslint import/no-extraneous-dependencies: 0 */
const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const { useBabelRc, useEslintRc, override } = require('customize-cra');

module.exports = override(useBabelRc(), useEslintRc(), (config, env) => {
  // eslint-disable-next-line no-param-reassign
  config = rewireReactHotLoader(config, env);
  return config;
});
