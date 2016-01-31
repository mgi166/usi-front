var path = require('path');
var process = require('process');

module.exports = {
  context: path.join(process.env.PWD, 'frontend'),
  entry: "./index.js",
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
