// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Remove source-map-loader that causes font errors
      webpackConfig.module.rules = webpackConfig.module.rules.filter(
        (rule) =>
          !rule.loader ||
          !/source-map-loader/.test(rule.loader)
      );
      return webpackConfig;
    },
  },
};