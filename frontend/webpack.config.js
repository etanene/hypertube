const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  watch: true,
  output: {
    path: path.join(__dirname, '/build/'),
    publicPath: '/',
    filename: 'build.js',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // failOnError: true,
        },
      },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/public/index.html'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    clientLogLevel: 'none',
    watchOptions: {
      aggregateTimeout: 500, // delay before reloading
      poll: 1000,
    },
    host: '0.0.0.0',
    port: '3000',
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/',
  },
  devtool: 'inline-source-map',
};
