const path = require('path');


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'build.js'
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            use: 'babel-loader',
        }
    ]
  },
};
