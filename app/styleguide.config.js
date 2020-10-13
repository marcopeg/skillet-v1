const path = require("path");

module.exports = {
  components: "src/components/**/[A-Z]*.js",
  ignore: ["src/components/SkillMatrix/**/*.js"],
  styleguideComponents: {
    Wrapper: path.join(__dirname, "src/styleguidist/Wrapper")
  },
  dangerouslyUpdateWebpackConfig(webpackConfig, env) {
    webpackConfig.devServer = {
      disableHostCheck: true
    };
    return webpackConfig;
  }
};
