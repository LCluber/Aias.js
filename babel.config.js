module.exports = api => {
  const isTest = api.env("test");
  if (isTest) {
    return {
      presets: [
        [
          "@babel/env",
          {
            targets: {
              node: "current"
            }
          }
        ]
      ]
    };
  } else {
    return {
      presets: [
        [
          "@babel/env",
          {
            targets: {
              ie: 9,
              browsers: "cover 99.5%"
            },
            loose: true,
            modules: false,
            useBuiltIns: "usage"
          }
        ]
      ],
      plugins: [
        // "@babel/plugin-external-helpers",
        // [
        //   "@babel/plugin-transform-runtime",
        //     {
        //       absoluteRuntime: false,
        //       helpers: true,
        //       corejs: 3,
        //       regenerator: true,
        //       useESModules: true,
        //     }
        // ]
      ]
    };
  }
};
