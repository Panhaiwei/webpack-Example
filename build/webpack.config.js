const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const rootPath = path.resolve(__dirname, "../");
module.exports = {
  mode: "development",
  entry: path.join(rootPath, "src", "main.js"),
  watch: true,
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        test: /\.js($|\?)/i,
        sourceMap: true,
        parallel: true,
        output: {
          comments: false,
          beautify: false,
        },
        warnings: false,
      },
    }),
  ],
  output: {
    path: path.join(rootPath, "dist"),
    publicPath: "/dist/",
    filename: "gensee-anmiation.js",
    chunkFilename: "[name].js",
    library: "genseeAnmiation",
    libraryTarget: "umd",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(rootPath, "src")],
        exclude: [path.resolve(rootPath, "node_modules")],
        loader: "babel-loader",
        query: {
          presets: [
            [
              "@babel/env",
              {
                targets: {
                  browsers: ["> 1%", "last 2 versions", "not ie <= 8"],
                },
              },
            ],
          ],
        },
      },
    ],
  },
  resolve: {
    extensions: [".json", ".js", ".jsx"],
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(rootPath, "/dist/"),
    inline: true,
    host: "localhost",
    port: 8080,
  },
};
