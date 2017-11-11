const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config, env) {
  if (env === 'production') {
    config = injectBabelPlugin('transform-remove-console', config);
  }
  return config;
};
