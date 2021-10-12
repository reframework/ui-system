const { readFile } = require("fs").promises;

module.exports = async (head) => {
  const files = [
    // require.resolve("@reframework/ui-system/-tokens/variables/breakpoints.css"),
    require.resolve("@reframework/ui-system-tokens/variables/fonts.css"),
    require.resolve("@reframework/ui-system-tokens/variables/colors.css"),
    require.resolve("@reframework/ui-system-tokens/variables/spacing.css"),
    // require.resolve("@reframework/ui-system/-tokens/variables/z-index.css"),
  ];

  const styles = await Promise.all(
    files.map((path) => readFile(path, { encoding: "utf-8" }))
  ).then((xs) => xs.join("\n"));

  return `${head}<style>${styles}</style>`;
};
