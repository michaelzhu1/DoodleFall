var path = require('path');

module.exports = {
  entry: './lib/game.js',
  output: {
    filename: './assets/javascripts/bundle.js',
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*']
  }
};
