var path = require('path');
var process = require('process');
var fs = require('fs');

module.exports = {
  context: path.join(process.env.PWD, 'frontend'),
  entry: "./index.js",
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'webpack.bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' }
    ]
  }
};
