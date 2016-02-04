var path = require('path');
var process = require('process');
var webpack = require('webpack');

module.exports = {
  context: path.join(process.env.PWD, 'frontend'),
  entry: "./index.js",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'webpack.bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' }
    ]
  }
};
