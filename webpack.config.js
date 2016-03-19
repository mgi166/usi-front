var path = require('path');
var process = require('process');
var webpack = require('webpack');

module.exports = {
  context: path.join(process.env.PWD, 'frontend'),
  entry: [
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/dev-server",
    "./index.js"
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'webpack.bundle.js',
    publicPath: "/assets/"
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.(png|svg)$/, loader: 'url-loader?limit=20000' }
    ]
  }
};
