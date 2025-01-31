var webpack = require("webpack"),
  path = require("path"),
  env = require("./utils/env"),
  CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin,
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  WriteFilePlugin = require("write-file-webpack-plugin");

var fileExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "eot",
  "otf",
  "svg",
  "ttf",
  "woff",
  "woff2",
];

var options = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    newtab: path.join(__dirname, "src", "newtab.js"),
    options: path.join(__dirname, "src", "options.js"),
    background: path.join(__dirname, "src", "background.js"),
    popup: path.join(__dirname, "src", "popup.js"),
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
        exclude: /node_modules/,
      },
      {
        test: new RegExp(".(" + fileExtensions.join("|") + ")$"),
        loader: "file-loader?name=[name].[ext]",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: fileExtensions
      .map((extension) => "." + extension)
      .concat([".jsx", ".js", ".css"]),
  },
  plugins: [
    // clean the build folder
    new CleanWebpackPlugin(),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new CopyWebpackPlugin([
      {
        from: "public/manifest.json",
        transform: function (content, path) {
          // generates the manifest file using the package.json informations
          return Buffer.from(
            JSON.stringify({
              description: process.env.npm_package_description,
              version: process.env.npm_package_version,
              ...JSON.parse(content.toString()),
            })
          );
        },
      },
    ]),
    new CopyWebpackPlugin([
      {
        from: "public/icons",
        to: "icons",
      },
    ]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "newtab.html"),
      filename: "newtab.html",
      chunks: ["newtab"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "options.html"),
      filename: "options.html",
      chunks: ["options"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "background.html"),
      filename: "background.html",
      chunks: ["background"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "popup.html"),
      filename: "popup.html",
      chunks: ["popup"],
    }),
    new WriteFilePlugin(),
  ],
};

if (env.NODE_ENV === "development") {
  options.devtool = "cheap-module-eval-source-map";
}

module.exports = options;
