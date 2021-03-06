const path = require('path');

module.exports = {
  entry: {
    index: './src/main.ts'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js'
  },
  devServer: {
    contentBase: 'public',
    port: 3000
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [{
        test: /\.glsl$/,
        exclude: [/node_modules/],
        use: 'raw-loader'
      },
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: 'ts-loader'
      }
    ]
  }
};
