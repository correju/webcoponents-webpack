const path = require('path');
module.exports = {
  entry: {
    main: './src/index.js',
  },
  mode: 'development',
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: 'dist',
    overlay: true
  },
  // scripts: {},
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
            {loader: "babel-loader"}
        ],
        exclude: /node_modules/
      },
      {
        test: /\.pcss$/,
        use: ['text-loader', 'postcss-loader']
      },
      {
        test: /\.html$/,
        use: ['text-loader']
      }
    ]
  }
}
