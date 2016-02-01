var path = require('path');
var process = require('process');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  context: path.join(process.env.PWD, 'frontend'),
  entry: "./index.js",
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'webpack.bundle.js'
  },
  externals: nodeModules,
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' }
    ]
  }
};
