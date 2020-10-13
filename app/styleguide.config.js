const path = require("path");

module.exports = {
  components: "src/components/**/[A-Z]*.js",
  ignore: ["src/components/SkillMatrix/**/*.js"],
  styleguideComponents: {
    Wrapper: path.join(__dirname, "src/styleguidist/Wrapper")
  },
  context: {
    IonWrapper: path.join(__dirname, "src/styleguidist/IonWrapper")
  },
  dangerouslyUpdateWebpackConfig(webpackConfig, env) {
    webpackConfig.devServer = {
      disableHostCheck: true
    };
    return webpackConfig;
  }
};
