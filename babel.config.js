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
              ie: 11,
              browsers: "last 2 versions"
            },
            loose: true,
            modules: false
          }
        ]
      ],
      plugins: [
        // "@babel/plugin-external-helpers"
      ]
    };
  }
};
