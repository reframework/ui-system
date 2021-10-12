const injectTokens = require("./injectTokens");
const cssRegex = "/\\.css$/";

const lastOf = (arr) => {
  if (!Array.isArray(arr)) return;
  return arr[arr.length - 1];
};

module.exports = {
  webpackFinal(config = {}, options = {}) {
    const cssRuleIdx = config.module.rules.findIndex((rule) => {
      return rule && rule.test && rule.test.toString() === cssRegex;
    });

    const rulesLength = config.module.rules.length;
    const hasCssRule = cssRuleIdx !== -1;
    const postCssRule = lastOf(config.module.rules[cssRuleIdx].use);

    const cssRule = {
      test: /\.css$/i,
      sideEffects: true,
      oneOf: [
        {
          resourceQuery: /module/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: "[name]_[local]__[hash:hex:7]",
                },
              },
            },
            postCssRule,
          ],
        },
        {
          use: ["style-loader", "css-loader", postCssRule],
        },
      ],
    };

    const rules = Object.assign([], config.module.rules, {
      [hasCssRule ? cssRuleIdx : rulesLength]: cssRule,
    });

    return {
      ...config,
      module: {
        ...config.module,
        rules,
      },
    };
  },
  stories: ["../src/**/*.stories.@(mdx|tsx)"],
  addons: [
    // '@reframework/preset-storybook',
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  managerHead: injectTokens,
  previewHead: injectTokens,
};
