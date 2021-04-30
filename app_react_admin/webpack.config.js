const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'inline-source-map',
  // target: 'web',
  // externals: {
  //   react: 'react',
  //   'react-dom': 'react-dom'
  // },
  entry: './app_react_admin/admin-app.tsx',
  output: {
    filename: 'admin-app.js',
    path: path.resolve(__dirname, './../public/js'),
    // libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};