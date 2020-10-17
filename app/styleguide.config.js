const path = require("path");

module.exports = {
  components: "src/components/**/[A-Z]*.js",
  // components: "src/components/SlidingQuestions/**/[A-Z]*.js",
  // sections: [
  //   {
  //     name: "SlidingQuestions",
  //     // content: "src/components/SlidingQuestions/README.md"
  //     components: "src/components/SlidingQuestions/SlidingQuestions.js"
  //   }
  // ],
  ignore: ["src/components/SkillMatrix/**/*.js", "**/*.test.js"],
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
