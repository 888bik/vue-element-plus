/* eslint-env node */
module.exports = {
  plugins: [
    require("postcss-preset-env"),
    require("autoprefixer"),
    require("postcss-each-variables"),
    require("postcss-nested"),
    require("postcss-each")({
      plugins: {
        beforeEach: [require("postcss-for"), require("postcss-color-mix")],
      },
    }),
  ],
};
