var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./lib/entry.js",
  output: {
    path: path.resolve(__dirname, "assets", "javascripts"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        }
      }
    ]
  },
  devtool: "source-maps",
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};
