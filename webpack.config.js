var path = require('path');

module.exports = {
  "context": "./frontend",
  "entry": "./index.js",
  "output": {
    "path": path.join(__dirname, 'dist'),
    "filename": 'webpack.bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' }
    ]
  }
};
