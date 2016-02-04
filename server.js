var webpack = require('webpack');
var config = require('./webpack.config.js');
var webpackDevServer = require('webpack-dev-server');
var compiler = webpack(config);

var server = new webpackDevServer(
  compiler,
  {
    publicPath: config.output.publicPath,
    hot: true,
    stats: { colors: true }
  }
);

server.listen(8080, function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log("Listening at http://localhost:8080");
});
