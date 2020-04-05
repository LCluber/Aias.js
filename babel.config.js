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
            debug: true,
            targets: {
              ie: 11,
              browsers: "cover 99.5%",
              esmodules: false
            },
            loose: false,
            modules: false,
            useBuiltIns: "usage",
            corejs: { version: 3, proposals: true }
            // forceAllTransforms: false,
            // include: ["es.promise"]
          }
        ]
      ],
      plugins: []
    };
  }
};
